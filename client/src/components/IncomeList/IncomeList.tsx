import { FC, useEffect } from "react";
import { useActions, useTypedSelector } from "../../hooks";
import { Error, Loader } from "../../ui";

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
    return <Error errorMessage={error} />;
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
