import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, } from 'rxjs';
import { CustomerDetails } from '../model/customer-details.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly rootURL = 'http://apitest.jaffapms.com/API/';
  customerInfo;
  public selectedRooms: any[] = [];

  public completeCustDetByOrderIdloaded = false;
  constructor(private http: HttpClient) {
    this.customerInfo = {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      totalRooms: '',
      email: '',
      homePhone: '',
      passport: '',
      zip: '',
      city: '',
      companyName: '',
      roomDetail: ''
    };
  }
  GetRoomOrderDet(RoomId, ArrivalDate, EvacuateDate): Observable<any> {
    return this.http.get(
      this.rootURL + 'Order/GetRoomOrderDet?RoomId=' + RoomId + '&ArrivalDate=' + ArrivalDate + '&EvacuateDate=' + EvacuateDate,
    );
  }
  GetCompleteCustDetByOrderId(OrderId) {
    return this.http.get(
      this.rootURL + 'Order/GetCompleteCustDetByOrderId?ClientRoomOrderId=' + OrderId
    ).toPromise().then(res => {
      this.customerInfo = {
        orderId: OrderId,
        firstName: res['Data'].FirstName,
        lastName: res['Data'].LastName,
        address: res['Data'].Address,
        phone: res['Data'].CellPhone,
        totalRooms: res['Data'].RoomDetail.length,
        email: res['Data'].EmailAddress,
        homePhone: res['Data'].HomePhone,
        passport: res['Data'].PassportNo,
        zip: res['Data'].Zip,
        city: res['Data'].City,
        companyName: res['Data'].CompanyName,
        roomDetail: res['Data'].RoomDetail,
      };
      this.completeCustDetByOrderIdloaded = true;
      console.log(res['Data']);
    });
  }
  // public GetPrice(ArrivalDate, EvacuateDate, maxadults, maxchildren, totalnights, RoomId, RoomType): Observable<any> {
  //   return this.http.get(
  // tslint:disable-next-line:max-line-length
  //     this.rootURL + 'Order/GetRoomPrice?ArrivalDate=' + ArrivalDate + '&EvacuateDate=' + EvacuateDate + '&maxadults=' + maxadults + '&maxchildren=' + maxchildren +
  //     '&totalnights=' + totalnights + '&RoomId=' + RoomId + '&RoomType=' + RoomType,

  //   );
  // }

}

