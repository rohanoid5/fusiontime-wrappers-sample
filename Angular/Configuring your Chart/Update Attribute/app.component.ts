import { Component } from '@angular/core';

import * as FusionCharts from 'fusioncharts';

// We are importing data and schema from an external source
import DataJson from '../../assets/data.json';
import SchemaJson from '../../assets/schema.json';

@Component({
  selector: 'app-update-attribute',
  templateUrl: './update-attribute.component.html',
  styles: []
})
export class AppComponent {
  dataSource: any;
  type: string;
  width: string;
  height: string;

  constructor() {
    this.type = 'timeseries';
    this.width = '800';
    this.height = '600';
    // We are first creating a DataStore using the data and schema we just imported
    // After that we used it to create a DataTable
    const dataTable = new FusionCharts.DataStore().createDataTable(
      DataJson,
      SchemaJson
    );

    // This is the initial dataSource for our chart
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
  }

  updateAttr() {
    // Just add or update the attribute in the dataSource and it will get reflected in the chart.
    this.dataSource.yAxis[0].referenceline[0].style = {
      marker: {
        fill: '#41f459',
        stroke: '#41f459'
      }
    };
  }
}
