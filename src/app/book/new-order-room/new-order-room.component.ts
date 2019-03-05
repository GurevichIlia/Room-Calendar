import { Component, OnInit } from '@angular/core';
import { GetRoomsService } from 'src/app/services/get-rooms.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { NewOrderRoom } from 'src/app/model/NewOrderRoom.model';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-order-room',
  templateUrl: './new-order-room.component.html',
  styleUrls: ['./new-order-room.component.css'],

})
export class NewOrderRoomComponent implements OnInit {
  toppings = new FormControl();
  arrivalDate;
  evacuateDate;
  maxAdults;
  maxChildren;
  maxBaby;
  lang;
  mealType;
  OrganizationID;
  availableRoomsBtwDate: any[] = [];
  roomsGroup: any[] = [];
  availbleRooms: any[] = [];
  minDate;
  rooms: any[] = [];
  // groupName: any[] = ['All Rooms'];
  newOrder: NewOrderRoom;
  newOrders: {
    orderId: number;
    orderInfo: NewOrderRoom[]
  };
  orderId = 0;

  constructor(
    private router: Router,
    private roomService: GetRoomsService,
    private orderService: OrderService
  ) {

    // this.arrivalDate = moment().format('YYYY-MM-DD');
    // this.evacuateDate = moment(this.arrivalDate).add(1, 'day').format('YYYY-MM-DD');
    // this.minDate = moment(this.arrivalDate).add(1, 'day').format('YYYY-MM-DD');
  }

  ngOnInit() {
    if (this.orderService.onlyAvailableRoomsBtwDate === undefined) {
      this.router.navigate(['/book']);
    } else {
      this.filterGroup();
    }
  }

  showAvailableRooms() {
    return this.orderService.onlyAvailableRoomsBtwDate;
  }

  // this.availableRoomsBtwDate = this.roomService.availableRoomsBtwDate.filter(RoomData => RoomData['availble'] === 1);
  // console.log(this.availableRoomsBtwDate);

  // receiveOrderFromAvlRoom($event) {
  //   this.newOrder = $event;
  // }
  createArrNewOrders() {
    // tslint:disable-next-line:triple-equals
    if (this.orderService.addedRoomsForNewOrder.length > 0) {
      this.router.navigate(['/order-details/new-order']);
      // this.orderId++;
      // this.newOrders = {
      //   orderId: this.orderId,
      //   orderInfo: this.orderService.addedRoomsForNewOrder
      // };
      // this.orderService.newOrderAvailbleRoomsBtwDate.push(this.newOrders);
      // console.log(this.orderService.newOrderAvailbleRoomsBtwDate);
      // this.orderService.AvailbleRoomsBtwDate = [];

    } else {
      alert('Please select rooms');
    }
  }
  filterGroup() {
    this.orderService.filterAvailableRoomsByGroup(this.roomsGroup);
  }
}
