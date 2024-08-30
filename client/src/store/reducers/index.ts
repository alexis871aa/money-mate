import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { userReducer } from "./userReducer";
import { incomeReducer } from "./incomeReducer";
import { expenseReducer } from "./expenseReducer";
import { todoReducer } from "./todoReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  income: incomeReducer,
  expense: expenseReducer,
  todo: todoReducer,
});
