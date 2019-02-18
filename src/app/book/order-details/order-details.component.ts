import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { CustomerDetails } from 'src/app/model/customer-details.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { audit } from 'rxjs/operators';



@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string;
  routeSubscription: Subscription;
  customerInfo;
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;
  Adults = 0;
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private orderService: OrderService) {
    this.routeSubscription = route.params.subscribe(params => this.orderId = params['id']);

    this.customerInfo = {
      orderId: '',
      firstName: '',
      lastName: '',
      adsress: '',
      phone: '',
      totalRooms: '',
      email: '',
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
    this.spinner.show();
    this.orderService.GetCompleteCustDetByOrderId(this.orderId);
    setTimeout(() => this.completeCustDetByOrderId(), 1000);

  }
  completeCustDetByOrderId() {
    if (this.orderId === 'new-order') {
      this.customerInfo = {
        orderId: '',
        firstName: '',
        lastName: '',
        adsress: '',
        phone: '',
        totalRooms: '',
        email: '',
        roomDetail: this.orderService.selectedRooms
      };
      this.spinner.hide();
    } else {
      this.customerInfo = this.orderService.customerInfo;
      this.spinner.hide();
    }

    console.log(this.customerInfo);
    console.log(this.orderId);
  }
  submit() {
    console.log(this.Adults);
  }
}
