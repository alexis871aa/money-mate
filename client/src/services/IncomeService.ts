import { AxiosResponse } from "axios";
import { IncomeResponse, SingleIncomeResponse } from "../types/response";
import { Income, NewIncome } from "../types";
import { normalizeDate } from "../helpers";
import $api from "../http";

export const IncomeService = {
  async getIncomes(
    page: number,
    limit: number,
    searchTerm: string,
    sortBy: "title" | "amount" | "date",
    sortOrder: "asc" | "desc",
  ): Promise<IncomeResponse> {
    const response = await $api.get<IncomeResponse>(
      `/incomes?page=${page}&limit=${limit}&search=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    );
    return response.data;
  },

  async addIncome(
    income: NewIncome,
  ): Promise<AxiosResponse<SingleIncomeResponse>> {
    const normalizedIncome = {
      ...income,
      date: normalizeDate(income.date),
    };
    return $api.post<SingleIncomeResponse>(
      "/incomes/add-income",
      normalizedIncome,
    );
  },

  async updateIncome(
    income: Income,
  ): Promise<AxiosResponse<SingleIncomeResponse>> {
    const normalizedIncome = {
      ...income,
      date: normalizeDate(income.date),
    };
    return $api.put<SingleIncomeResponse>(
      `/incomes/update-income/${income.id}`,
      normalizedIncome,
    );
  },

  async deleteIncome(id: string): Promise<AxiosResponse<void>> {
    return $api.delete(`/incomes/delete-income/${id}`);
  },
};
