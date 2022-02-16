import { ILoginParams } from "feature/auth/pages/login/form";
import { IResponse } from "model/Common";
import { IUser } from "model/User";
import axiosClient from "./axiosClient";

const authApi = {
  register(payload: Partial<IUser>): Promise<IResponse<string>> {
    return axiosClient.post("/auth/register", payload);
  },
  login(payload: ILoginParams): Promise<IResponse<string>> {
    return axiosClient.post("/auth/login", payload);
  },
};

export default authApi;
