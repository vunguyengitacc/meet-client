import { IUser } from "./User";

export interface INotification<T> {
  _id: string;
  name: string;
  user: IUser;
  content: T;
  createdAt: Date;
  type: string;
  from: IUser;
}
