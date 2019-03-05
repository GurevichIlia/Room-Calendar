import { Component, OnInit, Input } from '@angular/core';
import { NewOrderRoom } from 'src/app/model/NewOrderRoom.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-rooms-available',
  templateUrl: './list-rooms-available.component.html',
  styleUrls: ['./list-rooms-available.component.css']
})
export class ListRoomsAvailableComponent implements OnInit {
  newOrder: NewOrderRoom;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    // console.log('From List groupNAme', this.groupName[0]);
    // console.log('from list', this.roomsGroup);
  }
  // receiveOrderFromAvlRoom($event) {
  //   this.newOrder = $event;
  //   let x = false;
  //   // tslint:disable-next-line:triple-equals
  //   if (this.orderService.AvailableRoomsBtwDate.length == 0) {
  //     this.orderService.AvailableRoomsBtwDate.push(this.newOrder);
  //   } else {
  //     for (let i = 0; i < this.orderService.AvailableRoomsBtwDate.length; i++) {
  //       // tslint:disable-next-line:triple-equals
  //       if (this.orderService.AvailableRoomsBtwDate[i].roomId == this.newOrder.roomId) {
  //         this.orderService.AvailableRoomsBtwDate.splice(i, 1);
  //         x = true;
  //         break;
  //       }
  //     } if (x === false) {
  //       this.orderService.AvailableRoomsBtwDate.push(this.newOrder);
  //     }

  //   }
  //   // console.log('from list', this.roomsGroup);
  //   console.log('from list', this.orderService.AvailableRoomsBtwDate);
  // }
}

