import os
import re

def optimize_math_formatting():
    docs_dir = 'docs'
    updated_files = []
    
    # 1. 在中文和 $ 之间添加空格
    # 前空格: (中文)$ -> (中文) $
    re_before = re.compile(r'([\u4e00-\u9fa5])\$')
    # 后空格: $(中文) -> $ (中文)
    re_after = re.compile(r'\$([\u4e00-\u9fa5])')
    
    # 2. 修复 $$ 块级公式前后缺少空行的问题
    # 注意避免匹配已经在空行中的情况
    re_block_before = re.compile(r'([^\n])\n\s*\$\$')
    re_block_after = re.compile(r'\$\$\n\s*([^\n])')

    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    original_content = content
                    
                    # 应用规则
                    content = re_before.sub(r'\1 $', content)
                    content = re_after.sub(r'$ \1', content)
                    content = re_block_before.sub(r'\1\n\n$$', content)
                    content = re_block_after.sub(r'$$\n\n\1', content)
                    
                    # 3. 常见的 LaTeX 命令优化 (如 \limits 使用)
                    content = content.replace(r'\limits_{', r'\limits_{')
                    
                    if content != original_content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                        updated_files.append(file_path)
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
                    
    print(f"Successfully optimized math formatting in {len(updated_files)} files.")

if __name__ == "__main__":
    optimize_math_formatting()
