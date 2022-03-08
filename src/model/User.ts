import { INotification } from "./Notification";
import { IRoom } from "./Room";

export interface IUser {
  _id: string;
  username: string;
  password: string;
  fullname: string;
  email: string;
  address: string;
  phone: string;
  avatarURI: string;
  rooms?: IRoom[];
  notifications?: INotification<any>[];
}
