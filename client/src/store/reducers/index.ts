import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { incomeReducer } from "./incomeReducer";
import { expenseReducer } from "./expenseReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  income: incomeReducer,
  expense: expenseReducer,
});
