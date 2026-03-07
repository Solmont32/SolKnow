
try:
    garbled = "缇よ"
    recovered = garbled.encode('gbk').decode('utf-8')
    print(f"Recovered: {recovered}")
except Exception as e:
    print(f"Error: {e}")

garbled2 = "瀹氫箟"
try:
    recovered2 = garbled2.encode('gbk').decode('utf-8')
    print(f"Recovered 2: {recovered2}")
except Exception as e:
    print(f"Error 2: {e}")
