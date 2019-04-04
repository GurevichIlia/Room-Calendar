import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  readonly rootURL = 'http://apitest.jaffapms.com/API/';

  newResponse:
    {
      name: string,
      series: any[];

    }
    ;
  valueForCharts: {
    name: string;
    value: number
  };
  constructor(private http: HttpClient) {
    this.valueForCharts = {
      name: '',
      value: null
    };
  }

  public GetChartDataForPrice(from, to) {
    return this.http.get(
      this.rootURL + 'Dashboard/GetChartDataForPrice?from=' + from + '&to=' + to,
    ).pipe(map(res => res));
  }
  public GetChartDataForPeople(from, to) {
    return this.http.get(
      this.rootURL + 'Dashboard/GetChartDataForPeople?from=' + from + '&to=' + to,
    ).pipe(map(res => res));
  }
  public GetChartDataForCountRooms(from, to) {
    return this.http.get(
      this.rootURL + 'Dashboard/GetChartDataForCountRooms?from=' + from + '&to=' + to,
    ).pipe(map(res => res));
  }
  public GetChartDataForCountReservations(from, to) {
    return this.http.get(
      this.rootURL + 'Dashboard/GetChartDataForCountReservations?from=' + from + '&to=' + to,
    ).pipe(map(res => res));
  }
  // Метод меняет ответ с сервера на подходящий для отображения графиков, имененный ответ {newResponse: [
  // {
  // name: string,
  // series: any[
  //   {
  //     name: string;
  //     value: number
  //   };
  // ];
  // }
  // ]};
  changeResFromSerмForCharts(res, name: string) {
    const newRes = [];
    for (const x of res) {
      this.valueForCharts = {
        name: x.Text,
        value: x.Value1
      };
      newRes.push(this.valueForCharts);
    }
    this.newResponse = {
      name: name,
      series: newRes

    };
    return this.newResponse;
  }
}
