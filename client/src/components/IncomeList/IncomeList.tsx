import { FC, useEffect } from "react";
import { useActions, useTypedSelector } from "../../hooks";
import { Loader, StatusDisplay } from "../../ui";

export const IncomeList: FC = () => {
  const { incomes, loading, error } = useTypedSelector((state) => state.income);

  const { getIncomes } = useActions();

  useEffect(() => {
    getIncomes();
  }, [getIncomes]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <StatusDisplay type="error" message={error} />;
  }

  return (
    <div>
      {incomes.length > 0 ? (
        incomes.map((income) => <div key={income.id}>{income.title}</div>)
      ) : (
        <div>Доходов не найдено!</div>
      )}
    </div>
  );
};
