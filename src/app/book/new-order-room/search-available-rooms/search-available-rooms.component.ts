import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { GetRoomsService } from 'src/app/services/get-rooms.service';
import { MatDialogRef, MatDialog, MatDatepicker } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { OrderService } from 'src/app/services/order.service';
// tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment } from 'moment';


const moment = _moment;

/** @title Datepicker that uses Moment.js dates */
@Component({
  selector: 'app-search-available-rooms',
  templateUrl: './search-available-rooms.component.html',
  styleUrls: ['./search-available-rooms.component.css'],
  // providers: [
  //   // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
  //   // `MatMomentDateModule` in your applications root module. We provide it at the component level
  //   // here, due to limitations of our example generation script.
  //   { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  //   { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  // ],
})
export class SearchAvailableRoomsComponent implements OnInit {
  minStartDate;
  minEndDate;
  dateCtrl: FormControl;
  availableRoomsBtwDate;
  arrivalDate;
  evacuateDate;
  evaDate;
  maxAdults = 2;
  maxChildren = 0;
  mealType = 2;
  maxBaby;
  Lang;
  OrganizationID;
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;
  form: FormGroup;
  date = new FormControl(moment([2017, 0, 1]));
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;

  constructor(
    private spinner: NgxSpinnerService,
    private roomService: GetRoomsService,
    private orderService: OrderService,
    private MatdialogRef: MatDialogRef<SearchAvailableRoomsComponent>,
    private router: Router
  ) {
    this.arrivalDate = moment().format('YYYY-MM-DD');
    this.evacuateDate = moment(this.arrivalDate).add(1, 'day').format('YYYY-MM-DD');
    this.evaDate = moment(this.arrivalDate).add(1, 'day').format('YYYY-MM-DD');
    this.minEndDate = moment(this.arrivalDate).add(1, 'day');
    this.minStartDate = moment(this.arrivalDate);

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
    this.dateCtrl = new FormControl('', [Validators.required]);
  }
  showAvailableRooms() {
    if (this.maxAdults === 0) {
      alert('Please set How many people');
    } else {
      this.spinner.show();
      this.arrivalDate = moment(this.arrivalDate).format('YYYY-MM-DD');
      this.evacuateDate = moment(this.evacuateDate).format('YYYY-MM-DD');
      // tslint:disable-next-line:max-line-length
      this.orderService.onlyAvailableRoomsBtwDate = [];
      this.orderService.groupName = [];
      // tslint:disable-next-line:max-line-length
      this.roomService.GetAvailableRooms(this.arrivalDate, this.evacuateDate, this.maxAdults, this.maxChildren, this.maxBaby, this.Lang, this.mealType, this.OrganizationID)
        .subscribe(room => {
          this.orderService.everythingRoomsBtwDate = room['Data'];
          this.MatdialogRef.close();
          this.router.navigate(['book/new-order']);
          this.spinner.hide();

          for (const x of this.orderService.everythingRoomsBtwDate) {
            this.orderService.groupName.push(x.GroupName);
            this.orderService.onlyAvailableRoomsBtwDate.push(x.RoomData.filter(RoomData => RoomData['availble'] === 1));
          }
          // tslint:disable-next-line:max-line-length
          this.orderService.onlyAvailableRoomsBtwDate = this.orderService.onlyAvailableRoomsBtwDate.filter(RoomData => RoomData.length !== 0);
          console.log('from order service', this.orderService.onlyAvailableRoomsBtwDate);
          console.log('from order service', this.orderService.groupName);
        });

      this.orderService.searchInfoForNewOrderRoom = {
        arrivalDate: this.arrivalDate,
        evacuateDate: this.evacuateDate,
        maxAdults: this.maxAdults,
        maxChildren: this.maxChildren,
        maxBaby: this.maxBaby,
        lang: this.Lang,
        mealType: this.mealType,
        organizationID: this.OrganizationID
      };
    }
  }
}
