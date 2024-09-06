import { Expense } from "../expense";

export interface SingleExpenseResponse {
  status: string;
  data: Expense;
  message: string;
}

export interface ExpenseResponse {
  status: string;
  data: {
    expenses: Expense[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
  message: string;
}
