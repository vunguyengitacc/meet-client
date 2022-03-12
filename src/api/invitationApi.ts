import { IResponse } from "model/Common";
import { IInvitation } from "model/Invitation";
import axiosClient from "./axiosClient";

const invitationApi = {
  getAll(): Promise<IResponse<IInvitation[]>> {
    return axiosClient.get("/invitations");
  },
  create(
    payload: Pick<IInvitation, "roomId" | "userId">
  ): Promise<IResponse<IInvitation>> {
    return axiosClient.post("/invitations", payload);
  },
  answer(payload: {
    invitation: Pick<IInvitation, "_id" | "result">;
    notificationId: string;
  }): Promise<IResponse<string>> {
    const { invitation } = payload;
    return axiosClient.put(`/invitations/${invitation._id}`, payload);
  },
};

export default invitationApi;
