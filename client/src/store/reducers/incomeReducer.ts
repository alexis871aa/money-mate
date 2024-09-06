import { IncomeAction, IncomeActionTypes, IncomeState } from "../../types";

export const initialState: IncomeState = {
  incomes: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  totalPages: 1,
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
      const { incomes, totalCount, currentPage, totalPages } = action.payload;
      return {
        ...state,
        loading: false,
        error: null,
        incomes,
        totalCount,
        currentPage,
        totalPages,
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
