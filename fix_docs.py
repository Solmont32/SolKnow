import os
import re

base_path = r'D:\001\WjhProject\SolKnow\docs\academic-math'
subdirs = [
    'abstract-algebra', 'algebra', 'analysis', 'discrete-math', 
    'probability', 'senior-high', 'statistics', 'elementary', 'junior-high'
]

def process_file(file_path):
    filename = os.path.basename(file_path)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if filename == 'index.md':
        # Rule 2: Standardize index.md links
        # Change [text](filename.md) to [text](./filename)
        # Handle cases like [text](file.md) or [text](./file.md)
        def link_replacer(match):
            text = match.group(1)
            link = match.group(2)
            # Remove leading ./ if present to normalize, then add it back
            link = link.lstrip('./')
            # link already has .md removed by the regex capture group 2
            return f'[{text}](./{link})'
        
        # This regex matches [text](filename.md) or [text](./filename.md)
        new_content = re.sub(r'\[(.*?)\]\((?:\./)?(.*?)\.md\)', link_replacer, content)
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated links in {file_path}")
    else:
        # Rule 1: Inject Front Matter for non-index.md files
        file_id = os.path.splitext(filename)[0]
        
        # Extract title from the first # line
        title_match = re.search(r'^#\s+(.*)', content, re.MULTILINE)
        title = title_match.group(1).strip() if title_match else file_id

        # Front Matter template
        front_matter = f"---\nid: {file_id}\ntitle: {title}\n---\n"

        # Check for existing Front Matter
        if content.startswith('---'):
            # Find the end of existing front matter
            end_fm_index = content.find('---', 3)
            if end_fm_index != -1:
                # Replace everything up to and including the second ---
                new_content = front_matter + content[end_fm_index + 3:].lstrip()
            else:
                # Should not happen in well-formed markdown, but just in case
                new_content = front_matter + content
        else:
            new_content = front_matter + content

        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated front matter in {file_path}")

for subdir in subdirs:
    dir_path = os.path.join(base_path, subdir)
    if not os.path.exists(dir_path):
        print(f"Warning: {dir_path} does not exist.")
        continue
    
    for filename in os.listdir(dir_path):
        if filename.endswith('.md'):
            process_file(os.path.join(dir_path, filename))
