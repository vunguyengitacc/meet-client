import { IResponse } from "model/Common";
import { IRoom } from "model/Room";
import { IUser } from "model/User";
import axiosClient from "./axiosClient";

export interface ICreateRoomResponse {
  room: IRoom;
  joinCode: string;
}

const roomApi = {
  getOne(payload: string): Promise<IResponse<IRoom>> {
    return axiosClient.get(`/rooms/${payload}`);
  },
  create(payload?: IRoom): Promise<IResponse<ICreateRoomResponse>> {
    return axiosClient.post("/rooms", payload);
  },
  update(payload: Partial<IRoom>): Promise<IResponse<IRoom>> {
    return axiosClient.put(`/rooms/${payload._id}`, payload);
  },
  delete(payload: Partial<IRoom>): Promise<IResponse<any>> {
    return axiosClient.delete(`/rooms/${payload._id}`);
  },
};

export default roomApi;
