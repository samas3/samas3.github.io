var $ = (i) => document.getElementById(i);
$('calc').onclick = () => {
  var a = eval($('cd').value), b = $('speed').value;
  var c = Math.PI * 2 / a - b + Math.PI * 2;
  c %= Math.PI * 2;
  $('result').innerHTML = `${Math.round(c * 10) / 10} rad/s`;
};