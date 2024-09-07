import { FC, useState } from "react";
import { useActions } from "../../hooks";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";
import { Button, Error, plus } from "../../ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

registerLocale("ru", ru);

const expenseSchema = yup.object().shape({
  title: yup
    .string()
    .required("Поле заголовка обязательно")
    .min(3, "Заголовок должен содержать не менее 3 символов")
    .max(50, "Заголовок не может превышать 50 символов"),
  amount: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value,
    )
    .typeError("Сумма должна быть числом")
    .required("Сумма обязательна для заполнения")
    .min(0.01, "Сумма должна быть больше 0"),
  category: yup
    .string()
    .required("Выберите категорию")
    .min(3, "Категория должна содержать не менее 3 символов")
    .max(32, "Категория не может превышать 32 символов"),
  description: yup
    .string()
    .required("Описание обязательно")
    .max(80, "Описание не может превышать 80 символов"),
  date: yup.date().required("Выберите дату").typeError("Неверный формат даты"),
});

interface ExpenseFormData {
  title: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
}

export const ExpenseForm: FC = () => {
  const { addExpense } = useActions();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: yupResolver(expenseSchema),
    defaultValues: {
      category: "education",
    },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await addExpense(data);
      reset();
    } catch (error: any) {
      setServerError(
        error.message || "Произошла ошибка при добавлении расхода.",
      );
    }
  };

  const handleChange = (field: keyof ExpenseFormData) => {
    clearErrors(field);
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <div className="input-control">
        <input
          type="text"
          placeholder="На что потратили?"
          {...register("title", { onChange: () => handleChange("title") })}
        />
        <p>{errors.title?.message}</p>
      </div>
      <div className="input-control">
        <input
          type="number"
          placeholder="Сумма расхода"
          {...register("amount", { onChange: () => handleChange("amount") })}
        />
        <p>{errors.amount?.message}</p>
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Введите дату"
          locale="ru"
          dateFormat="dd/MM/yyyy"
          selected={watch("date") || undefined}
          onChange={(date) => {
            setValue("date", date as Date, { shouldValidate: true });
            clearErrors("date");
          }}
        />
        <p>{errors.date?.message}</p>
      </div>
      <div className="selects input-control">
        <select
          {...register("category", {
            onChange: () => handleChange("category"),
          })}
          defaultValue=""
        >
          <option value="" disabled>
            Выберите категорию...
          </option>
          <option value="education">Обучение</option>
          <option value="groceries">Продукты</option>
          <option value="health">Здоровье</option>
          <option value="subscriptions">Подписки</option>
          <option value="takeaways">Доставка еды</option>
          <option value="clothing">Одежда</option>
          <option value="travelling">Путешествия</option>
          <option value="other">Другое</option>
        </select>
        <p>{errors.category?.message}</p>
      </div>
      <div className="input-control">
        <textarea
          placeholder="Добавьте описание..."
          {...register("description", {
            onChange: () => handleChange("description"),
          })}
        />
        <p>{errors.description?.message}</p>
      </div>
      <div className="submit-btn">
        <Button
          name="Добавить расход"
          icon={plus}
          $bPad="0.8rem 1.6rem"
          $bRad="30px"
          $bg="var(--color-accent)"
          $color="#fff"
        />
      </div>
      <Error message={serverError} />
    </FormStyled>
  );
};

const FormStyled = styled.form`
  margin-top: 12px;
  display: flex;
  width: 350px;
  flex-direction: column;
  gap: 1rem;

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

  p {
    color: var(--color-red);
    font-size: 0.8rem;
    margin-top: 0.25rem;
    min-height: 1.2rem;
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
      font-size: 0.8rem;
      box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
