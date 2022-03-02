import { IResponse } from "model/Common";
import { IRoom } from "model/Room";
import { IUser } from "model/User";
import axiosClient from "./axiosClient";

export interface IRoomResponse {
  room: IRoom;
  joinCode?: string;
}

const roomApi = {
  getOne(payload: string): Promise<IResponse<IRoomResponse>> {
    return axiosClient.get(`/rooms/${payload}`);
  },
  create(payload?: Partial<IRoom>): Promise<IResponse<IRoomResponse>> {
    return axiosClient.post("/rooms", payload);
  },
  update(payload: {
    room: Partial<IRoom>;
    notification: string;
  }): Promise<IResponse<IRoom>> {
    return axiosClient.put(`/rooms/${payload.room._id}`, payload);
  },
  delete(payload: string): Promise<IResponse<any>> {
    return axiosClient.delete(`/rooms/${payload}`);
  },
};

export default roomApi;
