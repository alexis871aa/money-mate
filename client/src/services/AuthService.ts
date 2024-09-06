import { AxiosResponse } from "axios";
import { AuthResponse } from "../types/response";
import $api, { API_URL } from "../http";

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
  async requestResetPassword(email: string): Promise<void> {
    return $api.post(`/users/request-password-reset`, { email });
  },
  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    return $api.post(`/users/reset-password/${resetToken}`, {
      newPassword,
    });
  },
  async activate(activationLink: string): Promise<void> {
    return $api.get(`/users/activate/${activationLink}`);
  },
};
