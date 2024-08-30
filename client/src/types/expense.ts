export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
}

export interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: null | string;
}

export enum ExpenseActionTypes {
  ADD_EXPENSE = "ADD_EXPENSE",
  DELETE_EXPENSE = "DELETE_EXPENSE",
  FETCH_EXPENSES = "FETCH_EXPENSES",
  FETCH_EXPENSES_SUCCESS = "FETCH_EXPENSES_SUCCESS",
  FETCH_EXPENSES_ERROR = "FETCH_EXPENSES_ERROR",
}

interface AddExpenseAction {
  type: ExpenseActionTypes.ADD_EXPENSE;
  payload: Expense;
}

interface DeleteExpenseAction {
  type: ExpenseActionTypes.DELETE_EXPENSE;
  payload: string;
}

interface FetchExpensesAction {
  type: ExpenseActionTypes.FETCH_EXPENSES;
}

interface FetchExpensesSuccessAction {
  type: ExpenseActionTypes.FETCH_EXPENSES_SUCCESS;
  payload: Expense[];
}

interface FetchExpensesErrorAction {
  type: ExpenseActionTypes.FETCH_EXPENSES_ERROR;
  payload: string;
}

export type ExpenseAction =
  | AddExpenseAction
  | DeleteExpenseAction
  | FetchExpensesAction
  | FetchExpensesSuccessAction
  | FetchExpensesErrorAction;
