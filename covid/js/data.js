
//     var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://covid-193.p.rapidapi.com/history?country=All",
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "covid-193.p.rapidapi.com",
//             "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497"
//         }
//     }
    
//     labels = []
//     dataset = []
    
//     $.ajax(settings).done(function (response) {
//         console.log(response.response[1200]);
    
//         for (let i = 0; i < response.response.length; i++) {
//             var x = response.response[i].day
//             x = Date.parse(x)
//             var y = new Date();
     
//             //Change it so that it is 7 days in the past.
//             var pastDate = y.getDate() - 7;
//             y.setDate(pastDate);
//             y = Date.parse(y)
            
//             if (y < x) {
//                 labels.push(response.response[i].day)
//                 dataset.push(response.response[i].cases.active)
//             }
            
//         }
    
//          var ctx = document.getElementById('myChart');
//                 var myChart = new Chart(ctx, {
//                     type: 'line',
//                     data: {
//                         labels: labels,
//                         datasets: [{
//                             label: 'Global Active Cases',
//                             data: dataset,
//                             backgroundColor: [
//                                 'rgba(255, 99, 132, 0.2)',
//                                 'rgba(54, 162, 235, 0.2)',
//                                 'rgba(255, 206, 86, 0.2)',
//                                 'rgba(75, 192, 192, 0.2)',
//                                 'rgba(153, 102, 255, 0.2)',
//                                 'rgba(255, 159, 64, 0.2)'
//                             ],
//                             borderColor: [
//                                 'rgba(255, 99, 132, 1)',
//                                 'rgba(54, 162, 235, 1)',
//                                 'rgba(255, 206, 86, 1)',
//                                 'rgba(75, 192, 192, 1)',
//                                 'rgba(153, 102, 255, 1)',
//                                 'rgba(255, 159, 64, 1)'
//                             ],
//                             borderWidth: 1
//                         }]
//                     },
//                     options: {
//                         scales: {
//                             yAxes: [{
//                                 ticks: {
//                                     beginAtZero: true
//                                 }
//                             }]
//                         }
//                     }
//                 });
    
        
//     });
        
// }