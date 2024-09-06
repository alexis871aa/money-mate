import { FC, ReactNode, useState } from "react";
import moment from "moment";
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
  StatusDisplay,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from "../../ui";
import styled from "styled-components";

interface TransactionItemProps {
  id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  date: Date | null;
  deleteItem: (id: string) => any;
  type: "income" | "expense";
  $indicatorColor: string;
}

export const TransactionItem: FC<TransactionItemProps> = ({
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
  const [showStatus, setShowStatus] = useState(false);

  const getCategoryIcon = () => {
    const icons: Record<string, ReactNode> = {
      salary: money,
      freelancing: freelance,
      investments: stocks,
      stocks: users,
      bitcoin: bitcoin,
      bank: card,
      youtube: yt,
      other: piggy,
      education: book,
      groceries: food,
      health: medical,
      subscriptions: tv,
      takeaways: takeaway,
      clothing: clothing,
      travelling: freelance,
      default: circle,
    };

    return icons[category] || icons.default;
  };

  const handleDelete = async () => {
    await deleteItem(id);
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  const indicatorColor = type === "expense" ? "red" : $indicatorColor;

  return (
    <TransactionItemStyled $indicator={indicatorColor}>
      {showStatus && (
        <StatusDisplay
          type="success"
          message={
            type === "expense"
              ? `Расход успешно удален!`
              : "Доход успешно удален!"
          }
        />
      )}
      <div className="icon">{getCategoryIcon()}</div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {ruble} {amount}
            </p>
            <p>
              {calendar} {moment(date).format("DD.MM.YYYY")}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
          <div className="btn-con">
            <Button
              icon={trash}
              $bPad={"1rem"}
              $bRad={"50%"}
              $bg={"var(--primary-color)"}
              $color={"#fff"}
              $iColor={"#fff"}
              $hColor={"var(--color-green)"}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </TransactionItemStyled>
  );
};

interface TransactionItemStyledProps {
  $indicator: string;
}

const TransactionItemStyled = styled.div<TransactionItemStyledProps>`
  margin-top: 20px;
  background: #fcf6f9;
  border: 2px solid #ffffff;
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
    border: 2px solid #ffffff;

    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

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
