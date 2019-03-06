import { Component, OnInit, Input } from '@angular/core';
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
  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {
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
}

