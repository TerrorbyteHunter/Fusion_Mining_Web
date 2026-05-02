import zipfile
import xml.etree.ElementTree as ET
import sys

def get_docx_text(path):
    """
    Extract text from docx file
    """
    try:
        document = zipfile.ZipFile(path)
        xml_content = document.read('word/document.xml')
        document.close()
        tree = ET.fromstring(xml_content)
        
        paragraphs = []
        # Define namespaces
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        for paragraph in tree.iterfind('.//w:p', ns):
            texts = [node.text for node in paragraph.iterfind('.//w:t', ns) if node.text]
            if texts:
                paragraphs.append("".join(texts))
        
        return "\n".join(paragraphs)
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_docx.py <path>")
    else:
        print(get_docx_text(sys.argv[1]))
