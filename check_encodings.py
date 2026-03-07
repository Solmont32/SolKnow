import os

def check_encoding(file_path):
    try:
        with open(file_path, 'rb') as f:
            content = f.read()
        content.decode('utf-8')
        return "UTF-8"
    except UnicodeDecodeError:
        try:
            content.decode('gbk')
            return "GBK"
        except UnicodeDecodeError:
            return "Unknown"

root_dir = r'D:\001\WjhProject\SolKnow\docs\academic-math'
for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.md'):
            path = os.path.join(root, file)
            encoding = check_encoding(path)
            if encoding != "UTF-8":
                print(f"{path}: {encoding}")
