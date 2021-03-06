export interface IRoom {
  _id: string;
  name: string;
  description: string;
  accessCode: string;
  isPrivate: boolean;
  isRecording: boolean;
  isShowOldMessage: boolean;
  isAllowMessage: boolean;
  isAllowShareScreen: boolean;
  isAllowShareWebcam: boolean;
  isAllowShareMicro: boolean;
  startAt?: Date;
  finishAt?: Date;
  remindType?: number;
}
