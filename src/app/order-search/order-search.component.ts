import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { SearchOrder } from '../model/SearchOrder';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {
  myForm: FormGroup;
  orderList: [];
  totalRow: number;
  isMax = true;
  searchInfo: SearchOrder;
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      orderNo: '',
      firstName: '',
      lastName: '',
      fileAs: '',
      customerNo: '',
    });
    this.getSearchOrder();
  }
  getSearchOrder() {
    this.searchInfo = {
      fileAs: this.myForm.value.fileAs,
      firstName: this.myForm.value.firstName,
      lastName: this.myForm.value.LastName,
      isMax: this.isMax,
      orderNo: this.myForm.value.orderNo,
    };
    this.orderService.GetOrderSearchData(this.searchInfo).subscribe(data => {
      this.orderList = data.Data;
      this.totalRow = this.orderList.length;
    });
  }

}
