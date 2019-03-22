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
  @Input() avlRooms: any[];
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
  howManyPeople = false;
  ngOnInit() {
  }
  // tslint:disable-next-line:max-line-length
  addNewOrder(roomName: string, arrivalDate: string, evacuateDate: string, maxAdults: string, maxChildren: string, mealType: string, roomId: number, roomGroupId: number, roomNo: string, regularDays: number, maxinRoom: number) {
    this.checkHowManyPeople(maxAdults, maxChildren, maxinRoom);
    if (this.orderService.howManyPeople) {
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
        Price: null,
        regularDays: regularDays
      };
      if (mealType === '1') {
        this.newOrder.Price = this.avlRooms['PriceRo'];
      } if (mealType === '2') {
        this.newOrder.Price = this.avlRooms['PriceBB'];
      } if (mealType === '3') {
        this.newOrder.Price = this.avlRooms['PriceHB'];
      }
      this.orderService.addRoomsForNewOrder(this.newOrder);

    }

  }
  checkHowManyPeople(adults: string, children: string, maxinRoom: number) {
    const adult = Number(adults);
    const child = Number(children);
    if ((adult + child) > maxinRoom) {
      alert(`Maximum number of people for room: ${maxinRoom} persons`);
      return this.orderService.howManyPeople = false;
    } if ((adult + child) === 0) {
      alert(`Minimum number of people for room: 1 person`);
    } else {
      return this.orderService.howManyPeople = true;
    }
  }
  removeAddedRoom(roomId: number) {
    this.howManyPeople = true;
    this.orderService.removeRoomFromAdded(roomId);

  }
}
