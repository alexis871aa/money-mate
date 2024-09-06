export interface NewExpense {
  title: string;
  amount: number;
  type?: string;
  category: string;
  description: string;
  date: Date | null;
}

export interface Expense extends NewExpense {
  id: string;
}

export interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: null | string;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export enum ExpenseActionTypes {
  ADD_EXPENSE = "ADD_EXPENSE",
  UPDATE_EXPENSE = "UPDATE_EXPENSE",
  DELETE_EXPENSE = "DELETE_EXPENSE",
  FETCH_EXPENSES = "FETCH_EXPENSES",
  FETCH_EXPENSES_SUCCESS = "FETCH_EXPENSES_SUCCESS",
  FETCH_EXPENSES_ERROR = "FETCH_EXPENSES_ERROR",
}

interface AddExpenseAction {
  type: ExpenseActionTypes.ADD_EXPENSE;
  payload: Expense;
}

interface UpdateExpenseAction {
  type: ExpenseActionTypes.UPDATE_EXPENSE;
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
  payload: {
    expenses: Expense[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
}

interface FetchExpensesErrorAction {
  type: ExpenseActionTypes.FETCH_EXPENSES_ERROR;
  payload: string;
}

export type ExpenseAction =
  | AddExpenseAction
  | UpdateExpenseAction
  | DeleteExpenseAction
  | FetchExpensesAction
  | FetchExpensesSuccessAction
  | FetchExpensesErrorAction;
