import { Component, OnInit, Input, ElementRef, ContentChild, HostListener } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { CustomerDetails } from 'src/app/model/customer-details.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customerInfo: CustomerDetails;
  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.completeCustDetByOrderId();
  }
  completeCustDetByOrderId() {
    this.customerInfo = this.orderService.customerInfo;
  }
  closePopUp() {
    this.dialog.closeAll();
  }
}
