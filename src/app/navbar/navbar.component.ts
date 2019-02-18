import { Component, OnInit, Input } from '@angular/core';
import { GetRoomsService } from '../services/get-rooms.service';
import { MatDialog } from '@angular/material';
import { ShopCardComponent } from '../book/shop-card/shop-card.component';
import { LoginService } from '../services/login.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private loginService: LoginService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }
  popUpSelectedRooms() {
    this.dialog.open(ShopCardComponent);
  }
  logOut() {
    this.loginService.RemoveToken();
    this.loginService.loggedInStatus = false;
    console.log('Work');
  }
}

