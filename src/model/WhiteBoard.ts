import { IUser } from "./User";

export interface IWhiteBoard {
  _id: string;
  name: string;
  user?: IUser;
  data: any[];
}
