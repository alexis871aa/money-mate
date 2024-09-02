import { FC, useEffect, useMemo } from "react";
import { InnerLayout } from "../../styles/Layouts";
import { Form } from "../Form/Form";
import { AuthForm } from "../AuthForm/AuthForm";
import { useActions, useTypedSelector } from "../../hooks";
import { StatusDisplay } from "../../ui";
import { IncomeItem } from "./components";
import styled from "styled-components";

export const Income: FC = () => {
  const { getIncomes, deleteIncome } = useActions();
  const { incomes, loading, error } = useTypedSelector((state) => state.income);

  useEffect(() => {
    getIncomes();
  }, []);

  const totalIncome = useMemo(
    () => incomes.reduce((acc, income) => acc + income.amount, 0),
    [incomes],
  );

  if (loading) {
    return (
      <InnerLayout>
        <StatusDisplay loading message="Идёт загрузка доходов..." />
      </InnerLayout>
    );
  }

  if (error) {
    return (
      <InnerLayout>
        <StatusDisplay type="error" message={error} />
      </InnerLayout>
    );
  }

  return (
    <IncomesStyled>
      <InnerLayout>
        <h1>Доходы</h1>
        <h2 className="total-income">
          Всего доходов: <span>{totalIncome} ₽</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            {/*<AuthForm />*/}
            <Form />
          </div>
          <div className="incomes">
            {incomes.length > 0 ? (
              incomes.map((income) => {
                const { id, title, amount, category, description, date } =
                  income;
                return (
                  <IncomeItem
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    category={category}
                    $indicatorColor="var(--color-green)"
                    deleteItem={deleteIncome}
                  />
                );
              })
            ) : (
              <div>
                <StatusDisplay message="Доходов не найдено" />
              </div>
            )}
          </div>
        </div>
      </InnerLayout>
    </IncomesStyled>
  );
};

const IncomesStyled = styled.div`
  display: flex;
  overflow: auto;

  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;

    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }

  .income-content {
    display: flex;
    gap: 2rem;

    .incomes {
      flex: 1;
    }
  }
`;
