import { IResponse } from "model/Common";
import { IMember } from "model/Member";
import { IRequest } from "model/Request";
import { IRoom } from "model/Room";
import { IUser } from "model/User";
import axiosClient from "./axiosClient";

const memberApi = {
  getAllInRoom(payload: IRoom): Promise<IResponse<IMember[]>> {
    return axiosClient.get(`/rooms/${payload._id}/members`);
  },
  getMeInRoom(payload: {
    roomId: string;
    joinCode: string;
  }): Promise<IResponse<IMember>> {
    return axiosClient.get(
      `/rooms/${payload.roomId}/members/${payload.joinCode}`
    );
  },
  delete(payload: IMember): Promise<IResponse<any>> {
    return axiosClient.delete(
      `/rooms/${payload.roomId}/members/${payload._id}`
    );
  },
};

export default memberApi;
