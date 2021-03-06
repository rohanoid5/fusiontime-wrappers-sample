import Component from '@ember/component';

const dataJson = 'IMPORT_YOUR_DATA';
const schemaJson = 'IMPORT_YOUR_SCHEMA';

// This is the initial dataSource for our chart
const dataSource = {
  data: null, // data field set as null initially as we are fetching it from an endpoint.
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

const jsonify = res => res.json();
var dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
).then(jsonify);
var schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
).then(jsonify);

export default Component.extend({
  width: 800,
  height: 600,
  type: 'timeseries',
  dataFormat: null,
  actions: {
    // Here we are updating the color of a reference line in the chart by changing an
    // attribute in the chart
    updateAttr() {
      const dataSource = Object.assign({}, this.get('dataSource'));
      dataSource.yAxis[0].referenceline[0].style = {
        marker: {
          fill: '#41f459',
          stroke: '#41f459'
        }
      };
      this.set('dataSource', dataSource);
    }
  },

  init() {
    this._super(...arguments);
    this.createDataTable();
  },

  createDataTable() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionDataTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      dataSource.data = fusionDataTable;
      this.set('dataSource', dataSource);
    });
  }
});
