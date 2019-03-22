import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
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
  customerInfo;
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;
  Adults = 0;
  totalPrice: number;
  orderedRoom: NewOrderRoom;
  // orderId: FormControl;

  myForm: FormGroup;
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private fb: FormBuilder) {

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
    // this.myForm = this.fb.group({
    //   firstName: ['', Validators.required],
    //   lastName: new FormControl('', Validators.required),
    //   address: new FormControl('', Validators.required),
    //   phone: new FormControl('', Validators.required),
    //   email: new FormControl('', Validators.required)
    // });
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
    // tslint:disable-next-line:max-line-length
    this.myForm = this.fb.group({
      orderId: '',
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: '',
      phone: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      homePhone: '',
      passport: '',
      zip: '',
      city: '',
      companyName: '',
      roomDetail: '',
      language: '',
      totalRooms: this.orderService.addedRoomsForNewOrder.length,

    });
    console.log(this.myForm.value);
    this.spinner.show();
    if (this.orderId === 'new-order') {
      // tslint:disable-next-line:max-line-length
      if (this.orderService.customerInfo.totalRooms === null && this.orderService.avlRooms.length <= 0 || this.orderService.addedRoomsForNewOrder.length === 0 && this.orderService.avlRooms.length >= 0) {
        this.router.navigate(['/book']);
      } else {
        this.newOrderFromNewOrderList()
      }
      // tslint:disable-next-line:max-line-length


    } else {
      // if (this.orderService.customerInfo.totalRooms === null && this.orderService.avlRooms.length <= 0) {
      //   this.router.navigate(['/book']);
      this.orderService.GetCompleteCustDetByOrderId(this.orderId);
      setTimeout(() => this.editOrderDetailsFromCalendar(), 1000);

      console.log(this.customerInfo.roomDetail);
    }
    // completeCustDetByOrderId() {




    //   
    //   console.log();
    // this.firstName = new FormControl('', [
    //   Validators.required,
    // ]);
  }
  get firstName() {
    return this.myForm.get('firstName');
  }
  get lastName() {
    return this.myForm.get('lastName');
  }
  get email() {
    return this.myForm.get('email');
  }
  get phone() {
    return this.myForm.get('phone');
  }
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
      language: '',
      roomDetail: this.orderService.addedRoomsForNewOrder
    };
    this.getTotalPrice();
    console.log(this.customerInfo.roomDetail);
    this.spinner.hide();
  }
  getTotalPrice() {
    const roomDetail = this.customerInfo.roomDetail;
    this.totalPrice = 0;
    for (const price of roomDetail) {
      this.totalPrice += price.Price;
    }
    console.log(this.totalPrice);
  }
  editOrderDetailsFromCalendar() {
    this.customerInfo = this.orderService.customerInfo;
    this.getTotalPrice();
    this.spinner.hide();
  }
  submitNewOrder() {
    this.customerInfo = {
      orderId: null,
      firstName: this.myForm.value.firstName,
      lastName: this.myForm.value.lastName,
      address: '',
      phone: this.myForm.value.phone,
      totalRooms: this.orderService.addedRoomsForNewOrder.length,
      email: this.myForm.value.email,
      homePhone: '',
      passport: '',
      zip: '',
      city: '',
      companyName: '',
      roomDetail: this.orderService.addedRoomsForNewOrder,
      language: this.myForm.value.language
    };
    console.log(this.customerInfo);
    alert('Order Sent');
  }
  removeAddedRooms() {
    if (this.customerInfo.roomDetail.length === 0) {
      this.router.navigate(['/book']);
    } else if (confirm('Are you sure? All data will be deleted!')) {
      this.orderService.addedRoomsForNewOrder = [];
      this.orderService.howManyPeople = false;
      this.router.navigate(['/book']);
    }
  }
  removeAddedRoom(roomId: number) {
    if (confirm('Delete selected room?')) {
      this.orderService.removeRoomFromAdded(roomId);
      this.getTotalPrice();
    }
  }
}
