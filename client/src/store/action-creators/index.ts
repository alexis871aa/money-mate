import * as AppActionCreators from "./app";
import * as UserActionCreators from "./user";
import * as IncomeActionCreators from "./income";
import * as ExpenseActionCreators from "./expense";
import * as TodoActionCreators from "./todo";

export default {
  ...AppActionCreators,
  ...UserActionCreators,
  ...IncomeActionCreators,
  ...ExpenseActionCreators,
  ...TodoActionCreators,
};
