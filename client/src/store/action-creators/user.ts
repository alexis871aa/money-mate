import { IUser, UserAction, UserActionTypes } from "../../types";
import { Dispatch } from "redux";
import { AuthService } from "../../services";
import { AuthResponse } from "../../types/response";
import axios from "axios";
import { API_URL } from "../../constants/API_URL";

export const registration = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.accessToken);
      dispatch({ type: UserActionTypes.SET_AUTH, payload: true });
      dispatch({ type: UserActionTypes.SET_USER, payload: response.data.user });
    } catch (e: any) {
      console.log(e.response?.data?.message);
      throw new Error(e.response?.data?.message);
    }
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      dispatch({ type: UserActionTypes.SET_AUTH, payload: true });
      dispatch({ type: UserActionTypes.SET_USER, payload: response.data.user });
    } catch (e: any) {
      console.log(e.response?.data?.message);
      throw new Error(e.response?.data?.message);
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      dispatch({ type: UserActionTypes.SET_AUTH, payload: false });
      dispatch({ type: UserActionTypes.SET_USER, payload: {} as IUser });
    } catch (e: any) {
      console.log(e.response?.data?.message);
      throw new Error(e.response?.data?.message);
    } finally {
      dispatch({ type: UserActionTypes.SET_LOADING, payload: false });
    }
  };
};

export const checkAuth = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.SET_LOADING, payload: true });
      const response = await axios.get<AuthResponse>(
        `${API_URL}/users/refresh`,
        {
          withCredentials: true,
        },
      );

      localStorage.setItem("token", response.data.accessToken);
      dispatch({ type: UserActionTypes.SET_AUTH, payload: true });
      dispatch({ type: UserActionTypes.SET_USER, payload: response.data.user });
    } catch (e: any) {
      console.log(e.response?.data?.message);
      throw new Error(e.response?.data?.message);
    } finally {
      dispatch({ type: UserActionTypes.SET_LOADING, payload: false });
    }
  };
};

export const requestResetPassword = (email: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await AuthService.requestResetPassword(email);
    } catch (e: any) {
      console.log(e.response?.data?.message);
      throw new Error(e.response?.data?.message);
    }
  };
};

export const resetPassword = (resetToken: string, newPassword: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await AuthService.resetPassword(resetToken, newPassword);
    } catch (e: any) {
      console.log(e.response?.data?.message);
      throw new Error(e.response?.data?.message);
    }
  };
};
