import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";
import { Button, cancel, Error, ok, StatusDisplay } from "../../ui";
import { IncomeService } from "../../services";
import { InnerLayout } from "../../styles/Layouts";
import styled from "styled-components";

registerLocale("ru", ru);

const incomeSchema = yup.object().shape({
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
  date: yup
    .date()
    .required("Выберите дату")
    .nullable()
    .typeError("Неверный формат даты"),
});

interface IncomeEditFormData {
  title: string;
  amount: number;
  category: string;
  description: string;
  date: Date | null;
}

export const IncomeEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<IncomeEditFormData>({
    resolver: yupResolver(incomeSchema),
    defaultValues: {
      category: "salary",
    },
  });

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await IncomeService.getIncomeById(id!);
        const income = response.data;

        setValue("title", income.title);
        setValue("amount", income.amount);
        setValue("category", income.category);
        setValue("description", income.description);
        setValue("date", income.date ? new Date(income.date) : null);
      } catch (error: any) {
        setServerError(error.message || "Ошибка при загрузке дохода.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, [id, setValue]);

  const onSubmit = async (data: IncomeEditFormData) => {
    try {
      await IncomeService.updateIncome({ ...data, id: id! });
      navigate("/incomes");
    } catch (error: any) {
      setServerError(
        error.message || "Произошла ошибка при обновлении дохода.",
      );
    }
  };

  const handleCancel = () => {
    navigate("/incomes");
  };

  const handleChange = (field: keyof IncomeEditFormData) => {
    clearErrors(field);
  };

  if (loading) {
    return (
      <InnerLayout>
        <StatusDisplay loading message="Идёт загрузка дохода..." />
      </InnerLayout>
    );
  }

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <InnerLayout>
        <div className="input-control">
          <input
            type="text"
            placeholder="Источник дохода"
            {...register("title", { onChange: () => handleChange("title") })}
          />
          <p>{errors.title?.message}</p>
        </div>
        <div className="input-control">
          <input
            type="number"
            placeholder="Сумма дохода"
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
          >
            <option value="salary">Зарплата</option>
            <option value="freelancing">Подработка</option>
            <option value="investments">Инвестиции</option>
            <option value="stocks">Акции</option>
            <option value="bitcoin">Биткойн</option>
            <option value="bank">Банковский перевод</option>
            <option value="youtube">YouTube</option>
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
            name="Отмена"
            icon={cancel}
            onClick={handleCancel}
            $bPad="0.8rem 1.6rem"
            $bRad="30px"
            $bg="var(--color-accent)"
            $color="#fff"
          />
          <Button
            name="Сохранить"
            icon={ok}
            $bPad="0.8rem 1.6rem"
            $bRad="30px"
            $bg="var(--color-accent)"
            $color="#fff"
          />
        </div>
        {serverError && <Error message={serverError} />}
      </InnerLayout>
    </FormStyled>
  );
};

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  width: 500px;
  gap: 2rem;

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    padding: 0.8rem 1rem;
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
    width: 100%;

    input {
      width: 100%;
    }
  }

  p {
    color: var(--color-red);
    font-size: 0.8rem;
    margin-top: 0.2rem;
    min-height: 1.2rem;
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;

    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    margin-top: 10px;
    display: flex;
    gap: 1.5rem;
    justify-content: space-between;

    button {
      font-size: 0.8rem;
      box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);

      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
