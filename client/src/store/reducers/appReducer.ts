import { AppAction, AppActionTypes, AppState } from "../../types";

const initialState: AppState = {
  active: 1,
};

export const appReducer = (
  state: AppState = initialState,
  action: AppAction,
): AppState => {
  switch (action.type) {
    case AppActionTypes.SET_ACTIVE: {
      return {
        ...state,
        active: action.payload,
      };
    }
    default:
      return state;
  }
};
