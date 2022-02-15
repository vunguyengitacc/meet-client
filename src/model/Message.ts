import { IMember } from "./Member";

export interface IMessage {
  _id: string;
  content: string;
  createdAt: Date;
  memberId: string;
  member: IMember;
}
