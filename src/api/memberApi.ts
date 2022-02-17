import { IResponse } from "model/Common";
import { IMember } from "model/Member";
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
  join(payload: IRoom): Promise<IResponse<string>> {
    return axiosClient.post(`/rooms/${payload._id}/members`, payload);
  },
  accept(payload: {
    room: Partial<IRoom>;
    user: IUser;
  }): Promise<IResponse<IMember>> {
    const { room, user } = payload;
    return axiosClient.put(`/rooms/${room._id}/request/${user._id}`, payload);
  },
  delete(payload: IMember): Promise<IResponse<any>> {
    return axiosClient.delete(
      `/rooms/${payload.roomId}/members/${payload._id}`
    );
  },
};

export default memberApi;
