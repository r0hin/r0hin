function chartData() {
  var userChartGHO = document.getElementById('chartGHO-auto').value;
  var userChart1 = document.getElementById('chart1-auto').value;
  var userChart2 = document.getElementById('chart2-auto').value;
  var userChart3 = document.getElementById('chart3-auto').value;
  var userChart4 = document.getElementById('chart4-auto').value;
  document.getElementById('chartUIGHO').innerHTML = userChartGHO;


  document.getElementById('chartYear1').innerHTML = document.getElementById('chartYear-auto').value
  document.getElementById('chartYear2').innerHTML = document.getElementById('chartYear-auto').value

  document.getElementById('chartYear3').innerHTML = document.getElementById('chartYear-auto').value
  document.getElementById('chartYear4').innerHTML = document.getElementById('chartYear-auto').value


  document.getElementById('country1').innerHTML = userChart1;
  document.getElementById('country2').innerHTML = userChart2;
  document.getElementById('country3').innerHTML = userChart3;
  document.getElementById('country4').innerHTML = userChart4;

  var userChartGHO = document.getElementById('chartGHO-auto').value;
  var userChart1 = document.getElementById('chart1-auto').value;
  var userChart2 = document.getElementById('chart2-auto').value;
  var userChart3 = document.getElementById('chart3-auto').value;
  var userChart4 = document.getElementById('chart4-auto').value;


var userChartYear = document.getElementById('chartYear-auto').value
var userChartGHO = document.getElementById('chartGHO-auto').value;
var userChartCountry =
  obj = data




  for (var i = 0; i < obj.length; i++){
    // look for the entry with a matching `code` value

if (obj[i].dims.COUNTRY == userChart1  && (obj[i].dims.YEAR == userChartYear  && (obj[i].dims.GHO == userChartGHO))) {
  value1 = obj[i].Value;
document.getElementById('country1value1').innerHTML = value1 + '000';


}
}


for (var i = 0; i < obj.length; i++){
  // look for the entry with a matching `code` value
if (obj[i].dims.COUNTRY == userChart2  && (obj[i].dims.YEAR == userChartYear  && (obj[i].dims.GHO == userChartGHO))) {
value2 = obj[i].Value;
document.getElementById('country2value1').innerHTML = value2 + '000';


}
}

for (var i = 0; i < obj.length; i++){
  // look for the entry with a matching `code` value
if (obj[i].dims.COUNTRY == userChart3  && (obj[i].dims.YEAR == userChartYear  && (obj[i].dims.GHO == userChartGHO))) {
value3 = obj[i].Value;
document.getElementById('country3value1').innerHTML = value3 + '000';


}
}

for (var i = 0; i < obj.length; i++){
  // look for the entry with a matching `code` value
if (obj[i].dims.COUNTRY == userChart4  && (obj[i].dims.YEAR == userChartYear  && (obj[i].dims.GHO == userChartGHO))) {
value3 = obj[i].Value;
document.getElementById('country4value1').innerHTML = value3 + '000';


}
}








}
