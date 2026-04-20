import zipfile
import xml.etree.ElementTree as ET
import os

import sys

# Force UTF-8 output even if the terminal is cp1252
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_docx_text(path):
    """
    Extracts text from a .docx file without using python-docx.
    """
    try:
        with zipfile.ZipFile(path) as z:
            xml_content = z.read('word/document.xml')
        
        tree = ET.fromstring(xml_content)
        
        # Docx XML namespaces
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        paragraphs = []
        for p in tree.findall('.//w:p', ns):
            texts = [t.text for t in p.findall('.//w:t', ns) if t.text]
            if texts:
                paragraphs.append(''.join(texts))
        
        return '\n'.join(paragraphs)
    except Exception as e:
        return f"Error: {e}"

docs_dir = r"c:\Developer\ProjectLumerixa\lumerixa-os\docs"
files = [
    "DOCUMENTO OFICIAL DE REGRAS DE NEGÓCIO.docx",
    "ESTRUTURA COMPLETA DO PRODUTO.docx",
    "Plano de Negócios - Lumerixa Global Solutions 2026 .docx"
]

for filename in files:
    path = os.path.join(docs_dir, filename)
    print(f"--- {filename} ---")
    print(get_docx_text(path))
    print("\n" + "="*50 + "\n")
