import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Lumerixa OS';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => {
        const pages = import.meta.glob(['./Modules/**/*.jsx', './Pages/**/*.jsx'], { eager: true });
        
        // Normaliza o nome para usar barras para frente (Vite Style)
        const normalizedName = name.replace(/\\/g, '/');
        
        // Tenta várias combinações de caminhos
        const paths = [
            `./${normalizedName}.jsx`,
            `./Modules/${normalizedName}.jsx`,
            `./Pages/${normalizedName}.jsx`,
            `./Modules/${normalizedName.replace('Modules/', '')}.jsx`
        ];

        for (const p of paths) {
            if (pages[p]) return pages[p];
        }

        console.error(`Inertia: Componente "${name}" não localizado nas rotas de assets.`);
        return null;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <React.StrictMode>
                <App {...props} />
            </React.StrictMode>
        );
    },
    progress: {
        color: '#f53003',
    },
});
