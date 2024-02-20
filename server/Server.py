from tkinter import *
import threading
import subprocess
import sys
import http.server as s
s.test(HandlerClass=s.SimpleHTTPRequestHandler)
'''
t = Tk()
t.title('Server')
if len(sys.argv) > 1:
    port = int(sys.argv[1])
else:
    port = 8000
server = Text(t)
server.grid(row=0, column=0)
cmd = f'py -c "__import__(\'http\',fromlist=[\'server\']).server.test(HandlerClass=SimpleHTTPRequestHandler, port={port})"'
#cmd = 'ping -t eeo.cn'
ans = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
t.update()
for i in iter(ans.stdout.readline, b''):
    print(i)
    i = i.decode('gbk')
    server.insert('end', i)
    t.update()
'''
