import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, } from 'rxjs';




@Injectable({
  providedIn: 'root'
})

export class GetRoomsService {
  readonly rootURL = 'http://apitest.jaffapms.com/API/';
  public bookedRooms: any[];
  public availableRoomsBtwDate;
  // private TestRooms = new BehaviorSubject(this.availableRoomsBtwDate);
  // public availableRooms = this.TestRooms.asObservable();
  public bookedRoomLoaded = false;
  constructor(private http: HttpClient) {
  }


  getGroupsRooms() {
    return this.http.get(
      this.rootURL + 'DropDown/GetGroups',
    );
  }
  getRoomsCalendar(): Observable<any> {
    return this.http.get(
      this.rootURL + 'Service/GetRoomsForClaendarView?RoomGroupId=',
    );
  }
  getBookedRooms(StartDate, EndDate, RoomGroupId): Observable<any> {
    return this.http.get(
      this.rootURL + 'Service/GetBookedRooms?StartDate=' + StartDate + '&EndDate=' + EndDate + '&RoomGroupId=' + RoomGroupId,
    );
  }
  getRoomById(id: number): Observable<any> {
    const url = `http://apitest.jaffapms.com/API/Rooms/GetRoomDetById?RoomId=${id}`;
    return this.http.get(url);
  }
  getRooms(): Observable<any> {
    return this.http.get(
      'http://apitest.jaffapms.com/API/Rooms/GetRoomDetById?RoomId=116'
    );
  }
  GetRoomByRoomId(RoomId): Observable<any> {
    return this.http.get(
      this.rootURL + 'Service/GetRoomByRoomId?RoomId=' + RoomId,
    );
  }
  GetAvailableRooms(ArrivalDate, EvacuateDate, maxAdults, maxChildren, maxBaby, Lang, MealType, OrganizationID): Observable<any> {
    return this.http.get(
      // tslint:disable-next-line:max-line-length
      'http://api.jaffapms.com/API/PMSSiteSearch/GetSearchDataSite?ArrivalDate=' + ArrivalDate + '&EvacuateDate=' + EvacuateDate + '&maxadults=' + maxAdults + '&maxchildren=' + maxChildren + '&maxbaby=0' + '&Lang=en' + '&MealType=' + MealType + '&OrganizationID=metzokentest&ImageUrl=http://images.jaffapms.com/',
    );
  }
}

