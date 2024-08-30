import { FC, ReactNode } from "react";
import {
  bitcoin,
  book,
  Button,
  calendar,
  card,
  circle,
  clothing,
  comment,
  food,
  freelance,
  medical,
  money,
  piggy,
  ruble,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from "../../../ui";
import styled from "styled-components";

interface IncomeItemProps {
  id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  deleteItem: ReactNode;
  type: string;
  $indicatorColor: string;
}

export const IncomeItem: FC<IncomeItemProps> = ({
  id,
  title,
  amount,
  category,
  description,
  date,
  deleteItem,
  type,
  $indicatorColor,
}) => {
  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };

  return (
    <IncomeItemStyled $indicator={$indicatorColor}>
      <div className="icon"></div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {ruble} {amount}
            </p>
            <p>
              {calendar} {date.toLocaleDateString()}
            </p>
            <p>
              {comment} {description}
            </p>
          </div>
          <div className="btn-container">
            <Button
              icon={trash}
              $bPad="1rem"
              $bRad="50px"
              $bg="var(--primary-color)"
              $color="#fff"
              $iColor={"#fff"}
              $hColor={"var(--color-green)"}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
};

interface IncomeItemStyledProps {
  $indicator: string;
}

const IncomeItemStyled = styled.div<IncomeItemStyledProps>`
  background: #fcf6f9;
  border: 2px solid #fff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;

  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${({ $indicator }) => $indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;

        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;
