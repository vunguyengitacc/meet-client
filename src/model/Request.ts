import { RequestType } from "utilities/joinRequestTypeUtil";
import { IRoom } from "./Room";
import { IUser } from "./User";

export interface IRequest {
  _id: string;
  room: IRoom;
  user: IUser;
  result: RequestType;
  createdAt: Date;
}
