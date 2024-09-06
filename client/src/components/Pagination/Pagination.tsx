import { FC } from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <PaginationStyled>
      <button
        className="prev-btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="next-btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперед
      </button>
    </PaginationStyled>
  );
};

const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  .prev-btn,
  .next-btn,
  .page-btn {
    padding: 0.4rem 0.8rem;
    background-color: #fff;
    border: 2px solid var(--primary-color);
    border-radius: 8px;
    color: var(--primary-color);
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;

    &:hover {
      background-color: var(--primary-color);
      color: #fff;
    }

    &:disabled {
      background-color: #f0f0f0;
      color: #b0b0b0;
      cursor: not-allowed;
    }
  }

  .active {
    background-color: var(--primary-color);
    color: #fff;
  }
`;
