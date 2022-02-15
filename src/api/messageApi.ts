import { IResponse } from "model/Common";
import { IMessage } from "model/Message";
import { IRoom } from "model/Room";
import axiosClient from "./axiosClient";

const messageApi = {
  getAllInRoom(payload: IRoom): Promise<IResponse<IMessage[]>> {
    return axiosClient.get(`/rooms/${payload._id}/messages`);
  },
  create(payload: {
    room: IRoom;
    message: Partial<IMessage>;
  }): Promise<IResponse<IMessage>> {
    const { room, message } = payload;
    return axiosClient.post(`/rooms/${room._id}/messages`, message);
  },
};

export default messageApi;
