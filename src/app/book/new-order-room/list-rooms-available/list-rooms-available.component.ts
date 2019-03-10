import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NewOrderRoom } from 'src/app/model/NewOrderRoom.model';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-rooms-available',
  templateUrl: './list-rooms-available.component.html',
  styleUrls: ['./list-rooms-available.component.css']
})
export class ListRoomsAvailableComponent implements OnInit {
  newOrder: NewOrderRoom;
  roomsGroup: any[] = [];
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;
  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }
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
    this.filterGroup();
  }
  removeAddedRooms() {
    this.orderService.addedRoomsForNewOrder = [];
    this.orderService.howManyPeople = false;
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
}

