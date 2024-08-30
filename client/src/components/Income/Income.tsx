import { FC, useEffect } from "react";
import { InnerLayout } from "../../styles/Layouts";
import { Form } from "../Form/Form";
import { AuthForm } from "../AuthForm/AuthForm";
import { useActions, useTypedSelector } from "../../hooks";
import { Error, Loader } from "../../ui";
import { IncomeItem } from "./components";
import styled from "styled-components";

export const Income: FC = () => {
  const { getIncomes } = useActions();
  const { incomes, loading, error } = useTypedSelector((state) => state.income);

  useEffect(() => {
    getIncomes();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  // 2.48

  return (
    <IncomesStyled>
      <InnerLayout>
        <h1>Доходы</h1>
        <div className="income-content">
          <div className="form-container">
            {/*<AuthForm />*/}
            <Form />
          </div>
          <div className="incomes">
            {incomes.map((income) => {
              const { id, title, amount, category, description, date } = income;
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
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomesStyled>
  );
};

const IncomesStyled = styled.div`
  display: flex;
  overflow: auto;

  .income-content {
    display: flex;
    gap: 2rem;

    .incomes {
      flex: 1;
    }
  }
`;
