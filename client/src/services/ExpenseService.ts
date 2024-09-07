import { AxiosResponse } from "axios";
import { ExpenseResponse, SingleExpenseResponse } from "../types/response";
import { Expense, NewExpense } from "../types";
import { normalizeDate } from "../helpers";
import $api from "../http";

export const ExpenseService = {
  async getExpenses(
    page: number,
    limit: number,
    searchTerm: string,
    sortBy: "title" | "amount" | "date",
    sortOrder: "asc" | "desc",
  ): Promise<ExpenseResponse> {
    const response = await $api.get<ExpenseResponse>(
      `/expenses?page=${page}&limit=${limit}&search=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    );
    return response.data;
  },

  async getExpenseById(id: string): Promise<SingleExpenseResponse> {
    const response = await $api.get<SingleExpenseResponse>(`/expenses/${id}`);
    return response.data;
  },

  async addExpense(
    expense: NewExpense,
  ): Promise<AxiosResponse<SingleExpenseResponse>> {
    const normalizedExpense = {
      ...expense,
      date: normalizeDate(expense.date),
    };
    return $api.post<SingleExpenseResponse>(
      "/expenses/add-expense",
      normalizedExpense,
    );
  },

  async updateExpense(
    expense: Expense,
  ): Promise<AxiosResponse<SingleExpenseResponse>> {
    const normalizedExpense = {
      ...expense,
      date: normalizeDate(expense.date),
    };
    return $api.put<SingleExpenseResponse>(
      `/expenses/update-expense/${expense.id}`,
      normalizedExpense,
    );
  },

  async deleteExpense(id: string): Promise<AxiosResponse<void>> {
    return $api.delete(`/expenses/delete-expense/${id}`);
  },
};
