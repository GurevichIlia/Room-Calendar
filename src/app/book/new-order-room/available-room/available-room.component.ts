import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewOrderRoom } from 'src/app/model/NewOrderRoom.model';
import { GetRoomsService } from 'src/app/services/get-rooms.service';
import { OrderService } from 'src/app/services/order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchRoomInfo } from 'src/app/model/SearchRoomInfo.model';

@Component({
  selector: 'app-available-room',
  templateUrl: './available-room.component.html',
  styleUrls: ['./available-room.component.css']
})
export class AvailableRoomComponent implements OnInit {
  @Input() avlRooms: Object[];
  newOrder: NewOrderRoom;
  newOrders: {
    orderId: number;
    orderInfo: NewOrderRoom[]
  };
  orderId = 0;
  roomPrice: number;
  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
  }
  // tslint:disable-next-line:max-line-length
  addNewOrder(roomName: string, arrivalDate: string, evacuateDate: string, maxAdults: string, maxChildren: string, mealType: string, roomId: number, roomPrice: number, roomGroupId: number, roomNo: string, regularDays: number) {
    this.newOrder = {
      roomId: roomId,
      roomGroupId: roomGroupId,
      roomNo: roomNo,
      roomName: roomName,
      maxAdults: maxAdults,
      maxChildren: maxChildren,
      mealType: mealType,
      arrivalDate: arrivalDate,
      evacuateDate: evacuateDate,
      roomPrice: roomPrice,
      regularDays: regularDays
    };
    this.orderService.addRoomsForNewOrder(this.newOrder);
  }
}
