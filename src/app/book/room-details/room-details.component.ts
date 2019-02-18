import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetRoomsService } from '../../services/get-rooms.service';



@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private getRoomService: GetRoomsService,
  ) { }

  ngOnInit() {

  }
}


