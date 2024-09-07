import { FC, useEffect, useMemo, useState } from "react";
import { InnerLayout } from "../../styles/Layouts";
import { ExpenseForm, TransactionItem, Pagination } from "../../components";
import { useActions, useTypedSelector } from "../../hooks";
import { StatusDisplay } from "../../ui";
import { calculateTotal } from "../../helpers";
import debounce from "lodash.debounce";
import styled from "styled-components";

export const Expense: FC = () => {
  const { getExpenses, deleteExpense } = useActions();
  const { expenses, loading, error, totalCount } = useTypedSelector(
    (state) => state.expense,
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
    getExpenses(
      currentPage,
      itemsPerPage,
      debouncedSearchTerm,
      sortBy,
      sortOrder,
    );
  }, [getExpenses, currentPage, debouncedSearchTerm, sortBy, sortOrder]);

  const totalExpenses = useMemo(() => calculateTotal(expenses), [expenses]);

  if (loading) {
    return (
      <InnerLayout>
        <StatusDisplay loading message="Идёт загрузка расходов..." />
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
    <ExpensesStyled>
      <InnerLayout>
        <h1>Расходы</h1>
        <h2 className="total-expense">
          Всего расходов: <span>{totalExpenses} ₽</span>
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

        <div className="expense-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="expenses">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <TransactionItem
                  key={expense.id}
                  id={expense.id || ""}
                  title={expense.title}
                  description={expense.description}
                  amount={expense.amount}
                  type={expense.type === "income" ? "income" : "expense"}
                  date={expense.date}
                  category={expense.category}
                  $indicatorColor="var(--color-red)"
                  deleteItem={deleteExpense}
                />
              ))
            ) : (
              <div>
                <StatusDisplay message="Расходов не найдено" />
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
    </ExpensesStyled>
  );
};

const ExpensesStyled = styled.div`
  display: flex;
  overflow: auto;

  .total-expense {
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
      color: var(--color-red);
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

  .expense-content {
    display: flex;
    gap: 2rem;

    .expenses {
      flex: 1;
    }
  }
`;
