$("submit").onclick = function(){
    var p = parseInt($("perfect").value);
    var g = parseInt($("good").value);
    var c = parseInt($("combo").value);
    var n = parseInt($("notes").value);
    var lv = parseFloat($("level").value);
    var per_note = 900000 / n;
    var pd = p * per_note + g * per_note * 0.65
    var lj = c / n * 100000;
    var tot = Math.round(pd + lj);
    var acc = (pd / 900000 * 100).toFixed(2);
    $("score").innerHTML = 
        (tot < 1000000 ? '0' : '') + 
        (tot < 100000 ? '0' : '') + 
        (tot < 10000 ? '0' : '') + 
        (tot < 1000 ? '0' : '') + 
        (tot < 100 ? '0' : '') + 
        (tot < 10 ? '0' : '') + 
        tot;
    $("acc").innerHTML = 'Accuracy: ' + acc + '%';
    var flag = 1;
    if(tot >= 1000000){
        $("rank").innerHTML = 'φ';
        $("rank").style.color = '#ffd700';
        flag = 0;
    }else if(c == n){
        $("rank").innerHTML = 'V';
        $("rank").style.color = '#3388ff';
        flag = 0;
    }else if(tot >= 960000) $("rank").innerHTML = 'V';
    else if(tot >= 920000) $("rank").innerHTML = 'S';
    else if(tot >= 880000) $("rank").innerHTML = 'A';
    else if(tot >= 820000) $("rank").innerHTML = 'B';
    else if(tot >= 700000) $("rank").innerHTML = 'C';
    else $("rank").innerHTML = 'F';
    if(flag){
        $("rank").style.color = '#000000';
    }
    $("rank").style.fontSize = '30px';
    $("rank").style.width = '100px';
    var rks = ((acc - 55) / 45) ** 2 * lv;
    if(acc < 70) rks = 0;
    $("rks").innerHTML = '本曲rks: ' + rks.toFixed(3);
    var data_list = [0, 256, 256, 256, 256, 256, 256, 512, 512, 512, 768, 768, 768, 1024, 1024, 1280, 1536];
    var data = (tot - 700000) / 300000 * data_list[Math.floor(lv)];
    function toKB(x){
        if(x < 1024) return x.toFixed(2) + ' KB';
        else if(x < 1024 * 1024) return (x / 1024).toFixed(2) + ' MB';
    }
    if(tot < 880000) data = '0.00 KB';
    $("data").innerHTML = '获得 ' + toKB(data) + ' Data';
}