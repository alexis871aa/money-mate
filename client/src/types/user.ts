export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

export interface UserState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
}

export enum UserActionTypes {
  SET_USER = "SET_USER",
  SET_AUTH = "SET_AUTH",
  SET_LOADING = "SET_LOADING",
}

interface SetUserAction {
  type: UserActionTypes.SET_USER;
  payload: IUser;
}

interface SetAuthAction {
  type: UserActionTypes.SET_AUTH;
  payload: boolean;
}

interface SetLoadingAction {
  type: UserActionTypes.SET_LOADING;
  payload: boolean;
}

export type UserAction = SetUserAction | SetAuthAction | SetLoadingAction;
