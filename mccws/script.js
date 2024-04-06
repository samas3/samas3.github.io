var $ = (x) => document.getElementById(x);
var ws, playerName = "";
$("connect").onclick = connect;
function setStatus(s){
    $("status").innerHTML = s;
}
function connect(){
    var ip = $("ip").value;
    var port = $("port").value;
    setStatus("Connecting");
    ws = new WebSocket(`ws://${ip}:${port}`);
    ws.onopen = onopen;
    ws.onmessage = onmessage;
    ws.onclose = onclose;
    ws.onerror = onerror;
}
function resize(){
    var height = document.documentElement.clientHeight;
    $("output").style.height = (height - 70) + "px";
}
window.onload = resize;
window.onresize = resize;
function onopen(){
    $("index").style = "display: none;";
    $("terminal").style = "";
}
function parseValue(str){
    try{
        return JSON.parse(str);
    }catch(e){
        return str;
    }
}
function findAllNum(str){
    var res = [];
    var re = /[1-9]*[0-9]([\.][0-9]+)?/g;
    return [...str.matchAll(re)].map(x => x[0]);
}
var first1 = true, first2 = true;
function onmessage(evt){
    var data = JSON.parse(evt.data);
    var ret = JSON.parse(data.data);
    switch(data.event){
        case "OnWsCommandResponse":
            if(ret.result){
                var result = ret.result;
                if(isJSON(result)) result = JSON.stringify(result);
                insert(`MCC Command ${ret.requestId}: ${result}`);
                if(first1 && first2 && ret.result == "Successfully authenticated!"){
                    ws.send("/health");
                    ws.send(JSON.stringify({"command":"GetUsername","requestId":"name","parameters":[]}));
                    ws.send("WebSocket Enabled!")
                }
                if(first2 && ret.command == "GetUsername"){
                    playerName = ret.result;
                    first2 = false;
                }
            }else{
                var result = ret.message;
                if(isJSON(result)) result = JSON.stringify(result);
                insert(`MCC Command ${ret.requestId} error: ${result}`);
            }
            break;
        case "OnChatRaw":
            insert(ret.text.replace(/§./g, ""));
            break;
        case "OnDisconnect":
            insert(`${ret.reason}: ${message}`);
            break;
        case "OnServerTpsUpdate":
            $("tps").innerHTML = `TPS: ${Math.round(ret.tps * 100) / 100}`;
            break;
        case "OnTimeUpdate":
            var gameTime = (ret.timeOfDay / 24000 * 86400 + 6 * 3600) % 86400;
            var h = Math.floor(gameTime / 3600), m = Math.floor(gameTime % 3600 / 60);
            $("time").innerHTML = `Time: ${h}:${m > 9 ? "" : "0"}${m}`;
            break;
        case "OnInternalCommand":
            insert(`Command executed: ${ret.command}`);
            insert(`Command result: ${ret.result}`);
            if(first1 && ret.command == "health"){
                var lst = findAllNum(ret.result);
                $("health").innerHTML = `Health: ${Math.round(parseFloat(lst[0]) * 100) / 100}`;
                $("food").innerHTML = `Food: ${lst[1]}`;
                $("exp").innerHTML = `Exp: ${lst[3]} (Lvl ${lst[2]})`;
                first1 = false;
            }
            break;
        case "OnHealthUpdate":
            $("health").innerHTML = `Health: ${Math.round(ret.health * 100) / 100}`;
            $("food").innerHTML = `Food: ${ret.food}`;
            break;
        case "OnSetExperience":
            $("exp").innerHTML = `Exp: ${ret.totalExperience} (Lvl ${ret.level})`;
            break;
        case "OnTitle":
            console.log(ret);
            break;
        case "OnDeath":
            insert("Bot died");
            break;
        case "OnRespawn":
            insert("Bot respawned");
            break;
        case "OnLatencyUpdate":
            if(ret.playerName == playerName){
                $("ping").innerHTML = `Ping: ${ret.latency}ms`;
            }
            break;
        case "OnInventoryUpdate":
            insert(`Inventory ${ret.inventoryId} updated`)
            break;
        case "OnInventoryOpen":
            insert(`Inventory ${ret.inventoryId} opened`)
            break;
        case "OnInventoryClose":
            insert(`Inventory ${ret.inventoryId} closed`)
            break;
        default:
            //insert("1");
    }
}
function onclose(){
    $("index").style = "";
    $("terminal").style = "display: none;";
    $("input").value = "";
    $("output").value = "";
    //setStatus("Closed");
    setStatus("Waiting for connection");
}
function onerror(){
    MyUtil.createPopupBox("An error occured", "#f00");
}
function getUuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
}
function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            return (typeof obj == 'object' && obj);
        } catch(e) {
            return false;
        }
    }else if(typeof str == 'object') return true;
    return false;
}

function insert(str){
    if(isJSON(str)) str = JSON.stringify(str);
    var out = $("output");
    out.value += str + "\n";
    out.scrollTop = out.scrollHeight;
}
var cmdHistory = [], cur = 0;
$("send").onclick = handleCommand;
$("input").onkeydown = (evt) => {
    var key = evt.key.toLocaleLowerCase();
    switch(key){
        case "enter":
            handleCommand();
            break;
        case "arrowup":
            cur = Math.max(cur - 1, 0);
            break;
        case "arrowdown":
            cur = Math.min(cur + 1, cmdHistory.length - 1);
            break;
    }
    if(key == "arrowup" || key == "arrowdown"){
        var content = $("input");
        content.value = cmdHistory[cur];
        content.focus();
        var range = document.createRange();
        range.selectNodeContents(content);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
function handleCommand(){
    var command = $("input").value;
    var req;
    cmdHistory.push(command);
    cur = cmdHistory.length;
    if(command.toLocaleLowerCase().startsWith("!close")){
        ws.close();
    }else if(command.toLocaleLowerCase().startsWith("!send")){
        ws.send(command.substr(6));
    }
    if(command.startsWith("$")){
        command = command.substr(1).split(" ");
        req = {
            "command": command[0],
            "requestId": getUuid(),
            "parameters": command.slice(1).map(x => parseValue(x))
        };
        ws.send(JSON.stringify(req));
    }else if(command.startsWith('/')){
        ws.send("/send " + command);
    }else{
        ws.send(command);
    }
    $("input").value = "";
}