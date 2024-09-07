import { FC, useEffect, useMemo } from "react";
import { InnerLayout } from "../../styles/Layouts";
import { useActions, useTypedSelector } from "../../hooks";
import { selectExpense, selectIncome } from "../../store/selectors";
import { StatusDisplay } from "../../ui";
import { calculateTotal } from "../../helpers";
import { Chart } from "../../components";
import styled from "styled-components";

export const Dashboard: FC = () => {
  const { getIncomes, getExpenses } = useActions();
  const {
    incomes,
    loading: incomesLoading,
    error: incomesError,
  } = useTypedSelector(selectIncome);
  const {
    expenses,
    loading: expensesLoading,
    error: expensesError,
  } = useTypedSelector(selectExpense);

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const totalIncomes = useMemo(() => calculateTotal(incomes), [incomes]);

  const totalExpenses = useMemo(() => calculateTotal(expenses), [expenses]);

  const totalBalance = useMemo(
    () => totalIncomes - totalExpenses,
    [totalIncomes, totalExpenses],
  );

  const loading = incomesLoading || expensesLoading;
  const error = incomesError || expensesError;

  if (loading) {
    return (
      <InnerLayout>
        Идёт загрузка данных...
        <StatusDisplay loading message="Идёт загрузка данных..." />
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
    <DashboardStyled>
      <InnerLayout>
        <h1>Статистика</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Итого доходов</h2>
                <p>{totalIncomes} руб</p>
              </div>
              <div className="expense">
                <h2>Итого расходов</h2>
                <p>{totalExpenses} руб</p>
              </div>
              <div className="balance">
                <h2>Баланс</h2>
                <p>{totalBalance} руб</p>
              </div>
            </div>
          </div>
          <div className="history-con">
            {/*<History />*/}
            <h2 className="salary-title">
              Мин <span>Доходы</span> Макс
            </h2>
            <div className="salary-item">
              <p>
                {incomes.length > 0
                  ? Math.min(...incomes.map((item) => item.amount))
                  : 0}{" "}
                руб
              </p>
              <p>
                {incomes.length > 0
                  ? Math.max(...incomes.map((item) => item.amount))
                  : 0}{" "}
                руб
              </p>
            </div>
            <h2 className="salary-title">
              Мин <span>Расходы</span> Макс
            </h2>
            <div className="salary-item">
              <p>
                {expenses.length > 0
                  ? Math.min(...expenses.map((item) => item.amount))
                  : 0}{" "}
                руб
              </p>
              <p>
                {expenses.length > 0
                  ? Math.max(...expenses.map((item) => item.amount))
                  : 0}{" "}
                руб
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.3rem;

    .chart-con {
      grid-column: 1 / 4;
      height: 340px;

      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-top: 1.5rem;

        .income,
        .expense {
          grid-column: span 2;
        }

        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 1px solid #ffffff;
          box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;

          p {
            font-size: 1.3rem;
            font-weight: 500;
          }
        }

        .income {
          p {
            color: var(--color-green);
          }
        }

        .expense {
          p {
            color: var(--color-red);
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;

          p {
            color: var(--color-green);
            font-size: 1.3rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;

      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .salary-title {
        font-size: 1.2rem;

        span {
          font-size: 1.8rem;
        }
      }

      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;
