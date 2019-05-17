//Including Vue
import Vue from 'vue';

// Include the vue-fusioncharts component
import VueFusionCharts from 'vue-fusioncharts';

//Include the FusionCharts library
import FusionCharts from 'fusioncharts';

//Include the chart type
import TimeSeries from 'fusioncharts/fusioncharts.timeseriess';

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, TimeSeries);

// We are importing data and schema from an external source
import dataJson from '../assets/data.json';
import schemaJson from '../assets/schema.json';

var app = new Vue({
  el: '#app',
  data: {
    width: '800',
    height: '600',
    type: 'timeseries',
    dataFormat: 'json',
    // This is the initial dataSource for our chart
    dataSource: {
      data: null, // data field set as null initially
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
  },
  mounted: function() {
    // We are first creating a DataStore using the data and schema we just imported
    // After that we used it to create a DataTable
    const dataTable = new FusionCharts.DataStore().createDataTable(
      dataJson,
      schemaJson
    );
    // Finally we update the data field of our dataSource with the DataTable we just created
    this.dataSource.data = dataTable;
  },
  methods: {
    // Just add or update the attribute in the dataSource and it will get reflected in the chart.
    updateData: function() {
      this.dataSource.yAxis[0].referenceline[0].style = {
        marker: {
          fill: '#41f459',
          stroke: '#41f459'
        }
      };
    }
  }
});
