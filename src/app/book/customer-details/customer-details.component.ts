import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { CustomerDetails } from 'src/app/model/customer-details.model';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})

export class CustomerDetailsComponent implements OnInit {
  customerInfo: CustomerDetails;
  constructor(
    @Inject(MAT_DIALOG_DATA) completeCustDetByOrderId: {},
    private orderService: OrderService,
    private dialog: MatDialog,
  ) {
    this.customerInfo = this.orderService.updateCustomerInfo(completeCustDetByOrderId);
  }
  ngOnInit() {

  }
  closePopUp() {
    this.dialog.closeAll();
  }
}
