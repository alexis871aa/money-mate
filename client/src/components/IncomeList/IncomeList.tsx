import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { useActions, useTypedSelector } from "../../hooks";
import { TransactionItem } from "../../components";
import { StatusDisplay } from "../../ui";
import debounce from "lodash.debounce";
import styled from "styled-components";

export const IncomeList: FC = () => {
  const { getIncomes, deleteIncome } = useActions();
  const { incomes, loading, error } = useTypedSelector((state) => state.income);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "amount" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 3000);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    getIncomes(currentPage, itemsPerPage, searchTerm, sortBy, sortOrder);
  }, [currentPage, itemsPerPage, searchTerm, sortBy, sortOrder, getIncomes]);

  const handleSort = (field: "title" | "amount" | "date") => {
    if (sortBy === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const totalPages = Math.ceil(incomes.length / itemsPerPage);
  const paginatedIncomes = incomes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteIncome(id);
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  if (loading) {
    return <StatusDisplay loading message="Идёт загрузка доходов..." />;
  }

  if (error) {
    return <StatusDisplay type="error" message={error} />;
  }

  return (
    <IncomeListStyled>
      <div className="controls">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="sort-controls">
          <button onClick={() => handleSort("title")}>
            Сортировать по названию{" "}
            {sortBy === "title" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
          <button onClick={() => handleSort("amount")}>
            Сортировать по сумме{" "}
            {sortBy === "amount" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
          <button onClick={() => handleSort("date")}>
            Сортировать по дате{" "}
            {sortBy === "date" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
        </div>
      </div>

      <div className="income-list">
        {paginatedIncomes.length > 0 ? (
          paginatedIncomes.map((income) => (
            <TransactionItem
              key={income.id}
              id={income.id}
              title={income.title}
              amount={income.amount}
              category={income.category}
              description={income.description}
              date={income.date}
              type="income"
              $indicatorColor="var(--color-green)"
              deleteItem={() => handleDelete(income.id)}
            />
          ))
        ) : (
          <StatusDisplay message="Доходов не найдено" />
        )}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Предыдущая
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Следующая
        </button>
      </div>
    </IncomeListStyled>
  );
};

const IncomeListStyled = styled.div`
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    input {
      width: 300px;
      padding: 0.7rem;
      border-radius: 8px;
      border: 1px solid #ccc;
    }

    .sort-controls {
      display: flex;
      gap: 1rem;

      button {
        padding: 0.5rem 1rem;
        background: var(--color-accent);
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background: var(--color-green);
        }
      }
    }
  }

  .income-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

    button {
      padding: 0.5rem 1rem;
      background: var(--color-accent);
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background: var(--color-green);
      }

      &:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    }
  }
`;
