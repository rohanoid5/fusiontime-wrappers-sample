var FusionCharts = require('fusioncharts');
var TimeSeries = require('fusioncharts/fusioncharts.timeseries');
var $ = require('jquery');
var jQueryFusionCharts = require('jquery-fusioncharts');

const dataJson = require('./data.json');
const schemaJson = require('./schema.json');

TimeSeries(FusionCharts); // Resolve Charts as dependency for FusionCharts.
jQueryFusionCharts(FusionCharts); // Resolve FusionCharts as dependency for jqueryFusionCharts.

var jsonify = res => res.json();
var dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
).then(jsonify);
var schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
).then(jsonify);

// The new DataTable with different data and schema
const fusionDataStore = new FusionCharts.DataStore();
const dataTableTwo = fusionDataStore.createDataTable(dataJson, schemaJson);

Promise.all([dataFetch, schemaFetch]).then(res => {
  const data = res[0];
  const schema = res[1];
  // First we are creating a DataStore
  const fusionDataStore = new FusionCharts.DataStore();
  // After that we are creating a DataTable by passing our data and schema as arguments
  const dataTable = fusionDataStore.createDataTable(data, schema);

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
          text: 'Online Sales of a SuperStore in the US'
        },
        subcaption: {
          text: null
        },
        yAxis: [
          {
            plot: [
              {
                value: 'Sales ($)'
              }
            ]
          }
        ]
      }
    });

    // Here we are updating the data field of our DataSource when the user clicks a button
    $('#updateData').click(function() {
      $('#chart-container').updateFusionCharts({
        dataSource: {
          data: dataTableTwo,
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
              }
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
});
