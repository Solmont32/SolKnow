import os
import re

def convert_details_to_admonitions():
    docs_dir = 'docs'
    updated_files = []
    
    # Regex to match <details>...</details>
    # Group 1: Summary text
    # Group 2: Content
    pattern = re.compile(r'<details>\s*<summary>(.*?)</summary>(.*?)</details>', re.DOTALL | re.IGNORECASE)
    
    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = pattern.sub(
                        lambda m: f':::details[{m.group(1)}]\n{m.group(2)}\n:::', 
                        content
                    )
                    
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        updated_files.append(file_path)
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
                    
    print(f"Successfully updated {len(updated_files)} files.")
    for f in updated_files:
        print(f" - {f}")

if __name__ == "__main__":
    convert_details_to_admonitions()
