import { Component, OnInit, HostListener } from '@angular/core';
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
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 20;
  constructor(
    private router: Router,
    private roomService: GetRoomsService,
    private orderService: OrderService
  ) {
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
      this.showScroll = true;
    } else if (this.showScroll && (window.pageYOffset ||
      document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) {
      this.showScroll = false;
    }
  }
  ngOnInit() {
    if (this.orderService.onlyAvailableRoomsBtwDate === undefined) {
      this.router.navigate(['/book']);
    } else {
      // this.filterGroup();
    }
  }
  createArrNewOrders() {
    // tslint:disable-next-line:triple-equals
    if (this.orderService.addedRoomsForNewOrder.length > 0) {
      this.router.navigate(['/book/order-details/new-order']);
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
  removeAddedRooms() {
    if (confirm('Are you sure? All data will be deleted!')) {
      this.orderService.addedRoomsForNewOrder = [];
      this.orderService.howManyPeople = false;
      this.router.navigate(['/book']);
    }
  }
}
