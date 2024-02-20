from PIL import Image
a = Image.open('rank/C_2.png')
w, h = a.size
p = a.load()
for i in range(w):
    for j in range(h):
        r, g, b, x = a.getpixel((i, j))
        if r + g + b < 300:
            p[i, j] = (0, 0, 0)
a.save('C_2.png', format='png')
