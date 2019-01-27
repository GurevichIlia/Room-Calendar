import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { NgForm } from '@angular/forms';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Navigation } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any;

  userName: string;
  password: string;
  orgName: string;
  public LoginData: any;
  IsLogedIn = false;

  constructor(
    private service: LoginService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {

    if (this.userName !== undefined && this.userName != null && this.userName !== ''
      && this.password !== undefined && this.password != null && this.password !== ''
      && this.orgName !== undefined && this.orgName != null && this.orgName !== '') {
      this.service
        .validLogin(this.userName, this.password, this.orgName)
        .subscribe(res => {
          res = res;

          if (res['error'] !== undefined && res['error'] !== null && res['error'] !== '') {

            alert();
          }
          if (res['token'] !== '') {
            console.log(res['token'], res['error']);
            this.service.setLoggedIn(true);
            this.IsLogedIn = true;
            this.LoginData = res;
            localStorage.setItem('XToken', res['Data']['token']);
            this.router.navigate(['/book']);

            // var x = sessionStorage.getItem("XToken");
            // const httpOptions = {
            //   headers: new HttpHeaders({
            //     'Content-Type': 'application/json; charset=utf-8',
            //     'X-Token': sessionStorage.getItem('XToken')
            //   })
            // };
          }


        }
        );
    }
  }
}
            //     this.http
            //       .get(
            //         // this.rootURL + "Service/GetRoomsForClaendarView?RoomGroupId=",
            //         'http://jaffapms.service.amax.co.il/API/' +
            //         'Service/GetBookedRooms?StartDate=14-01-2019&EndDate=28-01-2019&RoomGroupId=',
            //         httpOptions
            //       )
            //       .subscribe(response => {
            //         debugger;
            //         response = response;

            //         console.log(response);
            //       });

          // if (res['error'] !== undefined && res['error'] !== null && res['error'] !== '') {
          //   if (res['error'] !== '') {
          //     alert(res['error']);
          //   }
          // } else {
          //   this.IsLogedIn = true;
          //   this.LoginData = res;
          //   sessionStorage.setItem('XToken', res['token']);
          //   sessionStorage.setItem('sessionInformation', atob(res['token'].split('.')[0]));
          //   sessionStorage.setItem('userInformation', atob(res['token'].split('.')[1]));

          //   this.LoginData = JSON.parse(atob(res['token'].split('.')[1]));

          //   localStorage.setItem('employeeid', this.LoginData.employeeid);
          //   localStorage.setItem(this.LoginData.employeeid + '_OrgId', this.LoginData.OrgId);











