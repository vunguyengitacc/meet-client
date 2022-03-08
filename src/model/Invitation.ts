import { IRoom } from "./Room";

export interface IInvitation {
  _id: string;
  userId: string;
  roomId: string;
  result: string;
  room: IRoom;
}
