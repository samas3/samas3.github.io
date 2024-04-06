var $ = (i) => document.getElementById(i);
var rate = [40, 30, 20, 10, 3, 2, 1, 0.5];
var boost = [1, 1.1, 1.2];
$('calc').onclick = () => {
  var type = $('type').value, eboost = $('boost').value, k = $('cnt').value;
  var p = rate[type] * boost[eboost] / 100;
  var outNum = 2 * p * k / (5 * (p + 1)), out1 = calc(k, p);
  $('result').innerHTML = `平均消耗 ${Math.floor((2.5 + 2.5 / p) * 100) / 100} 个花瓣合成一个，期望得到 ${Math.floor(outNum * 100) / 100} 个花瓣，成功率 ${Math.floor(out1 * 10000) / 100}%`;
};
function count(k){
  var i = Math.floor(k / 5), j = k % 5;
  if(k < 5) return 0;
  return i + count(5 * i / 2 + j)
}
function calc(k, p){
  return 1 - (1 - p) ** count(k);
}
$('type').onclick = $('boost').onclick = changeRate;
function changeRate(){
  var type = $('type').value, eboost = $('boost').value;
  var p = rate[type] * boost[eboost];
  $('rate').innerHTML = p;
}