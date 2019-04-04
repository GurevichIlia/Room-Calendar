import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject, } from 'rxjs';
import { CustomerDetails } from '../model/customer-details.model';
import { NewOrderRoom } from '../model/NewOrderRoom.model';
import { SearchRoomInfo } from '../model/SearchRoomInfo.model';
import { SearchOrder } from '../model/SearchOrder';
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
  avlRooms: any[] = [];
  roomDetail: NewOrderRoom;
  public howManyPeople = false;
  public groupName: any[] = [];
  public completeCustDetByOrderIdloaded = false;
  cusDetOnload = new BehaviorSubject(this.completeCustDetByOrderIdloaded);
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
      language: '',
      roomDetail: <any>[]
    };

  }
  GetRoomOrderDet(RoomId: string, ArrivalDate: string, EvacuateDate: string): Observable<any> {
    return this.http.get(
      this.rootURL + 'Order/GetRoomOrderDet?RoomId=' + RoomId + '&ArrivalDate=' + ArrivalDate + '&EvacuateDate=' + EvacuateDate,
    );
  }

  GetCompleteCustDetByOrderId(OrderId: string): Observable<any> {
    return this.http.get(
      this.rootURL + 'Order/GetCompleteCustDetByOrderId?ClientRoomOrderId=' + OrderId
    ).pipe(map(response => response['Data']));

  }
  GetPrice(ArrivalDate, EvacuateDate, maxadults, maxchildren, totalnights, RoomId, RoomType): Observable<any> {
    return this.http.get(
      // tslint:disable-next-line:max-line-length
      this.rootURL + 'Order/GetRoomPrice?ArrivalDate=' + ArrivalDate + '&EvacuateDate=' + EvacuateDate + '&maxadults=' + maxadults + '&maxchildren=' + maxchildren +
      '&totalnights=' + totalnights + '&RoomId=' + RoomId + '&RoomType=' + RoomType,
    );
  }
  addRoomsForNewOrder(newOrderRooms?: NewOrderRoom, roomId?: number) {
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
  removeRoomFromAdded(roomId: number) {
    for (let i = 0; i < this.addedRoomsForNewOrder.length; i++) {
      if (this.addedRoomsForNewOrder[i].roomId === roomId) {
        this.addedRoomsForNewOrder.splice(i, 1);
      }
    }
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
  public GetOrderSearchData(searchData: SearchOrder): Observable<any> {
    return this.http.post(
      (this.rootURL + 'Order/GetOrderSearchData'),
      searchData,

    );
  }
  updateCustomerInfo(customerInfo: any) {
    this.customerInfo = {
      orderId: customerInfo.orderId,
      firstName: customerInfo.FirstName,
      lastName: customerInfo.LastName,
      address: customerInfo.Address,
      phone: customerInfo.CellPhone,
      totalRooms: customerInfo.RoomDetail.length,
      email: customerInfo.EmailAddress,
      homePhone: customerInfo.HomePhone,
      passport: customerInfo.PassportNo,
      zip: customerInfo.Zip,
      city: customerInfo.City,
      companyName: customerInfo.CompanyName,
      language: customerInfo.language,
      roomDetail: customerInfo.RoomDetail,
    };
    return this.customerInfo;
  }
  // changePropertyNameRoomDetail(roomDetail: Object[]) {
  //   this.roomDetail = {
  //     roomId: roomDetail.RoomId,
  //     roomGroupId: roomDetail.roomGroupId,
  //     roomNo: roomDetail.RoomNo,
  //     roomName: roomDetail.RoomName,
  //     maxAdults: roomDetail.MaxAdults,
  //     maxChildren: roomDetail.MaxChildren,
  //     mealType: roomDetail.MealType,
  //     arrivalDate: roomDetail.ArriveDate,
  //     evacuateDate: roomDetail.EvacuateDate,
  //     Price: roomDetail.Price,
  //     regularDays: roomDetail.RegularDays
  //   }
  //   return roomDetail;
  // }
}









