const angular = require('angular');
const FusionCharts = require('fusioncharts');
require('angularjs-fusioncharts');
const TimeSeries = require('fusioncharts/fusioncharts.timeseries');
TimeSeries(FusionCharts);
const app = angular.module('myApp', ['ng-fusioncharts']);

const jsonify = res => res.json();
const dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
).then(jsonify);
const schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
).then(jsonify);

const dataJson = require('./data.json');
const schemaJson = require('./schema.json');

const app = angular.module('myApp', ['ng-fusioncharts']);

app.controller('MyController', function($scope) {
  // This is the initial dataSource for our chart
  $scope.dataSource = {
    data: null, // data field set as null initially as we are fetching it from an endpoint.
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
  };

  // Here we are fetching the data and schema from endpoints
  Promise.all([dataFetch, schemaFetch]).then(res => {
    const data = res[0];
    const schema = res[1];
    // We are first creating a DataStore using the data and schema we just fetched
    // After that we used it to create a DataTable
    const fusionTable = new FusionCharts.DataStore().createDataTable(
      data,
      schema
    );
    // Finally we update the data field of our dataSource with the DataTable we just created
    $scope.$apply(function() {
      $scope.dataSource.data = fusionTable;
    });
  });

  // Here we are updating the data field of our DataSource when the user clicks a button
  $scope.updateData = function() {
    // The new DataTable with different data and schema
    const dataTable = new FusionCharts.DataStore().createDataTable(
      dataJson,
      schemaJson
    );
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
    };
  };
});
