import { FC } from "react";
import {
  DashboardIcon,
  ExpensesIcon,
  IconProps,
  TransactionsIcon,
  TrendIcon,
} from "../../../../ui";
import { useActions, useTypedSelector } from "../../../../hooks";
import { selectApp } from "../../../../store/selectors";
import styled from "styled-components";

interface MenuItems {
  id: number;
  title: string;
  icon: FC<IconProps>;
  link: string;
}

export const menuItems: MenuItems[] = [
  {
    id: 1,
    title: "Статистика",
    icon: DashboardIcon,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Операции",
    icon: TransactionsIcon,
    link: "/transactions",
  },
  {
    id: 3,
    title: "Доходы",
    icon: TrendIcon,
    link: "/incomes",
  },
  {
    id: 4,
    title: "Расходы",
    icon: ExpensesIcon,
    link: "/expenses",
  },
];

export const MenuItems: FC = () => {
  const { active } = useTypedSelector(selectApp);
  const { setActive } = useActions();

  return (
    <MenuItemsStyled>
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? "active" : ""}
          >
            <IconComponent />
            <span>{item.title}</span>
          </li>
        );
      })}
    </MenuItemsStyled>
  );
};

const MenuItemsStyled = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    display: grid;
    grid-template-columns: 40px auto;
    align-items: center;
    margin: 0.6rem 0;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    color: rgba(34, 34, 96, 0.6);
    padding-left: 1rem;
    position: relative;

    i {
      transition: all 0.4s ease-in-out;
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;

    i {
      color: rgba(34, 34, 96, 1) !important;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;
