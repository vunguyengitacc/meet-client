import { IResponse } from "model/Common";
import { IWhiteBoard } from "model/WhiteBoard";
import axiosClient from "./axiosClient";

const whiteBoardApi = {
  getAll(): Promise<IResponse<IWhiteBoard[]>> {
    return axiosClient.get("/whiteboards");
  },
  getById(payload: string): Promise<IResponse<IWhiteBoard>> {
    return axiosClient.get(`/whiteboards/${payload}`);
  },
  createOne(payload: Partial<IWhiteBoard>): Promise<IResponse<IWhiteBoard>> {
    return axiosClient.post("/whiteboards", payload);
  },
  updateOne(payload: Partial<IWhiteBoard>): Promise<IResponse<IWhiteBoard>> {
    return axiosClient.put(`/whiteboards/${payload._id}`, payload);
  },
  deleteOne(payload: IWhiteBoard): Promise<IResponse<any>> {
    return axiosClient.delete(`/whiteboards/${payload._id}`);
  },
};

export default whiteBoardApi;
