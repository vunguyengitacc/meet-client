import { ILoginParams } from "feature/auth/pages/login/form";
import { IResponse } from "model/Common";
import { IUser } from "model/User";
import axiosClient from "./axiosClient";

export interface IAuth {
  access_token: string;
}

const authApi = {
  register(payload: Partial<IUser>): Promise<IResponse<IAuth>> {
    return axiosClient.post("/auth/register", payload);
  },
  login(payload: ILoginParams): Promise<IResponse<IAuth>> {
    return axiosClient.post("/auth/login", payload);
  },
};

export default authApi;
