from itertools import cycle
import base64
import datetime
import hashlib

def crypt(source, key):
    result = ''
    temp = cycle(key)
    for ch in source:
        result = result + chr(ord(ch) ^ ord(next(temp)))
        #result += hex(ord(ch) ^ ord(next(temp)))[2:].zfill(4)
    result = base64.b64encode(result.encode())
    return result.decode()
def decrypt(source, key):
    '''s = source
    new = ''
    while s:
        new += chr(int(s[:4], base=16))
        s = s[4:]
    source = new'''
    result = ''
    temp = cycle(key)
    source = base64.b64decode(source).decode()
    for ch in source:
        result = result + chr(ord(ch) ^ ord(next(temp)))
    return result
def password(disp=False):
    st = datetime.date.today().ctime()
    code = str(int(int(hashlib.md5(st.encode()).hexdigest(), base=16) % 1e6))
    if disp:
        print(code)
    else:
        return code
if __name__ == '__main__':
    with open('1班.txt', 'r', encoding='utf-8') as f:
        with open('4班.txt', 'w', encoding='utf-8') as g:
            g.write(crypt(f.read(), 'Let QwQ bless me'))
    with open('4班.txt', 'r', encoding='utf-8') as f:
        with open('2班.txt', 'w', encoding='utf-8') as g:
            g.write(decrypt(f.read(), 'Let QwQ bless me'))