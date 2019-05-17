const FusionCharts = require('fusioncharts');
const TimeSeries = require('fusioncharts/fusioncharts.timeseries');
const $ = require('jquery');
const jQueryFusionCharts = require('jquery-fusioncharts');

// We are importing data and schema from an external source
const dataJson = require('./data.json');
const schemaJson = require('./schema.json');

TimeSeries(FusionCharts); // Resolve Charts as dependency for FusionCharts.
jQueryFusionCharts(FusionCharts); // Resolve FusionCharts as dependency for jqueryFusionCharts.

// We are first creating a DataStore using the data and schema we just imported
// After that we used it to create a DataTable
const fusionDataStore = new FusionCharts.DataStore();
const dataTable = fusionDataStore.createDataTable(dataJson, schemaJson);

$('document').ready(function() {
  $('#chart-container').insertFusionCharts({
    type: 'timeseries',
    width: '800',
    height: '600',
    dataFormat: 'json',
    // This is the initial dataSource for our chart
    dataSource: {
      data: dataTable,
      caption: {
        text: 'Temperature & Humidity at Emerald City and Gotham City'
      },
      subcaption: {
        text: 'Over the last 28 years'
      },
      series: 'Place',
      yAxis: [
        {
          plot: 'Temperature',
          title: 'Temperature(°C)',
          format: {
            suffix: '°C'
          },
          referenceline: [
            {
              label: 'Controlled Temperature',
              value: '20'
            }
          ]
        },
        {
          plot: 'Humidity',
          title: 'Humidity(%)',
          format: {
            suffix: '%'
          }
        }
      ]
    }
  });

  // Here we are updating the color of a reference line in the chart by changing an
  // attribute in the chart
  $('#updateAttribute').click(function() {
    $('#chart-container').updateFusionCharts({
      dataSource: {
        data: dataTable,
        caption: {
          text: 'Temperature & Humidity at Emerald City and Gotham City'
        },
        subcaption: {
          text: 'Over the last 28 years'
        },
        series: 'Place',
        yAxis: [
          {
            plot: 'Temperature',
            title: 'Temperature(°C)',
            format: {
              suffix: '°C'
            },
            referenceline: [
              {
                label: 'Controlled Temperature',
                value: '20',
                style: {
                  marker: {
                    fill: '#41f459',
                    stroke: '#41f459'
                  }
                }
              }
            ]
          },
          {
            plot: 'Humidity',
            title: 'Humidity(%)',
            format: {
              suffix: '%'
            }
          }
        ]
      }
    });
  });
});
