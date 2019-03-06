import { NewOrderRoom } from './NewOrderRoom.model';

export class CustomerDetails {
    orderId?: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    totalRooms: number;
    email: string;
    homePhone: string;
    passport: string;
    zip: string;
    city: string;
    companyName: string;
    roomDetail: NewOrderRoom[];

}
