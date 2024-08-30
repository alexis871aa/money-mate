import { ExpenseAction, ExpenseActionTypes, ExpenseState } from "../../types";

export const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
};

export const expenseReducer = (
  state: ExpenseState = initialState,
  action: ExpenseAction,
): ExpenseState => {
  switch (action.type) {
    case ExpenseActionTypes.ADD_EXPENSE: {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    }
    case ExpenseActionTypes.DELETE_EXPENSE: {
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload,
        ),
      };
    }
    case ExpenseActionTypes.FETCH_EXPENSES: {
      return {
        ...state,
        loading: true,
        error: null,
        expenses: [],
      };
    }
    case ExpenseActionTypes.FETCH_EXPENSES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        expenses: action.payload,
      };
    }
    case ExpenseActionTypes.FETCH_EXPENSES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        expenses: [],
      };
    }
    default:
      return state;
  }
};
