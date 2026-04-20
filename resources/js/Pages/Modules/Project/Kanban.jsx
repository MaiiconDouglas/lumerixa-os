import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Core/Layouts/AppLayout';
import { Plus, MoreHorizontal, Calendar, ChevronLeft, Filter } from 'lucide-react';
import { 
    DndContext, 
    closestCorners, 
    KeyboardSensor, 
    PointerSensor, 
    useSensor, 
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { 
    arrayMove, 
    SortableContext, 
    sortableKeyboardCoordinates, 
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Componente de Card Arrastável
function SortableTaskCard({ task, auth }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    return (
        <div 
            ref={setNodeRef}
            style={style}
            {...attributes} 
            {...listeners}
            className="bg-[#161615] border border-[#3E3E3A] p-5 rounded-xl transition-all hover:border-[#f5300355] cursor-grab active:cursor-grabbing group shadow-xl hover:shadow-[#f530030a]"
        >
            <div className="flex gap-2 mb-3">
                {(task.tags || []).map((tag, idx) => (
                    <span key={idx} className="text-[8px] font-black uppercase tracking-widest text-[#f53003] px-2 py-1 bg-[#f5300311] border border-[#f5300322] rounded-md">
                        {tag}
                    </span>
                ))}
                {(!task.tags || task.tags.length === 0) && (
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#3E3E3A] px-2 py-1 bg-white/5 rounded-md">
                        TAREFA
                    </span>
                )}
            </div>

            <h6 className="text-[13px] font-bold text-white mb-4 line-clamp-3 leading-tight group-hover:text-[#f53003] transition-colors uppercase tracking-tight">
                {task.title}
            </h6>

            <div className="flex justify-between items-center pt-4 border-t border-[#3E3E3A]/50">
                <div className="flex items-center gap-3 text-[#A1A09A]">
                    {task.due_date && (
                        <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">
                                {new Date(task.due_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                            </span>
                        </div>
                    )}
                </div>
                
                <div className="w-6 h-6 rounded-full bg-[#3E3E3A] border border-[#161615] flex items-center justify-center text-[8px] font-black text-white uppercase">
                    {task.responsible?.name?.charAt(0) || auth.user.name.charAt(0)}
                </div>
            </div>
        </div>
    );
}

export default function Kanban({ auth, project }) {
    const [columns, setColumns] = useState(project.columns);
    const [activeTask, setActiveTask] = useState(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [activeColumnId, setActiveColumnId] = useState(null);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const findColumn = (id) => {
        if (columns.find(col => col.id === id)) return columns.find(col => col.id === id);
        return columns.find(col => col.tasks?.some(task => task.id === id));
    };

    const handleDragStart = (event) => {
        const { active } = event;
        const task = columns.flatMap(col => col.tasks || []).find(t => t.id === active.id);
        setActiveTask(task);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeColumn = findColumn(activeId);
        const overColumn = findColumn(overId);

        if (!activeColumn || !overColumn || activeColumn === overColumn) return;

        setColumns(prev => {
            const activeItems = activeColumn.tasks || [];
            const overItems = overColumn.tasks || [];

            const activeIndex = activeItems.findIndex(t => t.id === activeId);
            const overIndex = overColumn.id === overId ? overItems.length : overItems.findIndex(t => t.id === overId);

            return prev.map(col => {
                if (col.id === activeColumn.id) {
                    return { ...col, tasks: activeItems.filter(t => t.id !== activeId) };
                }
                if (col.id === overColumn.id) {
                    const newTasks = [...overItems];
                    newTasks.splice(overIndex, 0, activeItems[activeIndex]);
                    return { ...col, tasks: newTasks };
                }
                return col;
            });
        });
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeColumn = findColumn(activeId);
        const overColumn = findColumn(overId);

        if (!activeColumn || !overColumn) return;

        const activeIndex = activeColumn.tasks.findIndex(t => t.id === activeId);
        const overIndex = overColumn.id === overId ? overColumn.tasks.length-1 : overColumn.tasks.findIndex(t => t.id === overId);

        if (activeColumn.id === overColumn.id && activeIndex !== overIndex) {
            setColumns(prev => prev.map(col => {
                if (col.id === activeColumn.id) {
                    return { ...col, tasks: arrayMove(col.tasks, activeIndex, overIndex) };
                }
                return col;
            }));
        }

        // Persistir no Backend
        try {
            await fetch(`/api/tasks/${activeId}/move`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
                body: JSON.stringify({
                    kanban_column_id: overColumn.id,
                    position: overIndex,
                    new_order: overColumn.tasks.map(t => t.id)
                })
            });
        } catch (e) { console.error(e); }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle) return;

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
                body: JSON.stringify({
                    project_id: project.id,
                    kanban_column_id: activeColumnId,
                    title: newTaskTitle,
                    priority: 'medium'
                })
            });

            if (response.ok) {
                const newTask = await response.json();
                setColumns(prev => prev.map(col => {
                    if (col.id === activeColumnId) {
                        return { ...col, tasks: [...(col.tasks || []), newTask] };
                    }
                    return col;
                }));
                setNewTaskTitle('');
                setIsTaskModalOpen(false);
            }
        } catch (e) { console.error(e); }
    };

    return (
        <AppLayout
            user={auth.user}
            title={project.name}
        >
            <Head title={`Kanban - ${project.name}`} />

            <div className="h-[calc(100vh-72px)] bg-[#0a0a0a] overflow-hidden flex flex-col">
                
                <div className="bg-[#161615] border-b border-[#3E3E3A] px-10 py-4 flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <div className="flex -space-x-3">
                            {[1, 2].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#161615] bg-[#3E3E3A] flex items-center justify-center text-[10px] font-black text-white capitalize">
                                    {auth.user.name.charAt(0)}
                                </div>
                            ))}
                        </div>
                        <div className="h-6 w-px bg-[#3E3E3A]"></div>
                        <button className="text-[#A1A09A] flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                            <Filter size={14} /> Filtros Ativos
                        </button>
                    </div>
                </div>

                <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex-1 overflow-x-auto overflow-y-hidden p-10 custom-scrollbar flex gap-8 content-start h-full pb-20">
                        {columns.map((column) => (
                            <div key={column.id} className="flex-shrink-0 w-80 flex flex-col h-full bg-[#161615]/30 rounded-2xl border border-[#3E3E3A]/50 p-4">
                                <div className="flex justify-between items-center mb-6 px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: column.color || '#f53003' }}></div>
                                        <h5 className="text-[11px] font-black text-white uppercase tracking-widest">{column.name}</h5>
                                        <span className="text-[10px] bg-[#0a0a0a] text-[#A1A09A] px-2 py-0.5 rounded-full border border-[#3E3E3A]">
                                            {column.tasks?.length || 0}
                                        </span>
                                    </div>
                                    <button className="text-[#3E3E3A] hover:text-white transition-all">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar min-h-[100px]">
                                    <SortableContext 
                                        id={column.id}
                                        items={(column.tasks || []).map(t => t.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {(column.tasks || []).map((task) => (
                                            <SortableTaskCard key={task.id} task={task} auth={auth} />
                                        ))}
                                    </SortableContext>

                                    <button 
                                        onClick={() => { setActiveColumnId(column.id); setIsTaskModalOpen(true); }}
                                        className="w-full py-4 border border-dashed border-[#3E3E3A] rounded-xl text-[#3E3E3A] hover:text-[#f53003] hover:border-[#f53003] hover:bg-[#f5300305] transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <Plus size={16} className="group-hover:scale-125 transition-transform" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Nova Tarefa</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <DragOverlay dropAnimation={{
                        sideEffects: defaultDropAnimationSideEffects({
                            styles: {
                                active: { opacity: '0.5' },
                            },
                        }),
                    }}>
                        {activeTask ? (
                            <div className="bg-[#161615] border border-[#f53003] p-5 rounded-xl shadow-2xl opacity-90 scale-105 rotate-2">
                                <h6 className="text-[13px] font-bold text-white uppercase">{activeTask.title}</h6>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>

            {/* Modal de Criação */}
            {isTaskModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#161615] border border-[#f5300344] w-full max-w-md rounded-2xl p-8 shadow-2xl relative">
                        <h4 className="text-xl font-black text-white uppercase mb-6 tracking-tighter">Inserir <span className="text-[#f53003]">Tarefa</span></h4>
                        <form onSubmit={handleCreateTask} className="space-y-6">
                            <input 
                                autoFocus
                                className="w-full bg-[#0a0a0a] border-[#3E3E3A] text-white rounded-xl py-4"
                                placeholder="Título..."
                                value={newTaskTitle}
                                onChange={e => setNewTaskTitle(e.target.value)}
                            />
                            <div className="flex gap-3 justify-end">
                                <button type="button" onClick={() => setIsTaskModalOpen(false)} className="text-[#A1A09A] uppercase text-[10px] font-black">Cancelar</button>
                                <button type="submit" className="bg-[#f53003] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #3E3E3A; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #f53003; }
            `}} />
        </AppLayout>
    );
}
