export interface AppState {
  active: number;
}

export enum AppActionTypes {
  SET_ACTIVE = "SET_ACTIVE",
}

interface SetActiveAction {
  type: AppActionTypes.SET_ACTIVE;
  payload: number;
}

export type AppAction = SetActiveAction;
