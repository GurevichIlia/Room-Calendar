import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() orderList: [];
  @Input() totalRow;
  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  getOrderDetByOrderId(ClientRoomOrderId) {
    this.orderService.GetCompleteCustDetByOrderId(ClientRoomOrderId);
    this.router.navigate([`/book/order-details/${ClientRoomOrderId}`]);
  }
}
