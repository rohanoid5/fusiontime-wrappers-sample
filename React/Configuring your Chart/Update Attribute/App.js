// Time Series Attribute Update example
import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import ReactFC from 'react-fusioncharts';

ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeseriesDs: {
        type: 'timeseries',
        width: '800',
        height: '600',
        dataSource: {
          data: null,
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
      }
    };
    this.updateAttribute = this.updateAttribute.bind(this);
  }

  // We are creating our DataStore immediately after a component is mounted
  componentDidMount() {
    this.createDataTable();
  }

  createDataTable() {
    const dataFetch = fetch('data.json').then(jsonify);
    const schemaFetch = fetch('schema.json').then(jsonify);
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

  updateAttribute() {
    const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
    // Just add or update the attribute in the dataSource and it will get reflected in the chart.
    timeseriesDs.dataSource.yAxis[0].referenceline[0].style = {
      marker: {
        fill: '#41f459',
        stroke: '#41f459'
      }
    };
    this.setState({
      timeseriesDs
    });
  }

  render() {
    return (
      <div>
        <ReactFC {...this.state.timeseriesDs} />
        <button className="btn" onClick={this.updateAttribute}>
          Update Reference Line Color
        </button>
      </div>
    );
  }
}

export default App;
