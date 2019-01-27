import { Component, OnInit, ɵConsole } from '@angular/core';
import { GetRoomsService } from '../Services/get-rooms.service';
import { Data } from '../Model/data.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { CalendareRoom } from '../model/CalendareRoom.model';
import { Response } from 'selenium-webdriver/http';



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

  };

  roomsDate = [];
  groupsRooms = [];
  calendarRooms = [];
  timeCurrent;
  start: any;
  weekStart: any[] = [];
  end;
  weekRooms: CalendareRoom[] = [];
  dayRoom = [];
  bookedRooms: CalendareRoom[] = [];
  childrenRooms: any[] = [];
  backColor;
  barColor;
  borderColor;
  resource: any[] = [];
  roomId: any[] = [];
  constructor(
    private roomService: GetRoomsService,
    private http: HttpClient
  ) {
    this.rooms = {
      id: null,
      start: '',
      end: '',
      resource: '',
      text: '',
      backColor: '',
      barColor: '',
      borderColor: '',
      toolTip: '',

    };
    this.start = moment(new Date()).format('YYYY-MM-DD');
    this.end = moment(this.start).add('days', 6);
    this.end = moment(this.end).format('YYYY-MM-DD');




  }

  ngOnInit() {
    this.getBookedRooms();
    this.roomsGroups();
    this.roomsForCalendar();
  }
  // Method for changing date
  ChangeDate(From) {
    debugger;
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
    this.roomService.GetBookedRooms(this.start, this.end, '').subscribe((rooms: any[]) => {
      this.bookedRooms = rooms as [];
      this.checkMethod();
      this.oneWeekDate();
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
      this.childrenRooms = res as [];
      console.log(this.childrenRooms);
    });
  }
  // Create array of date from start to end
  oneWeekDate() {
    let x;
    const Vdate = this.start.split('-');
    // tslint:disable-next-line:radix
    const NewVDate = new Date(parseInt(Vdate[0]), parseInt(Vdate[1]), parseInt(Vdate[2]));
    NewVDate.setMonth(NewVDate.getMonth() - 1);
    this.weekStart = [];
    for (x = 0; x < 8; x++) {
      if (x === 0) {
        NewVDate.setDate(NewVDate.getDate() - 1);
      } else {
        NewVDate.setDate(NewVDate.getDate() + 1);
        this.weekStart.push(moment(NewVDate).format('dddd,YYYY-MMMM-DD'));
      }
    }
    console.log(this.weekStart);
    return this.weekStart;
  }

  checkMethod() {
    for (const i of this.childrenRooms) {
      for (const x of i.children) {
        for (const y of this.bookedRooms) {
          if (x.id === y.resource) {
            x['backColor'] = y.backColor;
            x['borderColor'] = '4px solid' + ' ' + y.borderColor;
          }

        }
      }
    }

    this.childrenRooms['backColor'] = 'red';
    console.log(this.childrenRooms);
  }

}
