import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule, MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CookieService } from 'ngx-cookie-service';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

import { LoginService } from './services/login.service';
import { LoginGuard } from './guards/login.guard';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RoomDetailsComponent } from './book/room-details/room-details.component';
import { ShopCardComponent } from './book/shop-card/shop-card.component';
import { CustomerDetailsComponent } from './book/customer-details/customer-details.component';
import { OrderDetailsComponent } from './book/order-details/order-details.component';
import { RoomComponent } from './book/room/room.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BookComponent,
    LoginComponent,
    HomeComponent,
    RoomDetailsComponent,
    ShopCardComponent,
    CustomerDetailsComponent,
    OrderDetailsComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    NgxSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } },
    LoginService,
    LoginGuard,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [RoomDetailsComponent, ShopCardComponent, CustomerDetailsComponent]
})
export class AppModule { }
