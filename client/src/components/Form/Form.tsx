import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useActions } from "../../hooks";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";
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
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <option value="investiments">Инвестиции</option>
          <option value="stocks">Акции</option>
          <option value="bitcoin">Биткойн</option>
          <option value="bank">Банковский перевод</option>
          <option value="youtube">Youtube</option>
          <option value="other">Другое</option>
        </select>
      </div>
      <div className="input-control">
        <input
          type="text"
          value={incomeDate.description}
          name="description"
          placeholder="Комментарии..."
          onChange={handleChange}
        />
      </div>
      <div className="submit-btn">
        <button>Добавить доход</button>
      </div>
    </FormStyled>
  );
};

const FormStyled = styled.form``;
