import * as UserActionCreators from "./user";
import * as IncomeActionCreators from "./income";
import * as ExpenseActionCreators from "./expense";

export default {
  ...UserActionCreators,
  ...IncomeActionCreators,
  ...ExpenseActionCreators,
};
