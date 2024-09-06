export interface NewIncome {
  title: string;
  amount: number;
  type?: string;
  category: string;
  description: string;
  date: Date | null;
}

export interface Income extends NewIncome {
  id: string;
}

export interface IncomeState {
  incomes: Income[];
  loading: boolean;
  error: null | string;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export enum IncomeActionTypes {
  ADD_INCOME = "ADD_INCOME",
  UPDATE_INCOME = "UPDATE_INCOME",
  DELETE_INCOME = "DELETE_INCOME",
  FETCH_INCOMES = "FETCH_INCOMES",
  FETCH_INCOMES_SUCCESS = "FETCH_INCOMES_SUCCESS",
  FETCH_INCOMES_ERROR = "FETCH_INCOMES_ERROR",
}

interface AddIncomeAction {
  type: IncomeActionTypes.ADD_INCOME;
  payload: Income;
}

interface UpdateIncomeAction {
  type: IncomeActionTypes.UPDATE_INCOME;
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
  payload: {
    incomes: Income[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
}

interface FetchIncomesErrorAction {
  type: IncomeActionTypes.FETCH_INCOMES_ERROR;
  payload: string;
}

export type IncomeAction =
  | AddIncomeAction
  | UpdateIncomeAction
  | DeleteIncomeAction
  | FetchIncomesAction
  | FetchIncomesSuccessAction
  | FetchIncomesErrorAction;
