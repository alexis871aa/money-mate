import { Dispatch } from "redux";
import { Income, IncomeAction, IncomeActionTypes } from "../../types";
import { IncomeService } from "../../services";

export const getIncomes = () => {
  return async (dispatch: Dispatch<IncomeAction>) => {
    try {
      dispatch({ type: IncomeActionTypes.FETCH_INCOMES });
      const response = await IncomeService.getIncomes();
      dispatch({
        type: IncomeActionTypes.FETCH_INCOMES_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: IncomeActionTypes.FETCH_INCOMES_ERROR,
        payload: "Произошла ошибка при загрузке доходов",
      });
    }
  };
};

export const addIncome = (income: Income) => {
  return async (dispatch: Dispatch<IncomeAction>) => {
    try {
      const response = await IncomeService.addIncome(income);
      dispatch({
        type: IncomeActionTypes.ADD_INCOME,
        payload: response.data,
      });
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};

export const deleteIncome = (id: string | undefined) => {
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
