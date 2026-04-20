import xml.etree.ElementTree as ET
import sys
import os


def extract_docx_text(xml_path):
    try:
        tree = ET.parse(xml_path)
        root = tree.getroot()
        ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
        lines = []
        for p in root.findall(".//w:p", ns):
            text_parts = []
            for t in p.findall(".//w:t", ns):
                if t.text:
                    text_parts.append(t.text)
            line = "".join(text_parts).strip()
            if line:
                lines.append(line)
        return "\n\n".join(lines)
    except Exception as e:
        return f"Erro na extração: {str(e)}"


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python extract_docx.py <input_xml> <output_md>")
        sys.exit(1)

    xml_file = sys.argv[1]
    output_file = sys.argv[2]

    if os.path.exists(xml_file):
        text = extract_docx_text(xml_file)
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Sucesso! Texto salvo em: {output_file}")
    else:
        print(f"Arquivo não encontrado: {xml_file}")
