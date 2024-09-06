import { Dispatch } from "redux";
import {
  Expense,
  ExpenseAction,
  ExpenseActionTypes,
  NewExpense,
} from "../../types";
import { ExpenseService } from "../../services";

export const getExpenses = (
  page = 1,
  limit = 10,
  searchTerm = "",
  sortBy: "title" | "amount" | "date" = "date",
  sortOrder: "asc" | "desc" = "desc",
) => {
  return async (dispatch: Dispatch<ExpenseAction>) => {
    try {
      dispatch({ type: ExpenseActionTypes.FETCH_EXPENSES });

      const response = await ExpenseService.getExpenses(
        page,
        limit,
        searchTerm,
        sortBy,
        sortOrder,
      );

      dispatch({
        type: ExpenseActionTypes.FETCH_EXPENSES_SUCCESS,
        payload: {
          expenses: response.data.expenses,
          totalCount: response.data.totalCount,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
        },
      });
    } catch (e) {
      dispatch({
        type: ExpenseActionTypes.FETCH_EXPENSES_ERROR,
        payload: "Произошла ошибка при загрузке расходов",
      });
    }
  };
};

export const addExpense = (expense: NewExpense) => {
  return async (dispatch: Dispatch<ExpenseAction>) => {
    try {
      const response = await ExpenseService.addExpense(expense);
      dispatch({
        type: ExpenseActionTypes.ADD_EXPENSE,
        payload: response.data.data,
      });
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};

export const deleteExpense = (id: string) => {
  return async (dispatch: Dispatch<ExpenseAction>) => {
    try {
      await ExpenseService.deleteExpense(id);
      dispatch({
        type: ExpenseActionTypes.DELETE_EXPENSE,
        payload: id,
      });
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};

export const updateExpense = (expense: Expense) => {
  return async (dispatch: Dispatch<ExpenseAction>) => {
    try {
      const response = await ExpenseService.updateExpense(expense);
      dispatch({
        type: ExpenseActionTypes.UPDATE_EXPENSE,
        payload: response.data.data,
      });
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};
