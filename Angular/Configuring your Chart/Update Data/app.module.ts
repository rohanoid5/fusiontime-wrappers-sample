// Setup needed in app.module.ts
import { NgModule, enableProdMode } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load FusionTime module
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, TimeSeries);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FusionChartsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
