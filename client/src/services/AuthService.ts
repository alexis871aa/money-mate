import { AxiosResponse } from "axios";
import { AuthResponse } from "../types/response";
import $api from "../http";

export const AuthService = {
  async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/users/login", { email, password });
  },
  async registration(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/users/registration", { email, password });
  },
  async logout(): Promise<void> {
    return $api.post("/users/logout");
  },
};
