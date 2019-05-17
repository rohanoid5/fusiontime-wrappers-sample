var angular = require('angular');
var FusionCharts = require('fusioncharts');
require('angularjs-fusioncharts');
var TimeSeries = require('fusioncharts/fusioncharts.timeseries');
TimeSeries(FusionCharts);
var app = angular.module('myApp', ['ng-fusioncharts']);

// We are importing data and schema from an external source
const dataJson = require('./data.json');
const schemaJson = require('./schema.json');

var app = angular.module('myApp', ['ng-fusioncharts']);

app.controller('MyController', function($scope) {
  // We are first creating a DataStore using the data and schema we just imported
  // After that we used it to create a DataTable
  const dataTable = new FusionCharts.DataStore().createDataTable(
    dataJson,
    schemaJson
  );

  // This is the initial dataSource for our chart
  $scope.dataSource = {
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
  };

  // Here we are updating the color of a reference line in the chart by changing an
  // attribute in the chart
  $scope.updateAttribute = function() {
    $scope.dataSource.yAxis[0].referenceline[0].style = {
      marker: {
        fill: '#41f459',
        stroke: '#41f459'
      }
    };
  };
});
