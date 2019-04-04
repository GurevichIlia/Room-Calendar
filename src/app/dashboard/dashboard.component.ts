import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { DashboardService } from '../services/dashboard.service';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  multi: any[] = [];
  single: any;
  guests: any;
  price: any;
  rooms: any;
  reservations: any;
  arrivalDate;
  evacuateDate;
  view: any[] = [1200, 500];
  ranges: any;
  selected: any;
  locale = {
    format: 'MM/DD/YYYY',
    separator: ' To ', // default is ' - '
    cancelLabel: 'Cancel', // detault is 'Cancel'
    applyLabel: 'Apply', // detault is 'Apply'
    firstDay: 1 // first day is monday
  };
  // options charts
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel;
  colorScheme = {
    domain: ['blue', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // line, area
  autoScale = true;

  constructor(private dashboardService: DashboardService) {
    // Object.assign(this.single);
    this.ranges = {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    };
    this.selected = {
      start: moment(),
      end: moment().add(7, 'days')
    };
  }
  onSelect(event) {

    console.log(event);
  }
  choosedDate(event) {
    console.log(event);
  }

  ngOnInit() {
    this.GetChartDataForPeople();

  }
  GetChartDataForPrice() {
    console.log(moment(this.selected.start).format('YYYY-MM-DD'), moment(this.selected.end).format('YYYY-MM-DD'));
    this.arrivalDate = moment(this.selected.start).format('YYYY-MM-DD');
    this.evacuateDate = moment(this.selected.end).format('YYYY-MM-DD');
    this.dashboardService.GetChartDataForPrice(this.arrivalDate, this.evacuateDate).subscribe(data => {
      const response = data;
      this.price = this.dashboardService.changeResFromSerмForCharts(response['Data'], 'Price');
      this.multi.push(this.price);
      console.log('price', data);
    },
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'));

  }
  GetChartDataForPeople() {
    console.log(moment(this.selected.start).format('YYYY-MM-DD'), moment(this.selected.end).format('YYYY-MM-DD'));
    this.arrivalDate = moment(this.selected.start).format('YYYY-MM-DD');
    this.evacuateDate = moment(this.selected.end).format('YYYY-MM-DD');
    this.dashboardService.GetChartDataForPeople(this.arrivalDate, this.evacuateDate).subscribe(data => {
      const response = data;
      this.guests = this.dashboardService.changeResFromSerмForCharts(response['Data'], 'People');
      this.multi = [];
      this.multi.push(this.guests);
      console.log('guests', data);
      this.GetChartDataForPrice();
      this.GetChartDataForCountReservations();
      this.GetChartDataForCountRooms();

    },
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'));
  }
  GetChartDataForCountReservations() {
    console.log(moment(this.selected.start).format('YYYY-MM-DD'), moment(this.selected.end).format('YYYY-MM-DD'));
    this.arrivalDate = moment(this.selected.start).format('YYYY-MM-DD');
    this.evacuateDate = moment(this.selected.end).format('YYYY-MM-DD');
    this.dashboardService.GetChartDataForCountReservations(this.arrivalDate, this.evacuateDate).subscribe(data => {
      const response = data;
      this.reservations = this.dashboardService.changeResFromSerмForCharts(response['Data'], 'Reservations');
      this.multi.push(this.reservations);
      console.log('reser', this.reservations);
    },
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'));
  }
  GetChartDataForCountRooms() {
    console.log(moment(this.selected.start).format('YYYY-MM-DD'), moment(this.selected.end).format('YYYY-MM-DD'));
    this.arrivalDate = moment(this.selected.start).format('YYYY-MM-DD');
    this.evacuateDate = moment(this.selected.end).format('YYYY-MM-DD');
    this.dashboardService.GetChartDataForCountRooms(this.arrivalDate, this.evacuateDate).subscribe(data => {
      const response = data;
      this.rooms = this.dashboardService.changeResFromSerмForCharts(response['Data'], 'Rooms');
      console.log('rooms', data);
      this.multi.push(this.rooms);
      console.log('rooms', this.multi);
      this.multi = [...this.multi];
    },
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'));
  }

}



