import React, { Component } from 'react';
import { StyleSheet, View, Button, Platform } from 'react-native';
import ReactNativeFusionCharts from 'react-native-fusioncharts';

const jsonify = res => res.json();
// This is the remote url to fetch the data.
const dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
).then(jsonify);
// This is the remote url to fetch the schema.
const schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
).then(jsonify);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.apiCaller = null;
    this.state = {
      type: 'timeseries',
      width: '90%',
      height: '100%',
      dataSource: {
        // Initially data is set as null
        data: null,
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
      },
      schemaJson: null,
      dataJson: null
    };

    this.libraryPath = Platform.select({
      ios: require('./assets/fusioncharts.html'),
      android: { uri: 'file:///android_asset/fusioncharts.html' }
    });

    this.onUpdateAttribute = this.onUpdateAttribute.bind(this);
  }

  // We are fetching data and schema from URLs and setting that to our chart
  // as soon as the component is rendered for the first time.
  componentDidMount() {
    this.fetchDataAndSchema();
  }

  // Here we are fetching data and schema from URLs.
  fetchDataAndSchema() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      this.setState({ dataJson: data, schemaJson: schema });
    });
  }

  onUpdateAttribute() {
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
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts
            dataJson={this.state.dataJson} // Passing the data to the chart
            schemaJson={this.state.schemaJson} // Passing the schema to the chart
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            onPress={this.onPress}
            title="Update Chart Data"
            color="#841577"
            accessibilityLabel="Update the chart data"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  text: {
    fontSize: 15,
    margin: 13
  },
  chartContainer: {
    height: 450
  }
});
