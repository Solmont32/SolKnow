import os
import re
from pathlib import Path

docs_dir = Path("docs").absolute()

def fix_links():
    md_files = list(docs_dir.rglob("*.md")) + list(docs_dir.rglob("*.mdx"))
    modified_count = 0
    
    # Regex to find [Title](path) or [Title](path#anchor)
    # We use a non-greedy match for the path to avoid capturing too much if there are multiple links
    pattern = re.compile(r'\[([^\]]+)\]\(([^) \n]+)\)')
    
    for md_file in md_files:
        content = None
        for enc in ['utf-8-sig', 'utf-8', 'gbk']:
            try:
                with open(md_file, 'r', encoding=enc) as f:
                    content = f.read()
                break
            except UnicodeDecodeError: continue
        
        if content is None: continue
            
        lines = content.splitlines(keepends=True)
        new_lines = []
        changed_file = False
        
        for line in lines:
            if line.strip().startswith("<!--") and "-->" in line:
                new_lines.append(line)
                continue
            
            # Find all links in the line
            def replace_callback(match):
                nonlocal changed_file
                title = match.group(1)
                full_path = match.group(2)
                
                # Split path and anchor
                if '#' in full_path:
                    path, anchor = full_path.split('#', 1)
                    anchor = '#' + anchor
                else:
                    path = full_path
                    anchor = ''
                
                if path.startswith(('http:', 'https:', 'mailto:', 'tel:', 'ftp:')):
                    return match.group(0)
                
                # Resolve path
                if path.startswith('/'):
                    # Docusaurus / is relative to docs/
                    target_base = docs_dir / path.lstrip('/')
                elif path == '':
                    # Anchor on same page
                    return match.group(0)
                else:
                    target_base = (md_file.parent / path).resolve()
                
                # Check existence
                exists = False
                final_path_is_index = False
                
                if target_base.is_file():
                    exists = True
                    if target_base.name in ['index.md', 'index.mdx']:
                        final_path_is_index = True
                elif target_base.with_suffix('.md').is_file():
                    exists = True
                    target_base = target_base.with_suffix('.md')
                elif target_base.with_suffix('.mdx').is_file():
                    exists = True
                    target_base = target_base.with_suffix('.mdx')
                elif target_base.is_dir():
                    if (target_base / 'index.md').is_file():
                        exists = True
                        final_path_is_index = True
                    elif (target_base / 'index.mdx').is_file():
                        exists = True
                        final_path_is_index = True
                
                new_path = path
                # Remove .md if it exists
                if new_path.endswith('.md'):
                    new_path = new_path[:-3]
                
                if exists:
                    # Strip index
                    if final_path_is_index:
                        if new_path.endswith('/index'):
                            new_path = new_path[:-5]
                        elif new_path == 'index':
                            new_path = '.'
                    
                    changed_file = True
                    return f'[{title}]({new_path}{anchor})'
                else:
                    # Broken link
                    changed_file = True
                    # If it was tarjan.md, new_path is now tarjan
                    return f'<!-- [{title}]({new_path}{anchor}) -->'

            new_line = pattern.sub(replace_callback, line)
            
            # Handle the // prefix from previous run if any
            if changed_file and new_line.strip().startswith("//"):
                # Check if the line now contains <!-- [Title] -->
                if "<!-- [" in new_line:
                    new_line = new_line.replace("// ", "", 1)
            
            new_lines.append(new_line)
            
        if changed_file:
            with open(md_file, 'w', encoding='utf-8') as f:
                f.writelines(new_lines)
            modified_count += 1
            print(f"Updated: {md_file.relative_to(docs_dir.parent)}")
            
    print(f"Total modified files: {modified_count}")

if __name__ == "__main__":
    fix_links()
