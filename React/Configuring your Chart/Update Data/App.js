// Time Series Data Update example
import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import TimeSeries from '../Update Attribute/node_modules/fusioncharts/fusioncharts.timeseries';
import ReactFC from '../Update Attribute/node_modules/react-fusioncharts';

ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();
const dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
).then(jsonify);
const schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
).then(jsonify);

class App extends Component {
  constructor(props) {
    super(props);
    // In this method we are fetching our data and schema from remote URLs and creating our DataTable
    this.state = {
      timeseriesDs: {
        type: 'timeseries',
        width: '800',
        height: '600',
        dataSource: {
          caption: { text: 'Online Sales of a SuperStore in the US' },
          data: null,
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
      }
    };
    this.updateData = this.updateData.bind(this);
  }
  // We are creating our DataStore immediately after a component is mounted
  componentDidMount() {
    this.onFetchData();
  }
  onFetchData() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // Here we are creating our DataTable
      const dataTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = dataTable;
      this.setState({
        timeseriesDs
      });
    });
  }

  updateData() {
    // You can create DataTables multiple times using different data and schema.
    const dataFetch = fetch('data.json').then(jsonify);
    const schemaFetch = fetch('schema.json').then(jsonify);
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const dataTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.caption.text =
        'Temperature & Humidity at Emerald City and Gotham City';
      timeseriesDs.dataSource.series = 'Place';
      timeseriesDs.dataSource.yAxis = [
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
      ];

      // Then you can update the data in your dataSource with the newly created dataTable
      // and it will get reflected in the chart.
      timeseriesDs.dataSource.data = dataTable;
      this.setState({
        timeseriesDs
      });
    });
  }

  render() {
    return (
      <div>
        <ReactFC {...this.state.timeseriesDs} />
        <button className="btn" onClick={this.updateData}>
          Update Data
        </button>
      </div>
    );
  }
}

export default App;
