import { IResponse } from "model/Common";
import { INotification } from "model/Notification";
import axiosClient from "./axiosClient";

const notificationApi = {
  getAll(): Promise<IResponse<INotification<any>[]>> {
    return axiosClient.get("/notifications");
  },
};

export default notificationApi;
