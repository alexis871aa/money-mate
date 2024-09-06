import { useTypedSelector } from "./useTypedSelector";
import { selectExpense, selectIncome } from "../store/selectors";

export const useHistory = () => {
  const { incomes } = useTypedSelector(selectIncome);
  const { expenses } = useTypedSelector(selectExpense);

  return {
    history: [...incomes, ...expenses],
  };
};
