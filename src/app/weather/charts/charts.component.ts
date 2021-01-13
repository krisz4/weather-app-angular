import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import OpenWeatherMap from 'openweathermap-ts';
import { CurrentResponse, GetByCityNameChild, ThreeHourResponse } from 'openweathermap-ts/dist/types';
import Locations from 'src/app/models/Locations';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @Input() set place(value: Locations) {
    if (value) {
      this.aktPlace = value;
      this.openWeather.getThreeHourForecastByCityName({ cityName: value.name }).then((val) => {
        console.log(val);
        if (val.cod=="404") {
          this.toastr.error("Sikertelen aíktuális időjárás lekérés");
          return;
        }
        this.convertToChartData(val);
      });
      this.openWeather.getCurrentWeatherByCityName({ cityName: value.name }).then((val) => {
        console.log(val);
        if (val.cod==404) {
          this.toastr.error("Sikertelen 5 napos időjárás lekérés");
          return;
        }
        this.currentWeather = val;
      });
    }
  }
  openWeather = new OpenWeatherMap({
    apiKey: 'b5d0d176ddf370f0e665dfae9ccf8c20'
  });

  aktPlace: Locations;
  chartData: any;
  currentWeather: CurrentResponse;

  view: any[] = [800, 800];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dátum';
  yAxisLabel: string = 'Hőmérséklet (°C)';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private toastr: ToastrService) {

  }

  ngOnInit(): void {

  }

  convertToChartData(data: ThreeHourResponse) {
    let array = [];
    array.push({ name: "Hómérséklet", series: [] });
    array.push({ name: "Min. Hómérséklet", series: [] });
    array.push({ name: "Max. Hómérséklet", series: [] });
    for (let i = 0; i < data.list.length; i++) {
      array[0].series.push({ name: data.list[i].dt_txt, value: data.list[i].main.temp });
      array[1].series.push({ name: data.list[i].dt_txt, value: data.list[i].main.temp_min });
      array[2].series.push({ name: data.list[i].dt_txt, value: data.list[i].main.temp_max });
    }
    this.chartData = array;
    console.log(this.chartData);
  }
}
