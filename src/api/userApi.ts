import { IResponse } from "model/Common";
import { IUser } from "model/User";
import axiosClient from "./axiosClient";

const userApi = {
  getMe(): Promise<IResponse<IUser>> {
    return axiosClient.get("/users/me");
  },
  update(payload: Partial<IUser>): Promise<IResponse<IUser>> {
    return axiosClient.put("/users/me", payload);
  },
  changePassword(payload: {
    currentPassword: string;
    newPassword: string;
  }): Promise<IResponse<IUser>> {
    return axiosClient.put("/users/me/password", payload);
  },
};

export default userApi;
