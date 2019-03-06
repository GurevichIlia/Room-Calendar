import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './book/book.component';
import { LoginGuard } from './guards/login.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RoomDetailsComponent } from './book/room-details/room-details.component';
import { CustomerDetailsComponent } from './book/customer-details/customer-details.component';
import { OrderDetailsComponent } from './book/order-details/order-details.component';
import { NewOrderRoomComponent } from './book/new-order-room/new-order-room.component';
import { SearchAvailableRoomsComponent } from './book/new-order-room/search-available-rooms/search-available-rooms.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  {
    path: 'home', component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'book', component: BookComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'book/new-order', component: NewOrderRoomComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'search-available-rooms', component: SearchAvailableRoomsComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'room-details/:id', component: RoomDetailsComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'customer-details/:id', component: CustomerDetailsComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'book/order-details/:id', component: OrderDetailsComponent,
    canActivate: [LoginGuard]
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
