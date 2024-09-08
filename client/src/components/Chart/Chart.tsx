import { FC, useMemo } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TooltipItem,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useTypedSelector } from "../../hooks";
import { selectExpense, selectIncome } from "../../store/selectors";
import styled from "styled-components";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
);

export const Chart: FC = () => {
  const { incomes } = useTypedSelector(selectIncome);
  const { expenses } = useTypedSelector(selectExpense);

  const data = useMemo(() => {
    return {
      labels: incomes.map((inc) => {
        const { date } = inc;
        return moment(date).format("DD/MM/YYYY");
      }),
      datasets: [
        {
          label: "Доходы",
          data: incomes.map((income) => income.amount),
          backgroundColor: "rgba(75, 192, 192, 0.4)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Расходы",
          data: expenses.map((expense) => expense.amount),
          backgroundColor: "rgba(255, 99, 132, 0.4)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [incomes, expenses]);

  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: TooltipItem<"line">) => {
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw} руб.`;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Дата",
            color: "#000",
            font: {
              size: 14,
            },
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
          },
        },
        y: {
          title: {
            display: true,
            text: "Сумма (руб.)",
            color: "#000",
            font: {
              size: 14,
            },
          },
          ticks: {
            callback: function (value: string | number) {
              if (typeof value === "number") {
                return `${value} руб.`;
              }
              return value;
            },
          },
        },
      },
    };
  }, []);

  return (
    <ChartStyled>
      <Line data={data} options={options} />
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;
