import { IncomeAction, IncomeActionTypes, IncomeState } from "../../types";

export const initialState: IncomeState = {
  incomes: [],
  loading: false,
  error: null,
};

export const incomeReducer = (
  state: IncomeState = initialState,
  action: IncomeAction,
): IncomeState => {
  switch (action.type) {
    case IncomeActionTypes.ADD_INCOME: {
      return {
        ...state,
        incomes: [...state.incomes, action.payload],
      };
    }
    case IncomeActionTypes.DELETE_INCOME: {
      return {
        ...state,
        incomes: state.incomes.filter((income) => income.id !== action.payload),
      };
    }
    case IncomeActionTypes.FETCH_INCOMES: {
      return {
        ...state,
        loading: true,
        error: null,
        incomes: [],
      };
    }
    case IncomeActionTypes.FETCH_INCOMES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        incomes: action.payload,
      };
    }
    case IncomeActionTypes.FETCH_INCOMES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        incomes: [],
      };
    }
    default:
      return state;
  }
};
