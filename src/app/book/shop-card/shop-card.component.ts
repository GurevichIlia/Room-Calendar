import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-selected-rooms',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css']
})
export class ShopCardComponent implements OnInit {
  selectedRooms: any[];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }
  removeSelectedRoom(roomName, roomDate) {
    for (let i = 0; i < this.orderService.selectedRooms.length; i++) {
      // tslint:disable-next-line:triple-equals
      console.log(this.orderService.selectedRooms[i].name);
      console.log(this.orderService.selectedRooms[i].startDate);
      // tslint:disable-next-line:triple-equals
      if (this.orderService.selectedRooms[i].name == roomName && this.orderService.selectedRooms[i].startDate == roomDate) {
        this.orderService.selectedRooms.splice(i, 1);
      }
    }
  }
  closePopUp() {
    this.dialog.closeAll();
  }

}
