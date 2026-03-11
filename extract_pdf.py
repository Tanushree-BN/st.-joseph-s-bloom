import PyPDF2

try:
    reader = PyPDF2.PdfReader('src/assets/Applicatoion form.pdf')
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    
    with open('extracted_pdf.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Done extracting PDF.")
except Exception as e:
    print(f"Error: {e}")
