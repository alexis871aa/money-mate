import { FC, useEffect, useMemo, useState } from "react";
import { InnerLayout } from "../../styles/Layouts";
import { TransactionItem, Pagination } from "../../components";
import { useActions, useTypedSelector } from "../../hooks";
import debounce from "lodash.debounce";
import { StatusDisplay } from "../../ui";
import styled from "styled-components";

export const OperationsPage: FC = () => {
  const { getIncomes, getExpenses, deleteIncome } = useActions();
  const {
    incomes,
    loading: incomesLoading,
    error: incomesError,
  } = useTypedSelector((state) => state.income);
  const {
    expenses,
    loading: expensesLoading,
    error: expensesError,
  } = useTypedSelector((state) => state.expense);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [sortBy, setSortBy] = useState<"title" | "amount" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 10;

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
    getExpenses(
      currentPage,
      itemsPerPage,
      debouncedSearchTerm,
      sortBy,
      sortOrder,
    );
  }, [
    getIncomes,
    getExpenses,
    currentPage,
    debouncedSearchTerm,
    sortBy,
    sortOrder,
  ]);

  const totalItems = useMemo(() => {
    return [...incomes, ...expenses].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "date":
          aValue = a.date ? new Date(a.date).getTime() : 0;
          bValue = b.date ? new Date(b.date).getTime() : 0;
          break;
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }

      if (sortOrder === "asc") {
        if (typeof aValue === "string") {
          return aValue.localeCompare(bValue);
        } else {
          return aValue - bValue;
        }
      } else {
        if (typeof aValue === "string") {
          return bValue.localeCompare(aValue);
        } else {
          return bValue - aValue;
        }
      }
    });
  }, [incomes, expenses, sortBy, sortOrder]);

  const totalLoading = incomesLoading || expensesLoading;
  const totalError = incomesError || expensesError;

  if (totalLoading) {
    return (
      <InnerLayout>
        <StatusDisplay loading message="Идёт загрузка операций..." />
      </InnerLayout>
    );
  }

  if (totalError) {
    return (
      <InnerLayout>
        <StatusDisplay type="error" message={totalError} />
      </InnerLayout>
    );
  }

  return (
    <OperationsStyled>
      <InnerLayout>
        <h1>Операции</h1>
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
        <div className="operation-content">
          <div className="operations">
            {totalItems.length > 0 ? (
              totalItems.map((item) => (
                <TransactionItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  amount={item.amount}
                  date={item.date}
                  category={item.category}
                  description={item.description}
                  type={item.type === "expense" ? "expense" : "income"}
                  $indicatorColor={
                    item.type === "expense"
                      ? "var(--color-red)"
                      : "var(--color-green)"
                  }
                  deleteItem={deleteIncome}
                />
              ))
            ) : (
              <div>
                <StatusDisplay message="Операций не найдено" />
              </div>
            )}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalCount={totalItems.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </InnerLayout>
    </OperationsStyled>
  );
};

const OperationsStyled = styled.div`
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

  .operation-content {
    display: flex;
    gap: 2rem;

    .operations {
      flex: 1;
    }
  }
`;
