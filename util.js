const MyUtil = {
    createPopupBox: function(text, bg='#fff', close=-1){
        var box = document.createElement('div');
        box.className = 'p-box';
        box.style.backgroundColor = bg;
        var txt = document.createElement('span');
        txt.innerHTML = text;
        txt.style.whiteSpace = 'pre';
        box.appendChild(txt);
        box.style.width = Math.max(txt.scrollWidth + 100, 200) + 'px';
        box.style.height = Math.max(txt.scrollHeight + 50, 150) + 'px';
        var close = document.createElement('div');
        close.className = 'p-close';
        close.innerHTML = 'X';
        close.onclick = function(){
            document.body.removeChild(box);
        };
        box.appendChild(close);
        document.body.appendChild(box);
        if(close > 0){
            setTimeout(function(){
                document.body.removeChild(box);
            }, close * 1000);
        }
    }
}