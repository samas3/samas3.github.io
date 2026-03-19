const MyUtil = {
    createPopupBox: function(text, bg='#1e1e1e', close=-1){ // 默认背景色对应 --color-bg-secondary
        var box = document.createElement('div');
        box.className = 'p-box';
        box.style.backgroundColor = bg;
        var txt = document.createElement('span');
        txt.innerHTML = text;
        txt.style.whiteSpace = 'pre';
        box.appendChild(txt);
        box.style.width = Math.max(txt.scrollWidth + 100, 200) + 'px';
        box.style.height = Math.max(txt.scrollHeight + 50, 150) + 'px';
        var closeBtn = document.createElement('div');
        closeBtn.className = 'p-close';
        closeBtn.innerHTML = 'X';
        closeBtn.onclick = function(){
            document.body.removeChild(box);
        };
        box.appendChild(closeBtn);
        document.body.appendChild(box);
        if(close > 0){
            setTimeout(function(){
                document.body.removeChild(box);
            }, close * 1000);
        }
    }
}