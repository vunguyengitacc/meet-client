import { IRoom } from "./Room";
import { IUser } from "./User";

export interface IMember {
  _id: string;
  userId: string;
  roomId: string;
  user?: IUser;
  room?: IRoom;
  isAdmin?: boolean;
}
