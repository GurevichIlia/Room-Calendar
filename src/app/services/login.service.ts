import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInStatus = false;
  readonly rootURL = 'http://jaffapms.service.amax.co.il/API/Service/Login';
  constructor(private http: HttpClient) {

  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  // public isAuthenticated(): boolean {
  //   // get the token
  //   const token = this.getToken();
  //   // return a boolean reflecting
  //   // whether or not the token is expired
  //   return tokenNotExpired(token);
  // }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }
  get isLoggedIn() {
    return this.loggedInStatus;

  }

  validLogin(userName: string, password: string, orgName: string) {

    const userInfo = {
      OrgId: orgName,
      UserName: userName,
      Password: password,
      Language: 'en'

    };
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.rootURL, userInfo);

  }
}
