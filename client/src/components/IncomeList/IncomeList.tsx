import { FC, useEffect } from "react";
import { useActions, useTypedSelector } from "../../hooks";
import { Error } from "../../ui";

export const IncomeList: FC = () => {
  const { incomes, loading, error } = useTypedSelector((state) => state.income);

  const { fetchIncomes } = useActions();

  useEffect(() => {
    fetchIncomes();
  }, []);

  if (loading) {
    return <h1>Идёт загрузка...</h1>;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <div>
      {incomes.map((income) => (
        <div key={income.id}>{income.title}</div>
      ))}
    </div>
  );
};
