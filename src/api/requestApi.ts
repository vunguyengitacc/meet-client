import { IResponse } from "model/Common";
import { IRequest } from "model/Request";
import { IRoom } from "model/Room";
import axiosClient from "./axiosClient";

const requestApi = {
  getAllInRoom(payload: IRoom): Promise<IResponse<IRequest[]>> {
    return axiosClient.get(`/rooms/${payload._id}/requests`);
  },
  join(payload: IRoom): Promise<IResponse<any>> {
    return axiosClient.post(`/rooms/${payload._id}/requests`, payload);
  },
  answer(payload: {
    room: IRoom;
    request: IRequest;
    answer: Partial<IRequest>;
  }): Promise<IResponse<any>> {
    const { room, request, answer } = payload;
    return axiosClient.put(
      `/rooms/${room._id}/requests/${request._id}`,
      answer
    );
  },
};

export default requestApi;
