import os

def fix_content(content):
    # 尝试修复“UTF-8 字节被错误当作 GBK 字符读取并保存”的情况
    try:
        # 将乱码字符按 GBK 编码还原为原始字节，再按 UTF-8 解码
        return content.encode('gbk').decode('utf-8')
    except:
        return content

def repair_file(file_path):
    with open(file_path, 'rb') as f:
        raw_data = f.read()
    
    # 情况 1：文件本身就是物理上的 GBK 编码
    try:
        content = raw_data.decode('gbk')
        with open(file_path, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        return "物理转换: GBK -> UTF-8"
    except UnicodeDecodeError:
        pass

    # 情况 2：物理文件是 UTF-8，但内容是乱码（被“二次重码”损坏过）
    try:
        content = raw_data.decode('utf-8')
        fixed = fix_content(content)
        if fixed != content:
            with open(file_path, 'w', encoding='utf-8', newline='') as f:
                f.write(fixed)
            return "内容修复: 乱码还原成功"
    except UnicodeDecodeError:
        pass
    
    return None

root_dirs = [r'docs', r'blog']
for target_dir in root_dirs:
    if not os.path.exists(target_dir):
        continue
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith('.md') or file.endswith('.mdx'):
                path = os.path.join(root, file)
                status = repair_file(path)
                if status:
                    print(f"[{status}] {path}")
