import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { CustomerDetails } from 'src/app/model/customer-details.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewOrderRoom } from 'src/app/model/NewOrderRoom.model';




@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string;
  routeSubscription: Subscription;
  customerInfo: CustomerDetails;
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;
  Adults = 0;
  totalPrice: number;
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) {
    this.routeSubscription = route.params.subscribe(params => this.orderId = params['id']);

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
      roomDetail: []
    };


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
    if (this.orderService.customerInfo.totalRooms === null && this.orderService.avlRooms === undefined) {
      this.router.navigate(['/book']);
    }
    this.spinner.show();
    if (this.orderId === 'new-order') {
      this.newOrderFromNewOrderList();
    } else {
      this.orderService.GetCompleteCustDetByOrderId(this.orderId);
      setTimeout(() => this.editOrderDetailsFromCalendar(), 1000);
    }


  }
  // completeCustDetByOrderId() {

  //   this.customerInfo = this.orderService.customerInfo;
  //   this.spinner.hide();


  //   console.log(this.customerInfo.roomDetail);
  //   console.log();
  // }
  newOrderFromNewOrderList() {
    this.customerInfo = {
      orderId: '',
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      totalRooms: this.orderService.addedRoomsForNewOrder.length,
      email: '',
      homePhone: '',
      passport: '',
      zip: '',
      city: '',
      companyName: '',
      roomDetail: this.orderService.addedRoomsForNewOrder
    };
    this.getTotalPrice(this.customerInfo.roomDetail);
    console.log(this.customerInfo.roomDetail);
    this.spinner.hide();
  }
  getTotalPrice(roomDetail: NewOrderRoom[]) {
    this.totalPrice = 0;
    for (const price of roomDetail) {
      this.totalPrice += price.Price;
    }
    console.log(this.totalPrice);
  }
  editOrderDetailsFromCalendar() {
    this.customerInfo = this.orderService.customerInfo;
    this.getTotalPrice(this.customerInfo.roomDetail);
    this.spinner.hide();
  }
  submitNewOrder() {
    console.log(this.customerInfo);
    alert('Order Sent');
  }
}
