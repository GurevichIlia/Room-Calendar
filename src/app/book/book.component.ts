// tslint:disable-next-line:max-line-length
import { Component, OnInit, ElementRef, HostListener, Output, ViewChild, Renderer2, AfterViewInit, ViewChildren, AfterContentInit, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CalendareRoom } from '../model/CalendareRoom.model';
import { MatDialog, MatDialogConfig, MatDatepickerInputEvent } from '@angular/material';

import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../services/order.service';
import { LoginService } from '../services/login.service';
import { GetRoomsService } from '../services/get-rooms.service';


import { ShopCardComponent } from './shop-card/shop-card.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { SearchAvailableRoomsComponent } from './new-order-room/search-available-rooms/search-available-rooms.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormControl } from '@angular/forms';
import { CustomerDetails } from '../model/customer-details.model';






@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [RoomDetailsComponent, ShopCardComponent]
})

export class BookComponent implements OnInit, AfterViewInit {
  @Output() selectedRooms: any[] = [];
  roomsGroup: any[] = [];
  roomsDate = [];
  groupsRooms = [];
  calendarRooms = [];
  start: any;
  end: any;
  weekStart: any[] = [];
  // bookedRooms: CalendareRoom[] = [];
  allRooms: any[] = [];
  roomById;
  sunday;
  monday;
  tuesday;
  wedns;
  tus;
  friday;
  sa;
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;
  pickedRoom: Object = {
    name: '',
    date: '',
  };
  OrderId;
  width;
  @Output() shoppingCart;
  @ViewChild('Sunday', { read: ElementRef }) sun: ElementRef;
  @ViewChild('Sun', { read: ElementRef }) day: ElementRef;
  @Output() dateChange: EventEmitter<MatDatepickerInputEvent<Date>>;
  constructor(
    private spinner: NgxSpinnerService,
    private roomService: GetRoomsService,
    private dialog: MatDialog,
    private orderService: OrderService,
    private loginService: LoginService,
    private renderer: Renderer2
  ) {

    this.start = moment().format('YYYY-MM-DD');
    this.end = moment(this.start).add('days', 120).format('YYYY-MM-DD');
    // window.addEventListener('resize', () => {
    //   this.check();
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
    // this.getGroup();
    // console.log(this.orderService.groupName);
    // this.spinner.show();
    // this.oneWeekDate();
    // this.roomsForCalendar();
    // this.getBookedRooms();
    // if (sessionStorage.getItem('LoggedInStatus') === 'true') {
    //   this.loginService.loggedInStatus = true;
    // }
    console.log('ngOnInit', this.day);
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit', this.day);
    this.getGroup();
    this.spinner.show();
    this.oneWeekDate();
    this.roomsForCalendar();
    this.getBookedRooms();
    if (sessionStorage.getItem('LoggedInStatus') === 'true') {
      this.loginService.loggedInStatus = true;
    }

  }
  check() {
    if (document.body.clientWidth < 450) {
      this.spinner.show();
      alert('please flip the screen vertically');
    }
    if (document.body.clientWidth > 450) {
      this.spinner.show();
      this.oneWeekDate();
      this.roomsForCalendar();
      this.getBookedRooms();
      if (localStorage.getItem('LoggedInStatus') === 'true') {
        this.loginService.loggedInStatus = true;
      }
    }
  }
  // Method for changing date
  changeDate(From) {
    const Vdate = moment(this.start);
    if (From === 'prev') {
      Vdate.add(-7, 'day');
    }
    if (From === 'next') {
      Vdate.add(7, 'day');
    }
    this.start = moment(Vdate).format('YYYY-MM-DD');
    // this.end = moment(this.start).add('days', 30).format('YYYY-MM-DD');
    this.oneWeekDate();
  }
  // Create array of date from start to end
  oneWeekDate() {
    const Vdate = moment(this.start);
    Vdate.add(-1, 'day');
    this.weekStart = [];
    for (let x = 0; x < 7; x++) {
      this.weekStart.push(Vdate.add(1, 'day').format('YYYY-MM-DD'));
    }
  }
  // Create array of booked rooms for one week
  getBookedRooms() {
    if (this.roomService.bookedRoomLoaded) {
      setTimeout(_ => this.showBookedRooms(), 500);
      this.spinner.hide();
    } else {
      this.roomService.getBookedRooms(this.start, this.end, '').subscribe((rooms: CalendareRoom[]) => {
        this.roomService.bookedRooms = rooms['Data'] as [];
        this.roomService.bookedRoomLoaded = true;
        this.spinner.hide();
        this.showBookedRooms();
        console.log(this.roomService.bookedRooms);
      }
      );
    }
  }
  // roomsGroups() {
  //   this.roomService.getGroupsRooms().subscribe(res => {
  //     this.groupsRooms = res['Data'] as [];
  //   });
  // }
  // Show all rooms

