var ctx = document.getElementById("myChart").getContext('2d');
let ownlabel = [

];
let owndata = [

];
fetch(ownurl)
  .then(result => result.json())
  .then(data => {
    console.log(data);
    data.body.forEach(item => {
      ownlabel.unshift(item.date)
      owndata.unshift(item.total)
    });
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ownlabel,
        datasets: [{
          label: 'Pendaftar',
          data: owndata,
          borderWidth: 2,
          backgroundColor: 'transparent',
          borderColor: 'rgba(254,86,83,.7)',
          borderWidth: 2.5,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          pointRadius: 4
        },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            gridLines: {
              drawBorder: false,
              color: '#f2f2f2',
            },
            ticks: {
              beginAtZero: true,
              stepSize: 200
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
      }
    });
  })

$('#visitorMap').vectorMap(
  {
    map: 'world_en',
    backgroundColor: '#ffffff',
    borderColor: '#f2f2f2',
    borderOpacity: .8,
    borderWidth: 1,
    hoverColor: '#000',
    hoverOpacity: .8,
    color: '#ddd',
    normalizeFunction: 'linear',
    selectedRegions: false,
    showTooltip: true,
    pins: {
      id: '<div class="jqvmap-circle"></div>',
      my: '<div class="jqvmap-circle"></div>',
      th: '<div class="jqvmap-circle"></div>',
      sy: '<div class="jqvmap-circle"></div>',
      eg: '<div class="jqvmap-circle"></div>',
      ae: '<div class="jqvmap-circle"></div>',
      nz: '<div class="jqvmap-circle"></div>',
      tl: '<div class="jqvmap-circle"></div>',
      ng: '<div class="jqvmap-circle"></div>',
      si: '<div class="jqvmap-circle"></div>',
      pa: '<div class="jqvmap-circle"></div>',
      au: '<div class="jqvmap-circle"></div>',
      ca: '<div class="jqvmap-circle"></div>',
      tr: '<div class="jqvmap-circle"></div>',
    },
  });
