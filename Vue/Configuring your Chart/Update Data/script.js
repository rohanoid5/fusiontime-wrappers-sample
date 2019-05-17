//Including Vue
import Vue from 'vue';

// Include the vue-fusioncharts component
import VueFusionCharts from 'vue-fusioncharts';

//Include the FusionCharts library
import FusionCharts from 'fusioncharts';

//Include the chart type
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, TimeSeries);

// We are importing data and schema from an external source
import dataJson from '../assets/data.json';
import schemaJson from '../assets/schema.json';

var app = new Vue({
  el: '#app',
  data: function() {
    return {
      width: '800',
      height: '600',
      type: 'timeseries',
      dataFormat: 'json',
      // This is the initial dataSource for our chart
      dataSource: {
        caption: { text: 'Online Sales of a SuperStore in the US' },
        subcaption: { text: null },
        data: null, // data field set as null initially
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
    };
  },
  mounted: function() {
    // Here we are fetching the data and schema from endpoints
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // We are first creating a DataStore using the data and schema we just fetched
      // After that we used it to create a DataTable
      const dataTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      // Finally we update the data field of our dataSource with the DataTable we just created
      this.dataSource.data = dataTable;
    });
  },
  methods: {
    // Here we are updating the data field of our DataSource when the user clicks a button
    updateData: function() {
      // The new DataTable with different data and schema
      const dataTable = new FusionCharts.DataStore().createDataTable(
        dataJson,
        schemaJson
      );
      // Finally we update the data field of our dataSource with the DataTable we just created
      this.dataSource = {
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
    }
  }
});
