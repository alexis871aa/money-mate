import { IUser, UserAction, UserActionTypes, UserState } from "../../types";

const initialState: UserState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
};

export const userReducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_USER: {
      return {
        ...state,
        user: action.payload as IUser,
      };
    }
    case UserActionTypes.SET_AUTH: {
      return {
        ...state,
        isAuth: action.payload as boolean,
      };
    }
    case UserActionTypes.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload as boolean,
      };
    }
    default:
      return state;
  }
};
