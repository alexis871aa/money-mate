import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useActions } from "../../hooks";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";
import { Button, plus } from "../../ui";
import styled from "styled-components";

registerLocale("ru", ru);

interface IIncomeData {
  title: string;
  amount: number;
  category: string;
  description: string;
  date: Date | null;
}

export const Form: FC = () => {
  const { addIncome } = useActions();
  const [incomeDate, setIncomeDate] = useState<IIncomeData>({
    title: "",
    amount: 0,
    category: "",
    description: "",
    date: null,
  });

  const handleChange = ({
    target,
  }: ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >) => {
    setIncomeDate((prevState: IIncomeData) => {
      return {
        ...prevState,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addIncome(incomeDate);
    setIncomeDate({
      title: "",
      amount: 0,
      category: "",
      description: "",
      date: null,
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          type="text"
          value={incomeDate.title}
          name="title"
          placeholder="Источник дохода"
          onChange={handleChange}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          value={incomeDate.amount === 0 ? "" : incomeDate.amount}
          name="amount"
          placeholder="Сумма дохода"
          onChange={handleChange}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Введите дату"
          selected={incomeDate.date}
          dateFormat="dd/MM/yyyy"
          locale="ru"
          onChange={(date) =>
            setIncomeDate((prevState) => {
              return { ...prevState, date: date || prevState.date };
            })
          }
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={incomeDate.category}
          name="category"
          id="category"
          onChange={handleChange}
        >
          <option value="" disabled>
            Выберите категорию...
          </option>
          <option value="salary">Зарплата</option>
          <option value="freelancing">Подработка</option>
          <option value="investments">Инвестиции</option>
          <option value="stocks">Акции</option>
          <option value="bitcoin">Биткойн</option>
          <option value="bank">Банковский перевод</option>
          <option value="youtube">Youtube</option>
          <option value="other">Другое</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={incomeDate.description}
          placeholder="Добавьте описание..."
          id="description"
          cols={30}
          rows={4}
          onChange={handleChange}
        />
      </div>
      <div className="submit-btn">
        <Button
          name="Добавить доход"
          icon={plus}
          onClick={() => {}}
          $bPad="0.8rem 1.6rem"
          $bRad="30px"
          $bg="var(--color-accent)"
          $color="#fff"
        />
      </div>
    </FormStyled>
  );
};

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);

    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }

  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;

    select {
      color: rgba(34, 34, 96, 0.4);

      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);

      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
