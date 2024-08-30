export interface Income {
  id?: string;
  title: string;
  amount: number | "";
  category: string;
  description: string;
  date: Date | null;
}

export interface IncomeState {
  incomes: Income[];
  loading: boolean;
  error: null | string;
}

export enum IncomeActionTypes {
  ADD_INCOME = "ADD_INCOME",
  DELETE_INCOME = "DELETE_INCOME",
  FETCH_INCOMES = "FETCH_INCOMES",
  FETCH_INCOMES_SUCCESS = "FETCH_INCOMES_SUCCESS",
  FETCH_INCOMES_ERROR = "FETCH_INCOMES_ERROR",
}

interface AddIncomeAction {
  type: IncomeActionTypes.ADD_INCOME;
  payload: Income;
}

interface DeleteIncomeAction {
  type: IncomeActionTypes.DELETE_INCOME;
  payload: string;
}

interface FetchIncomesAction {
  type: IncomeActionTypes.FETCH_INCOMES;
}

interface FetchIncomesSuccessAction {
  type: IncomeActionTypes.FETCH_INCOMES_SUCCESS;
  payload: Income[];
}

interface FetchIncomesErrorAction {
  type: IncomeActionTypes.FETCH_INCOMES_ERROR;
  payload: string;
}

export type IncomeAction =
  | AddIncomeAction
  | DeleteIncomeAction
  | FetchIncomesAction
  | FetchIncomesSuccessAction
  | FetchIncomesErrorAction;
