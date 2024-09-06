import { Dispatch } from "redux";
import {
  Income,
  IncomeAction,
  IncomeActionTypes,
  NewIncome,
} from "../../types";
import { IncomeService } from "../../services";

export const getIncomes = (
  page = 1,
  limit = 10,
  searchTerm = "",
  sortBy: "title" | "amount" | "date" = "date",
  sortOrder: "asc" | "desc" = "desc",
) => {
  return async (dispatch: Dispatch<IncomeAction>) => {
    try {
      dispatch({ type: IncomeActionTypes.FETCH_INCOMES });

      const response = await IncomeService.getIncomes(
        page,
        limit,
        searchTerm,
        sortBy,
        sortOrder,
      );

      dispatch({
        type: IncomeActionTypes.FETCH_INCOMES_SUCCESS,
        payload: {
          incomes: response.data.incomes,
          totalCount: response.data.totalCount,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
        },
      });
    } catch (e) {
      dispatch({
        type: IncomeActionTypes.FETCH_INCOMES_ERROR,
        payload: "Произошла ошибка при загрузке доходов",
      });
    }
  };
};

export const addIncome = (income: NewIncome) => {
  return async (dispatch: Dispatch<IncomeAction>) => {
    try {
      const response = await IncomeService.addIncome(income);
      dispatch({
        type: IncomeActionTypes.ADD_INCOME,
        payload: response.data.data,
      });
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};

export const deleteIncome = (id: string) => {
  return async (dispatch: Dispatch<IncomeAction>) => {
    try {
      await IncomeService.deleteIncome(id);
      dispatch({
        type: IncomeActionTypes.DELETE_INCOME,
        payload: id,
      });
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};

export const updateIncome = (income: Income) => {
  return async (dispatch: Dispatch<IncomeAction>) => {
    try {
      const response = await IncomeService.updateIncome(income);
      dispatch({
        type: IncomeActionTypes.UPDATE_INCOME,
        payload: response.data.data,
      });
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};
