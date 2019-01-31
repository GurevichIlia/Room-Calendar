import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { observable, Observable, } from 'rxjs';
import { CalendareRoom } from '../model/CalendareRoom.model';



@Injectable({
  providedIn: 'root'
})

export class GetRoomsService {
  readonly rootURL = 'http://jaffapms.service.amax.co.il/API/';

  constructor(private http: HttpClient) { }

  // getRooms(): Observable<any> {
  //   return this.http.get(
  //     this.rootURL + 'Service/GetBookedRooms?StartDate=14-01-2019&EndDate=28-01-2019&RoomGroupId='
  //   ).pipe(map((res: Response) => {
  //     const data = res.json();
  //     return data;
  //   })); // }
  getGroupsRooms() {
    return this.http.get(
      this.rootURL + 'DropDown/GetGroups',
      // {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json; charset=utf-8',
      //     'X-Token': sessionStorage.getItem('XToken')
      //   })
      // }
    );
  }
  getRoomsCalendar(): Observable<any> {
    return this.http.get(
      this.rootURL + 'Service/GetRoomsForClaendarView?RoomGroupId=',
    ).pipe(map((res: Response) => {
      return res['Data'];
    }));
  }

  GetBookedRooms(StartDate, EndDate, RoomGroupId): Observable<any> {
    const header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(
      this.rootURL + 'Service/GetBookedRooms?StartDate=' + StartDate + '&EndDate=' + EndDate + '&RoomGroupId=' + RoomGroupId,
    );
  }
}
