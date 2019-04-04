import { NewOrderRoom } from './NewOrderRoom.model';

export class CustomerDetails {
    orderId?: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    totalRooms?: number;
    email: string;
    homePhone: string;
    passport: string;
    zip: string;
    city: string;
    companyName: string;
    language?: string;
    roomDetail: NewOrderRoom[];


    // tslint:disable-next-line:max-line-length
    constructor(orderId, firstName, lastName, address, phone, totalRooms, email, homePhone, passport, zip, city, companyName, language, roomDetail) {
        this.orderId = orderId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.totalRooms = totalRooms;
        this.email = email;
        this.homePhone = homePhone;
        this.passport = passport;
        this.zip = zip;
        this.city = city;
        this.companyName = companyName;
        this.language = language;
        this.roomDetail = roomDetail;
    }
}
