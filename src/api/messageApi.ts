import { IResponse } from "model/Common";
import { IMember } from "model/Member";
import { IMessage } from "model/Message";
import { IRoom } from "model/Room";
import axiosClient from "./axiosClient";

const messageApi = {
  getAllInRoom(payload: IRoom): Promise<IResponse<IMessage[]>> {
    return axiosClient.get(`/rooms/${payload._id}/messages`);
  },
  create(payload: {
    member: IMember;
    message: Partial<IMessage>;
  }): Promise<IResponse<IMessage>> {
    const { member, message } = payload;
    return axiosClient.post(`/rooms/${member.roomId}/messages`, payload);
  },
};

export default messageApi;
