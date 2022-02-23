export interface IRoom {
  _id: string;
  name: string;
  description: string;
  accessCode: string;
  isPrivate: boolean;
  isRecording: boolean;
  isShowOldMessage: boolean;
  isAllowMessage: boolean;
  joinRequest: string[];
}
