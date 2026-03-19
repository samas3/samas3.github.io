var $ = (i) => document.getElementById(i);
let file = new XMLHttpRequest();
let words = [];
file.open("GET", "dict.txt", false);
file.onreadystatechange = function() {
    if (file.readyState === 4) {
        if (file.status === 200 || file.status === 0) {
            let text = file.responseText;
            words = text.split("\n");
            console.log(words);
        }
    }
};
file.send(null);
function view(){
    let input = $("letters").value;
    let pattern = new RegExp(`^(?=.*${input[0]})[${input}]{4,}$`);
    let matches = [];
    for (let line of words) {
        if (pattern.test(line.trim())) {
            console.log(line);
            matches.push(line.trim());
        }
    }
    $("result").innerHTML = matches.join("\n");
}