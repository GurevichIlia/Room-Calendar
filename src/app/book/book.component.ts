import { Component, OnInit, ɵConsole, ElementRef, } from '@angular/core';
import { GetRoomsService } from '../Services/get-rooms.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { CalendareRoom } from '../model/CalendareRoom.model';





@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  rooms: CalendareRoom = {
    id: null,
    start: '',
    end: '',
    resource: '',
    text: '',
    backColor: '',
    barColor: '',
    borderColor: '',
    toolTip: '',
    children: null,
    expanded: true,
  };

  roomsDate = [];
  groupsRooms = [];
  calendarRooms = [];
  start: any;
  end;
  weekStart: any[] = [];
  bookedRooms: CalendareRoom[] = [];
  allRooms: any[] = [];
  sunday;
  monday;
  tuesday;
  wedns;
  tus;
  friday;
  sa;
  constructor(
    private roomService: GetRoomsService,

  ) {
    this.start = moment(new Date()).format('YYYY-MM-DD');
    this.end = moment(this.start).add('days', 30);
    this.end = moment(this.end).format('YYYY-MM-DD');
  }

  ngOnInit() {
    this.oneWeekDate();
    this.roomsForCalendar();
    this.getBookedRooms();
  }
  // Method for changing date
  ChangeDate(From) {
    const Vdate = this.start.split('-');
    // tslint:disable-next-line:radix
    const NewVDate = new Date(parseInt(Vdate[0]), parseInt(Vdate[1]), parseInt(Vdate[2]));

    if (From === 'prev') {
      NewVDate.setDate(NewVDate.getDate() - 7);
    }
    if (From === 'next') {
      NewVDate.setDate(NewVDate.getDate() + 7);
    }
    NewVDate.setMonth(NewVDate.getMonth() - 1);
    this.end = moment(NewVDate).format(' YYYY-MM-DD');
    this.start = moment(NewVDate).format(' YYYY-MM-DD');
    if (this.end === this.start) {
      this.end = moment(this.end).add('days', 6);
      this.end = moment(this.end).format('YYYY-MM-DD');
    }
    this.oneWeekDate();
  }
  // getAllRooms() {
  //   this.roomService.getRooms().subscribe(res => {
  //     this.roomsDate = res['Data'] as [];
  //     this.checkWeeklyRooms();
  //     console.log(this.roomsDate);
  //   });
  // }

  // Create array of booked rooms for one week
  getBookedRooms() {
    this.roomService.GetBookedRooms(this.start, this.end, '').subscribe((rooms: CalendareRoom[]) => {
      this.bookedRooms = rooms['Data'] as [];
      // this.oneWeekDate();
      this.checkMethod();
      console.log(this.bookedRooms);
    }
    );
  }
  roomsGroups() {
    this.roomService.getGroupsRooms().subscribe(res => {
      this.groupsRooms = res['Data'] as [];
      // console.log(this.groupsRooms);
    });
  }
  roomsForCalendar() {
    this.roomService.getRoomsCalendar().subscribe(res => {
      this.allRooms = res as [];
      // console.log(this.allRooms);
    });
  }
  // Create array of date from start to end
  oneWeekDate() {
    const Vdate = this.start.split('-');
    // tslint:disable-next-line:radix
    const NewVDate = new Date(parseInt(Vdate[0]), parseInt(Vdate[1]), parseInt(Vdate[2]));
    NewVDate.setMonth(NewVDate.getMonth() - 1);
    this.weekStart = [];
    for (let x = 0; x < 8; x++) {
      if (x === 0) {
        NewVDate.setDate(NewVDate.getDate() - 1);
      } else {
        NewVDate.setDate(NewVDate.getDate() + 1);
        this.weekStart.push(moment(NewVDate).format('YYYY-MM-DD'));
      }
    }
    // console.log(this.weekStart);
    return this.weekStart;
  }

  checkMethod() {
    for (const i of this.allRooms) {
      for (const x of i.children) {
        this.sunday = document.getElementById(x.id + '_1');
        this.sunday.style.backgroundColor = 'cornsilk';
        this.sunday.style.border = 'none';
        this.sunday.innerHTML = 'Free';

        this.monday = document.getElementById(x.id + '_2');
        this.monday.style.backgroundColor = 'cornsilk';
        this.monday.style.border = `none`;
        this.monday.innerHTML = 'Free';

        this.tuesday = document.getElementById(x.id + '_3');
        this.tuesday.style.backgroundColor = 'cornsilk';
        this.tuesday.style.border = `none`;
        this.tuesday.innerHTML = 'Free';

        this.wedns = document.getElementById(x.id + '_4');
        this.wedns.style.backgroundColor = 'cornsilk';
        this.wedns.style.border = `none`;
        this.wedns.innerHTML = 'Free';

        this.tus = document.getElementById(x.id + '_5');
        this.tus.style.backgroundColor = 'cornsilk';
        this.tus.style.border = `none`;
        this.tus.innerHTML = 'Free';

        this.friday = document.getElementById(x.id + '_6');
        this.friday.style.backgroundColor = 'cornsilk';
        this.friday.style.border = `none`;
        this.friday.innerHTML = 'Free';

        this.sa = document.getElementById(x.id + '_7');
        this.sa.style.backgroundColor = 'cornsilk';
        this.sa.style.border = `none`;
        this.sa.innerHTML = 'Free';
        for (const y of this.bookedRooms) {
          if (x.id === y.resource) {
            if (y.start === this.weekStart[0]) {
              this.sunday = document.getElementById(x.id + '_1');
              this.sunday.style.backgroundColor = y.backColor;
              this.sunday.style.border = `2px solid ${y.borderColor}`;
              this.sunday.innerHTML = y.text;
            }
            if (y.start === this.weekStart[1]) {
              this.monday = document.getElementById(x.id + '_2');
              this.monday.style.backgroundColor = y.backColor;
              this.monday.style.border = `2px solid ${y.borderColor}`;
              this.monday.innerHTML = y.text;
            }
            if (y.start === this.weekStart[2]) {
              this.tuesday = document.getElementById(x.id + '_3');
              this.tuesday.style.backgroundColor = y.backColor;
              this.tuesday.style.border = `2px solid ${y.borderColor}`;
              this.tuesday.innerHTML = y.text;
            }
            if (y.start === this.weekStart[3]) {
              this.wedns = document.getElementById(x.id + '_4');
              this.wedns.style.backgroundColor = y.backColor;
              this.wedns.style.border = `2px solid ${y.borderColor}`;
              this.wedns.innerHTML = y.text;
            }
            if (y.start === this.weekStart[4]) {
              this.tus = document.getElementById(x.id + '_5');
              this.tus.style.backgroundColor = y.backColor;
              this.tus.style.border = `2px solid ${y.borderColor}`;
              this.tus.innerHTML = y.text;
            }
            if (y.start === this.weekStart[5]) {
              this.friday = document.getElementById(x.id + '_6');
              this.friday.style.backgroundColor = y.backColor;
              this.friday.style.border = `2px solid ${y.borderColor}`;
              this.friday.innerHTML = y.text;
            }
            if (y.start === this.weekStart[6]) {
              this.sa = document.getElementById(x.id + '_7');
              this.sa.style.backgroundColor = y.backColor;
              this.sa.style.border = `2px solid ${y.borderColor}`;
              this.sa.innerHTML = y.text;
            }
          }
        }

      }
    }
  }
  // backToday() {
  //   this.start = moment(new Date()).format('YYYY-MM-DD');
  //   return this.oneWeekDate();
  // }
}




