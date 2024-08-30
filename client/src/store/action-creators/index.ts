import * as AppActionCreators from "./app";
import * as UserActionCreators from "./user";
import * as IncomeActionCreators from "./income";
import * as TodoActionCreators from "./todo";

export default {
  ...AppActionCreators,
  ...UserActionCreators,
  ...TodoActionCreators,
  ...IncomeActionCreators,
};