  roomsForCalendar() {
    this.roomService.getRoomsCalendar().subscribe(res => {
      this.allRooms = res['Data'] as [];
      console.log(this.allRooms);
    });
  }
  // Show booked rooms
  showBookedRooms() {
    this.oneWeekDate();
    for (const i of this.allRooms) {
      for (const x of i.children) {
        this.sunday = document.getElementById(x.id + '_1');
        this.renderer.setStyle(this.sunday, 'backgroundColor', 'cornsilk');
        this.renderer.setStyle(this.sunday, 'border', 'none');
        this.renderer.setProperty(this.sunday, 'innerHTML', 'Free');

        this.monday = document.getElementById(x.id + '_2');
        this.renderer.setStyle(this.monday, 'backgroundColor', 'cornsilk');
        this.renderer.setStyle(this.monday, 'border', 'none');
        this.renderer.setProperty(this.monday, 'innerHTML', 'Free');

        this.tuesday = document.getElementById(x.id + '_3');
        this.renderer.setStyle(this.tuesday, 'backgroundColor', 'cornsilk');
        this.renderer.setStyle(this.tuesday, 'border', 'none');
        this.renderer.setProperty(this.tuesday, 'innerHTML', 'Free');

        this.wedns = document.getElementById(x.id + '_4');
        this.renderer.setStyle(this.wedns, 'backgroundColor', 'cornsilk');
        this.renderer.setStyle(this.wedns, 'border', 'none');
        this.renderer.setProperty(this.wedns, 'innerHTML', 'Free');

        this.tus = document.getElementById(x.id + '_5');
        this.renderer.setStyle(this.tus, 'backgroundColor', 'cornsilk');
        this.renderer.setStyle(this.tus, 'border', 'none');
        this.renderer.setProperty(this.tus, 'innerHTML', 'Free');

        this.friday = document.getElementById(x.id + '_6');
        this.renderer.setStyle(this.friday, 'backgroundColor', 'cornsilk');
        this.renderer.setStyle(this.friday, 'border', 'none');
        this.renderer.setProperty(this.friday, 'innerHTML', 'Free');

        this.sa = document.getElementById(x.id + '_7');
        this.renderer.setStyle(this.sa, 'backgroundColor', 'cornsilk');
        this.renderer.setStyle(this.sa, 'border', 'none');
        this.renderer.setProperty(this.sa, 'innerHTML', 'Free');

        for (const y of this.roomService.bookedRooms) {
          // tslint:disable-next-line:triple-equals
          if (this.orderService.selectedRooms.length != 0) {
            for (const w of this.orderService.selectedRooms) {
              if (w.name === x.name) {
                if (w.date === this.weekStart[0]) {
                  this.sunday = document.getElementById(x.id + '_1');
                  this.renderer.setStyle(this.sunday, 'backgroundColor', 'yellow');
                  this.renderer.setStyle(this.sunday, 'border', 'none');
                  this.renderer.setProperty(this.sunday, 'innerHTML', 'Free');
                }
                if (w.date === this.weekStart[1]) {
                  this.monday = document.getElementById(x.id + '_2');
                  this.renderer.setStyle(this.monday, 'backgroundColor', 'yellow');
                  this.renderer.setStyle(this.monday, 'border', 'none');
                  this.renderer.setProperty(this.monday, 'innerHTML', 'Free');
                }
                if (w.date === this.weekStart[2]) {
                  this.tuesday = document.getElementById(x.id + '_3');
                  this.renderer.setStyle(this.tuesday, 'backgroundColor', 'yellow');
                  this.renderer.setStyle(this.tuesday, 'border', 'none');
                  this.renderer.setProperty(this.tuesday, 'innerHTML', 'Free');
                }
                if (w.date === this.weekStart[3]) {
                  this.wedns = document.getElementById(x.id + '_4');
                  this.renderer.setStyle(this.wedns, 'backgroundColor', 'yellow');
                  this.renderer.setStyle(this.wedns, 'border', 'none');
                  this.renderer.setProperty(this.wedns, 'innerHTML', 'Free');
                }
                if (w.date === this.weekStart[4]) {
                  this.tus = document.getElementById(x.id + '_5');
                  this.renderer.setStyle(this.tus, 'backgroundColor', 'yellow');
                  this.renderer.setStyle(this.tus, 'border', 'none');
                  this.renderer.setProperty(this.tus, 'innerHTML', 'Free');
                }
                if (w.date === this.weekStart[5]) {
                  this.friday = document.getElementById(x.id + '_6');
                  this.renderer.setStyle(this.friday, 'backgroundColor', 'yellow');
                  this.renderer.setStyle(this.friday, 'border', 'none');
                  this.renderer.setProperty(this.friday, 'innerHTML', 'Free');
                }
                if (w.date === this.weekStart[6]) {
                  this.sa = document.getElementById(x.id + '_7');
                  this.renderer.setStyle(this.sa, 'backgroundColor', 'yellow');
                  this.renderer.setStyle(this.sa, 'border', 'none');
                  this.renderer.setProperty(this.sa, 'innerHTML', 'Free');
                }
              }
            }
          }
          if (x.id === y.resource) {
            if (y.start === this.weekStart[0]) {
              this.sunday = document.getElementById(x.id + '_1');
              this.renderer.setStyle(this.sunday, 'backgroundColor', y.backColor);
              this.renderer.setStyle(this.sunday, 'border', `2px solid ${y.borderColor}`);
              this.renderer.setProperty(this.sunday, 'innerHTML', y.text);
            }
            if (y.start === this.weekStart[1]) {
              this.monday = document.getElementById(x.id + '_2');
              this.renderer.setStyle(this.monday, 'backgroundColor', y.backColor);
              this.renderer.setStyle(this.monday, 'border', `2px solid ${y.borderColor}`);
              this.renderer.setProperty(this.monday, 'innerHTML', y.text);
            }
            if (y.start === this.weekStart[2]) {
              this.tuesday = document.getElementById(x.id + '_3');
              this.renderer.setStyle(this.tuesday, 'backgroundColor', y.backColor);
              this.renderer.setStyle(this.tuesday, 'border', `2px solid ${y.borderColor}`);
              this.renderer.setProperty(this.tuesday, 'innerHTML', y.text);
            }
            if (y.start === this.weekStart[3]) {
              this.wedns = document.getElementById(x.id + '_4');
              this.renderer.setStyle(this.wedns, 'backgroundColor', y.backColor);
              this.renderer.setStyle(this.wedns, 'border', `2px solid ${y.borderColor}`);
              this.renderer.setProperty(this.wedns, 'innerHTML', y.text);
            }
            if (y.start === this.weekStart[4]) {
              this.tus = document.getElementById(x.id + '_5');
              this.renderer.setStyle(this.tus, 'backgroundColor', y.backColor);
              this.renderer.setStyle(this.tus, 'border', `2px solid ${y.borderColor}`);
              this.renderer.setProperty(this.tus, 'innerHTML', y.text);
            }
            if (y.start === this.weekStart[5]) {
              this.friday = document.getElementById(x.id + '_6');
              this.renderer.setStyle(this.friday, 'backgroundColor', y.backColor);
              this.renderer.setStyle(this.friday, 'border', `2px solid ${y.borderColor}`);
              this.renderer.setProperty(this.friday, 'innerHTML', y.text);
            }
            if (y.start === this.weekStart[6]) {
              this.sa = document.getElementById(x.id + '_7');
              this.renderer.setStyle(this.sa, 'backgroundColor', y.backColor);
              this.renderer.setStyle(this.sa, 'border', `2px solid ${y.borderColor}`);
              this.renderer.setProperty(this.sa, 'innerHTML', y.text);
            }
          }
        }
      }
    }
  }
  backToThisWeek() {
    this.start = moment(new Date()).format('YYYY-MM-DD');
    this.oneWeekDate();
    this.showBookedRooms();
  }
  orderDetails(id, date, date1) {
    this.orderService.GetRoomOrderDet(id, date, date1).subscribe(res => {
      res = res;
    });
  }
  pickRoom(name, startDate, endDate, id, roomId) {
    let someDate;
    someDate = document.getElementById(id);
    if (someDate.innerHTML === 'Free') {
      if (someDate.style.backgroundColor === 'yellow') {
        this.renderer.setStyle(someDate, 'backgroundColor', 'cornsilk');
      } else {
        this.renderer.setStyle(someDate, 'backgroundColor', 'yellow');
      }
      this.pickedRoom = {
        id: roomId,
        name: name,
        startDate: startDate,
        endDate: endDate
      };
      // debugger;
      let x = false;
      // tslint:disable-next-line:triple-equals
      if (this.orderService.selectedRooms.length == 0) {
        this.orderService.selectedRooms.push(this.pickedRoom);
      } else {
        for (let i = 0; i < this.orderService.selectedRooms.length; i++) {
          // tslint:disable-next-line:triple-equals
          if (this.orderService.selectedRooms[i].name == name) {
            this.orderService.selectedRooms[i].endDate = endDate;
            x = true;
            break;
          }

          if (this.orderService.selectedRooms[i].name === name &&
            this.orderService.selectedRooms[i].startDate === startDate &&
            this.orderService.selectedRooms[i].endDate === endDate) {
            this.orderService.selectedRooms.splice(i, 1);
            x = true;
            break;
          }
        } if (x === false) {
          this.orderService.selectedRooms.push(this.pickedRoom);
        }
      }
    }
    console.log(this.orderService.selectedRooms);
  }
  popUpSelectedRooms(id, orderId: ElementRef) {
    let roomId;
    roomId = document.getElementById(id);
    if (roomId.style.backgroundColor === 'rgb(224, 255, 255)') {
      this.spinner.show();
      this.orderService.GetCompleteCustDetByOrderId(orderId.nativeElement.textContent).subscribe(custDetByOrderId => {
        custDetByOrderId = custDetByOrderId;
        custDetByOrderId['orderId'] = orderId.nativeElement.textContent;
        this.dialog.open(CustomerDetailsComponent, { data: custDetByOrderId });
      });
      this.spinner.hide();
    }
  }
  popUpCustomerDetails(id, text) {
    let someId;
    someId = document.getElementById(id);
    if (this.orderService.completeCustDetByOrderIdloaded === true) {
      this.dialog.open(CustomerDetailsComponent);
    }
  }
  showRoomsForPickedDate(date) {
    this.start = date;
    this.showBookedRooms();
    console.log(date);
  }
  newOrder() {
    this.dialog.open(SearchAvailableRoomsComponent);
  }
  test(qwe) {
    this.spinner.show();

    console.log(this.groupsRooms, qwe);
    setTimeout(() => this.showBookedRooms(), 30);
    this.spinner.hide();

  }
  getGroup() {
    this.roomService.getGroupsRooms();

  }
}


