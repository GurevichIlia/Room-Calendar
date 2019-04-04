import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';


// Material components
import { MatButtonModule, MatDialogModule, MAT_LABEL_GLOBAL_OPTIONS, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule, MatToolbarModule, MatSidenavModule } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';



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
import { NewOrderRoomComponent } from './book/new-order-room/new-order-room.component';
import { SearchAvailableRoomsComponent } from './book/new-order-room/search-available-rooms/search-available-rooms.component';
import { ListRoomsAvailableComponent } from './book/new-order-room/list-rooms-available/list-rooms-available.component';
import { AvailableRoomComponent } from './book/new-order-room/available-room/available-room.component';

import { GroupFilter } from './MyPipe/groupFilter.pipe';
import { OrderSearchComponent } from './order-search/order-search.component';
import { OrderListComponent } from './order-search/order-list/order-list.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CalendarGroupFilterPipe } from './MyPipe/calendar-group-filter.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { NewOrderRoom } from './model/newOrderRoom';

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
    RoomComponent,
    NewOrderRoomComponent,
    ListRoomsAvailableComponent,
    AvailableRoomComponent,
    SearchAvailableRoomsComponent,
    GroupFilter,
    OrderSearchComponent,
    OrderListComponent,
    MainNavComponent,
    CalendarGroupFilterPipe,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatMomentDateModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    ScrollingModule,
    MatCheckboxModule,
    ScrollDispatchModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    NgxChartsModule,
    NgxDaterangepickerMd.forRoot(),

  ],
  exports: [
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },

    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: '' } },
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
