import { AppActionTypes } from "../../types";

export const setActive = (active: number) => {
  return { type: AppActionTypes.SET_ACTIVE, payload: active };
};
