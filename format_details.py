import os
import re

def standardize_details_formatting():
    docs_dir = 'docs'
    updated_files = []
    
    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    original_content = content
                    
                    # Ensure blank lines around <details>
                    content = re.sub(r'([^\n])\n?<details>', r'\1\n\n<details>\n\n', content)
                    content = re.sub(r'<details>\n?([^\n])', r'<details>\n\n\1', content)
                    
                    # Ensure blank lines around <summary>
                    content = re.sub(r'([^\n])\n?<summary>', r'\1\n\n<summary>', content)
                    content = re.sub(r'</summary>\n?([^\n])', r'</summary>\n\n\1', content)
                    
                    # Ensure blank lines around </details>
                    content = re.sub(r'([^\n])\n?</details>', r'\1\n\n</details>\n\n', content)
                    content = re.sub(r'</details>\n?([^\n])', r'</details>\n\n\1', content)
                    
                    # Clean up multiple consecutive blank lines created by the replacement
                    content = re.sub(r'\n{3,}', '\n\n', content)
                    
                    if content != original_content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                        updated_files.append(file_path)
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
                    
    print(f"Successfully standardized {len(updated_files)} files.")

if __name__ == "__main__":
    standardize_details_formatting()
