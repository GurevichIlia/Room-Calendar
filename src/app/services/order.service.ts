import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, } from 'rxjs';
import { CustomerDetails } from '../model/customer-details.model';
import { NewOrderRoom } from '../model/NewOrderRoom.model';
import { SearchRoomInfo } from '../model/SearchRoomInfo.model';
// import { SearchRoomInfo } from '../model/SearchRoomInfo.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly rootURL = 'http://apitest.jaffapms.com/API/';
  customerInfo: CustomerDetails;
  selectedRooms: any[] = []; // Selected rooms for order from main Calendar;
  newOrderAvailbleRoomsBtwDate: Object[] = []; // New Orders for order from New Order List;
  AvailableRoomsBtwDate: NewOrderRoom[] = [];
  everythingRoomsBtwDate: any[];
  searchInfoForNewOrderRoom: SearchRoomInfo;
  onlyAvailableRoomsBtwDate: any[];
  addedRoomsForNewOrder: NewOrderRoom[] = [];
  avlRooms: any[];
  public howManyPeople = false;
  public groupName: any[] = [];
  public completeCustDetByOrderIdloaded = false;
  constructor(private http: HttpClient) {
    this.customerInfo = {
      orderId: '',
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      totalRooms: null,
      email: '',
      homePhone: '',
      passport: '',
      zip: '',
      city: '',
      companyName: '',
      roomDetail: <any>[]
    };
  }
  GetRoomOrderDet(RoomId: string, ArrivalDate: string, EvacuateDate: string): Observable<any> {
    return this.http.get(
      this.rootURL + 'Order/GetRoomOrderDet?RoomId=' + RoomId + '&ArrivalDate=' + ArrivalDate + '&EvacuateDate=' + EvacuateDate,
    );
  }
  GetCompleteCustDetByOrderId(OrderId: string) {
    return this.http.get(
      this.rootURL + 'Order/GetCompleteCustDetByOrderId?ClientRoomOrderId=' + OrderId
    ).subscribe(res => {
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
  addRoomsForNewOrder(newOrderRooms: NewOrderRoom) {
    let x = false;
    // tslint:disable-next-line:triple-equals
    if (this.addedRoomsForNewOrder.length == 0) {
      this.addedRoomsForNewOrder.push(newOrderRooms);
    } else {
      for (let i = 0; i < this.addedRoomsForNewOrder.length; i++) {
        // tslint:disable-next-line:triple-equals
        if (this.addedRoomsForNewOrder[i].roomId == newOrderRooms.roomId) {
          this.addedRoomsForNewOrder.splice(i, 1);
          x = true;
          break;
        }
      } if (x === false) {
        this.addedRoomsForNewOrder.push(newOrderRooms);
      }

    }
    // console.log('from list', this.roomsGroup);
    console.log('from service', this.addedRoomsForNewOrder);
  }
  filterAvailableRoomsByGroup(groupName: string[]) {
    this.avlRooms = [];
    for (const rooms of this.onlyAvailableRoomsBtwDate) {
      for (const room of rooms) {
        if (groupName.length === 0) {
          this.avlRooms.push(room);
        } else {
          for (const group of groupName) {
            if (room.RoomGroupName === group) {
              this.avlRooms.push(room);
            }
          }
        }
      }

    }
    console.log('Order service', this.avlRooms);
  }
}



