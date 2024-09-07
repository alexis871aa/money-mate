import { FC, useEffect, useMemo, useState } from "react";
import { InnerLayout } from "../../styles/Layouts";
import { IncomeForm, TransactionItem, Pagination } from "../../components";
import { useActions, useTypedSelector } from "../../hooks";
import { StatusDisplay } from "../../ui";
import { calculateTotal } from "../../helpers";
import debounce from "lodash.debounce";
import styled from "styled-components";

export const Income: FC = () => {
  const { getIncomes, deleteIncome } = useActions();
  const { incomes, loading, error, totalCount } = useTypedSelector(
    (state) => state.income,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [sortBy, setSortBy] = useState<"title" | "amount" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 4;

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    handler();

    return () => {
      handler.cancel();
    };
  }, [searchTerm]);

  useEffect(() => {
    getIncomes(
      currentPage,
      itemsPerPage,
      debouncedSearchTerm,
      sortBy,
      sortOrder,
    );
  }, [getIncomes, currentPage, debouncedSearchTerm, sortBy, sortOrder]);

  const totalIncome = useMemo(() => calculateTotal(incomes), [incomes]);

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

        <div className="filters">
          <input
            type="text"
            placeholder="Поиск по заголовку или категории"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="sort-controls">
            <label>Сортировать по:</label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "title" | "amount" | "date")
              }
            >
              <option value="title">Заголовок</option>
              <option value="amount">Сумма</option>
              <option value="date">Дата</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            >
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>
            </select>
          </div>
        </div>

        <div className="income-content">
          <div className="form-container">
            <IncomeForm />
          </div>
          <div className="incomes">
            {incomes.length > 0 ? (
              incomes.map((income) => (
                <TransactionItem
                  key={income.id}
                  id={income.id || ""}
                  title={income.title}
                  description={income.description}
                  amount={income.amount}
                  type={income.type === "expense" ? "expense" : "income"}
                  date={income.date}
                  category={income.category}
                  $indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              ))
            ) : (
              <div>
                <StatusDisplay message="Доходов не найдено" />
              </div>
            )}
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
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
    font-size: 1.5rem;
    gap: 0.5rem;

    span {
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--color-green);
    }
  }

  .filters {
    display: flex;
    gap: 1rem;
    align-items: center;

    input {
      padding: 0.5rem;
      border-radius: 5px;
      border: 1px solid var(--primary-color);
    }

    .sort-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      select {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid var(--primary-color);
      }
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
