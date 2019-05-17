import { Component } from '@angular/core';

import * as FusionCharts from 'fusioncharts';

// We are importing data and schema from an external source
import DataJson from '../../assets/data.json';
import SchemaJson from '../../assets/schema.json';

const jsonify = res => res.json();
const dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
).then(jsonify);
const schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
).then(jsonify);

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styles: ['update-data.component.css']
})
export class UpdateDataComponent {
  dataSource: any;
  type: string;
  width: string;
  height: string;
  constructor() {
    this.type = 'timeseries';
    this.width = '800';
    this.height = '600';
    // This is the initial dataSource for our chart
    this.dataSource = {
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
    };
    this.fetchData();
  }

  fetchData() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // Here we are creating our DataTable for the first time
      const dataTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      this.dataSource.data = dataTable;
    });
  }

  updateData() {
    // You can create DataTables multiple times using different data and schema.
    const dataTable = new FusionCharts.DataStore().createDataTable(
      DataJson,
      SchemaJson
    );
    // Then you can update the data in your dataSource with the newly created dataTable
    // and it will get reflected in the chart.
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
