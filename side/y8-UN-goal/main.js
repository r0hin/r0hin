function singleStatsNeo2() {
  var x = document.getElementById("singleStatsButtons2");
  var y = document.getElementById("singleStatsButtonsFake2");
theGHO = 'Number of neonatal deaths (thousands)';
x.style.display = "none";
y.style.display = "block"; }

function singleStatsInf2() {
  var x = document.getElementById("singleStatsButtons2");
  var y = document.getElementById("singleStatsButtonsFake2");
theGHO = 'Number of infant deaths (thousands)';
x.style.display = "none";
y.style.display = "block"; }

function singleStatsFive2() {
  var x = document.getElementById("singleStatsButtons2");
  var y = document.getElementById("singleStatsButtonsFake2");
theGHO = 'Number of under-five deaths (thousands)';
x.style.display = "none";
y.style.display = "block"; }

function singleStatsNeo() {
  var x = document.getElementById("singleStatsButtons");
  var y = document.getElementById("singleStatsButtonsFake");
theGHO = 'Number of neonatal deaths (thousands)';
x.style.display = "none";
y.style.display = "block"; }

function singleStatsInf() {
  var x = document.getElementById("singleStatsButtons");
  var y = document.getElementById("singleStatsButtonsFake");
theGHO = 'Number of infant deaths (thousands)';
x.style.display = "none";
y.style.display = "block"; }

function singleStatsFive() {
  var x = document.getElementById("singleStatsButtons");
  var y = document.getElementById("singleStatsButtonsFake");
theGHO = 'Number of under-five deaths (thousands)';
x.style.display = "none";
y.style.display = "block"; }

