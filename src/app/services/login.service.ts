import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loggedInStatus = false;
  readonly rootURL = 'http://jaffapms.service.amax.co.il/API/Service/Login';
  constructor(private http: HttpClient) {

  }

  // public getToken(): string {
  //   return sessionStorage.getItem('XToken');
  // }

  // public isAuthenticated(): boolean {
  //   // get the token
  //   const token = this.getToken();
  //   // return a boolean reflecting
  //   // whether or not the token is expired
  //   return tokenNotExpired(token);
  // }

  setLoggedIn(value: boolean) {
    if (sessionStorage.getItem('XToken') !== null) {
      return this.loggedInStatus = true;
    } else {
      return this.loggedInStatus = value;
    }

  }
  get isLoggedIn() {
    console.log(this.loggedInStatus);
    return sessionStorage.getItem('XToken') !== null;
  }

  validLogin(userName: string, password: string, orgName: string): Observable<any> {
    const userInfo = {
      OrgId: orgName,
      UserName: userName,
      Password: password,
      Language: 'en'
    };
    return this.http.post<{ token: string }>(this.rootURL, userInfo).pipe(tap(res => {
      sessionStorage.setItem('XToken', res['Data'].token);
      sessionStorage.setItem('LoggedInStatus', 'true');
    }));
  }
  RemoveToken() {
    sessionStorage.removeItem('XToken');
    sessionStorage.removeItem('LoggedInStatus');
  }
}
