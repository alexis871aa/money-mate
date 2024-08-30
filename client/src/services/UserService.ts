import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../types";

export const UserService = {
  async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/users");
  },
};