function SearchStats() {


needle = document.getElementById('demoa-auto').value
year = document.getElementById('demoa2-auto').value





// iterate over each element in the array
for (var i = 0; i < obj.length; i++){
  // look for the entry with a matching `code` value
  if (obj[i].dims.COUNTRY == needle  && (obj[i].dims.YEAR == year  && (obj[i].dims.GHO == theGHO))) {
     value = obj[i].Value
document.getElementById('StatsTitle').innerHTML = "Stats - " + value + "."
     var ctx = document.getElementById("StatsChart");
     var myChart = new Chart(ctx, {
         type: 'bar',
         data: {
             labels: [needle, "Global OECD Average in 2016"],
             datasets: [{
                 label: needle + ' stats in bar graph with canvas & chart.js',
                 data: [value, 6.9],
                 backgroundColor: [
                     'rgba(255, 99, 132, 0.2)',
                     'rgba(255, 99, 132, 0.2)'
                 ],
                 borderColor: [
                     'rgba(255,99,132,1)',
                     'rgba(255,99,132,1)'
                 ],
                 borderWidth: 1
             }]
         },
         options: {
             scales: {
                 yAxes: [{
                     ticks: {
                         beginAtZero:true
                     }
                 }]
             }
         }
     });


   }}}

   function loadchart() {

       userCountry = document.getElementById('demo-auto').value
       userCountry2 = document.getElementById('demo2-auto').value

       document.getElementById("demo-auto").value = '';
       document.getElementById("demo2-auto").value = '';

       var obj = data;

       var needle = userCountry;

       var needle2 = userCountry2;

       var year1 = '2017'
       var year2 = '2016'
       var year3 = '2015'
       var year4 = '2014'
       var year5 = '2013'
       var year6 = '2012'
       var year7 = '2011'
       var year8 = '2010'


       // iterate over each element in the array
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle  && (obj[i].dims.YEAR == year1  && (obj[i].dims.GHO == theGHO))) {
            value1 = obj[i].Value
           // obj[i].name is the matched result
         }
       }

       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle && (obj[i].dims.YEAR == year2  && (obj[i].dims.GHO == theGHO))) {
            value2 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle  && (obj[i].dims.YEAR == year3  && (obj[i].dims.GHO == theGHO))) {
            value3 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle  && (obj[i].dims.YEAR == year4  && (obj[i].dims.GHO == theGHO))) {
            value4 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle  && (obj[i].dims.YEAR == year5  && (obj[i].dims.GHO == theGHO))) {
            value5 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle  && (obj[i].dims.YEAR == year6  && (obj[i].dims.GHO == theGHO))) {
            value6 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle  && (obj[i].dims.YEAR == year7  && (obj[i].dims.GHO == theGHO))) {
            value7 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle  && (obj[i].dims.YEAR == year8  && (obj[i].dims.GHO == theGHO))) {
            value8 = obj[i].Value
           // obj[i].name is the matched result
         }
       }

       // iterate over each element in the array
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle2  && (obj[i].dims.YEAR == year1  && (obj[i].dims.GHO == theGHO))) {
            value21 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle2 && (obj[i].dims.YEAR == year2  && (obj[i].dims.GHO == theGHO))) {
            value22 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle2  && (obj[i].dims.YEAR == year3  && (obj[i].dims.GHO == theGHO))) {
            value23 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle2  && (obj[i].dims.YEAR == year4  && (obj[i].dims.GHO == theGHO))) {
            value24 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle2  && (obj[i].dims.YEAR == year5  && (obj[i].dims.GHO == theGHO))) {
            value25 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle2  && (obj[i].dims.YEAR == year6  && (obj[i].dims.GHO == theGHO))) {
            value26 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle2  && (obj[i].dims.YEAR == year7  && (obj[i].dims.GHO == theGHO))) {
            value27 = obj[i].Value
           // obj[i].name is the matched result
         }
       }
       for (var i = 0; i < obj.length; i++){
         // look for the entry with a matching `code` value
         if (obj[i].dims.COUNTRY == needle2  && (obj[i].dims.YEAR == year8  && (obj[i].dims.GHO == theGHO))) {
            value28 = obj[i].Value
           // obj[i].name is the matched result
         }
       }


   value1 = parseFloat(value1);
   value2 = parseFloat(value2);
   value3 = parseFloat(value3);
   value4 = parseFloat(value4);
   value5 = parseFloat(value5);
   value6 = parseFloat(value6);
   value7 = parseFloat(value7);
   value8 = parseFloat(value8);
   value21 = parseFloat(value21);
   value22 = parseFloat(value22);
   value23 = parseFloat(value23);
   value24 = parseFloat(value24);
   value25 = parseFloat(value25);
   value26 = parseFloat(value26);
   value27 = parseFloat(value27);
   value28 = parseFloat(value28);


   window.chartColors = {
     red: 'rgb(255, 99, 132)',
     orange: 'rgb(255, 159, 64)',
     yellow: 'rgb(255, 205, 86)',
     green: 'rgb(75, 192, 192)',
     blue: 'rgb(54, 162, 235)',
     purple: 'rgb(153, 102, 255)',
     grey: 'rgb(231,233,237)'
   };

   var ScalingFactor = function() {
     return (Math.random() > 0.5 ? 1.0 : 1.0) * Math.round(Math.random() * 100);
   };


   var line1 = [value8, value7, value6, value5, value4, value3, value2, value1, ];

   var line2 = [value28, value27, value26, value25, value24, value23, value22, value21, ];
   var MONTHS = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];
   var config = {
     type: 'line',
     data: {
       labels: MONTHS,
       datasets: [{
         label: userCountry,
         backgroundColor: window.chartColors.red,
         borderColor: window.chartColors.red,
         data: line1,
         fill: false,
       }, {
         label: userCountry2,
         fill: false,
         backgroundColor: window.chartColors.blue,
         borderColor: window.chartColors.blue,
         data: line2,
       }]
     },
     options: {
       responsive: true,
       title:{
         display:true,
         text:'Comparison Line Chart --> Between ' + userCountry + ' and ' + userCountry2 + '.'
       },
       tooltips: {
         mode: 'index',
         intersect: false,
       },
      hover: {
         mode: 'nearest',
         intersect: true
       },
       scales: {
         xAxes: [{
           display: true,
           scaleLabel: {
             display: true,
             labelString: 'Year'
           }
         }],
         yAxes: [{
           display: true,
           scaleLabel: {
             display: true,
           },
         }]
       }
     }
   };
   var ctx = document.getElementById("canvasCompare").getContext("2d");
   var myLine = new Chart(ctx, config);
   }



function createBarChart() {


  var barPage = document.getElementById('rohinWrapper');
  var barButton = document.getElementById('barSetUpButton');
  barPage.style.display = 'block';
  barButton.style.display = 'none';








}

function AddBar() {
loadBar()
}

function loadBar () {
  userBarCountry = document.getElementById('bar1-auto').value
  if (barChartData.datasets.length > 0) {
    barChartData.labels.push(userBarCountry);

  var barYear = document.getElementById('exampleInputEmail1').value
  var barGHO = document.getElementById('exampleInputEmail23').value
  var data = obj;

  for (var i = 0; i < obj.length; i++){
    if (obj[i].dims.COUNTRY == userBarCountry  && (obj[i].dims.YEAR == barYear  && (obj[i].dims.GHO == barGHO))) {
       userBarCountryValue = obj[i].Value

      // obj[i].name is the matched result
    }
  }



  for (var index = 0; index < barChartData.datasets.length; ++index) {
    // window.myBar.addData(userBarCountryValue, index);
    barChartData.datasets[index].data.push(userBarCountryValue);
  }

  window.myBar.update();
}

}
