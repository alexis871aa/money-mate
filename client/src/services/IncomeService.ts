import { AxiosResponse } from "axios";
import { IncomeResponse } from "../types/response";
import { Income } from "../types";
import { normalizeDate } from "../helpers";
import $api from "../http";

export const IncomeService = {
  async getIncomes(): Promise<AxiosResponse<IncomeResponse[]>> {
    return $api.get<IncomeResponse[]>("/incomes/");
  },

  async addIncome(income: Income): Promise<AxiosResponse<IncomeResponse>> {
    const normalizedIncome = {
      ...income,
      date: normalizeDate(income.date),
    };

    return $api.post<IncomeResponse>("/incomes/add-income", normalizedIncome);
  },

  async deleteIncome(id: string | undefined): Promise<AxiosResponse<void>> {
    return $api.delete(`/incomes/delete-income/${id}`);
  },
};
