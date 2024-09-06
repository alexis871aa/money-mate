import { Income } from "../income";

export interface SingleIncomeResponse {
  status: string;
  data: Income;
  message: string;
}

export interface IncomeResponse {
  status: string;
  data: {
    incomes: Income[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
  message: string;
}
