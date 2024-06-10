from tkinter import *
from tkinter import filedialog
from tkinter import messagebox
from tkinter.font import Font
import csv
import random
import test
import io
import pyttsx3
import threading
import requests
import os
import sys
t = Tk()
t.resizable(0, 0)
t.wm_attributes('-topmost', 1)
r = random.Random()
t.title('抽号')
font = Font(size=20)
res = Label(t, font=font)
file = '4班.txt'
url = 'https://samas3.github.io/chouhao/4班.txt'
if sys.platform == 'win32':
    if 'USERPROFILE' not in os.environ:
        messagebox.showwarning('警告', '找不到缓存目录，缓存不可用')
        cache = r'\Not Enabled/'
    else:
        cache = os.environ['USERPROFILE'] + '/chtmp'
elif sys.platform == 'linux':
    cache = './chtmp'
res.grid(row=0, column=0, columnspan=2)
path = Label(t, font=font)
path.grid(row=1, column=0, columnspan=2)
names = {}
gnames = {}
mode = 1
voice = IntVar()
def delete_cache():
    if not os.path.exists(cache):
        return
    os.remove(cache)
def probab(items, probs):
    it = list(items)
    pr = list(probs)
    pr2 = pr.copy()
    x = int(random.random() * sum(pr2))
    for i in range(1, len(pr)):
        pr2[i] += pr2[i - 1]
    pr2.insert(0, 0)
    pr2.append(1e100)
    for i in range(len(pr) + 1):
        if x >= pr2[i] and x < pr2[i + 1]:
            return it[i], pr[i]
def set_width(label, txt):
    label['width'] = int(font.measure(txt) / 15)
    label['text'] = txt
def decrypt_content(s):
    t = test.decrypt(s, 'Let QwQ bless me')
    stringio = io.StringIO(t)
    reader = csv.reader(stringio)
    maxx = -1
    for i in reader:
        if i[2] != '0' and 'g' not in i[0]:
            k = i[0] + ' ' + i[1]
            names[k] = int(i[2])
        elif i[2] != '0' and 'g' in i[0]:
            k = '第' + i[0][1:] + '组 ' + i[1]
            gnames[k] = int(i[2])
        else:
            continue
        maxx = max(maxx, int(font.measure(k) / 10))
    return maxx
def loadFile(force=False):
    names.clear()
    try:
        load(force)
    except Exception as e:
        fail()
        # raise e
    else:
        res['text'] = '初始化完成'
        res['fg'] = 'black'
        do['state'] = 'normal'
        do2['state'] = 'normal'
def getName(dic):
    global flag
    name = probab(dic.keys(), dic.values())
    flag = 1
    if voice.get():
        def _():
            global flag
            try:
                pyttsx3.speak(name[0].split(' ')[1])
            except:
                flag = 0
                messagebox.showinfo('提示', '你先别急')
        threading.Thread(target=_).start()
    if flag:
        return name[0]
    return -1
def pickn():
    global names, mode
    if len(names) > 0 and mode == 1:
        n = getName(names)
        if n != -1:
            res['text'] = n
            del names[n]
    else:
        mode = 1
        loadFile()
do = Button(t, text='抽号(学号)', command=pickn, font=font)
do.grid(row=2, column=0, columnspan=2)
def pickg():
    global gnames, mode
    if len(gnames) > 0 and mode == 2:
        n = getName(gnames)
        if n != -1:
            res['text'] = n
            del gnames[n]
    else:
        mode = 2
        loadFile()
do2 = Button(t, text='抽号(小组)', command=pickg, font=font)
do2.grid(row=3, column=0, columnspan=2)
def fail():
    res['text'] = '读取失败'
    res['fg'] = 'red'
    do['state'] = 'disabled'
    do2['state'] = 'disabled'
def load(force_online=False):
    global path
    fn = file
    success = True
    online = False
    if os.path.exists(cache) and not force_online:
        fn = cache
    if os.path.exists(fn) and not force_online:
        online = False
        if fn == cache:
            online = True
        with open(fn, 'r') as f:
            s = f.read()
            res['width'] = decrypt_content(s)
    else:
        try:
            r = requests.get(url)
        except:
            if not os.path.exists(fn):
                success = False
                path['text'] = '没有任何文件，请联网下载'
        if success:
            online = True
            if r.status_code == 200:
                with open(cache, 'w') as f:
                    f.write(r.text)
                res['width'] = decrypt_content(r.text)
            else:
                fail()
        else:
            fail()
            raise Exception
    if online:
        path['text'] = '使用在线文件（本地已缓存）'
    else:
        path['text'] = '使用本地文件: ' + fn.split('/')[-1]
def choose_file_deprecated():
    global file
    fn = filedialog.askopenfilename(initialdir='.', filetypes=[('txt', '*.txt')])
    if fn:
        file = fn
        loadFile()
        path['text'] = '当前文件: ' + fn.split('/')[-1]
def choose_url():
    t2 = Toplevel()
    t2.title('输入URL')
    t2.wm_attributes('-topmost', 1)
    txt = Text(t2)
    txt.pack()
    def seturl():
        global url
        url = txt.get(1.0, 'end').strip()
        loadFile()
        t2.destroy()
    t2.protocol('WM_DELETE_WINDOW', seturl)
    t2.mainloop()
choose = Button(t, text='选择学号文件', command=choose_url, font=font)
choose.grid(row=4, column=0, columnspan=2)
def reload():
    t2 = Toplevel()
    t2.wm_attributes('-topmost', 1)
    pwd = Entry(t2, font=('', 16))
    pwd.pack()
    def do():
        if test.password() == pwd.get():
            delete_cache()
            loadFile(True)
            t2.destroy()
            messagebox.showinfo('Info', 'Reload success')
        else:
            t2.destroy()
            messagebox.showerror('Error', 'Wrong password')
    t2.protocol('WM_DELETE_WINDOW', do)
    t2.mainloop()
rel = Button(t, text='Reload', command=reload, font=('', 12))
rel.grid(row=5, column=0)
def minimize():
    for i in hide:
        i.grid_remove()
    mini.grid_remove()
    maxi.grid()
mini = Button(t, text='Minimize', command=minimize, font=('', 12))
mini.grid(row=5, column=1)
vo = Checkbutton(t, text='语音', font=font, variable=voice)
hide = [path, choose, rel, vo]
vo.grid(row=6, column=0, columnspan=2)
def maximize():
    for i in hide:
        i.grid()
    maxi.grid_remove()
    mini.grid()
maxi = Button(t, text='Maximize', command=maximize, font=('', 12))
maxi.grid(row=7, column=0, columnspan=2)
maxi.grid_remove()
def main():
    loadFile(True)
    t.mainloop()
main()
