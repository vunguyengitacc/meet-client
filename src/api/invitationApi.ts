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
  answer(
    payload: Pick<IInvitation, "_id" | "result">
  ): Promise<IResponse<string>> {
    return axiosClient.put(`/invitations/${payload._id}`, payload);
  },
};

export default invitationApi;
