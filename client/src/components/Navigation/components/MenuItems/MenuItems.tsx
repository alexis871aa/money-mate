import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { dashboard, expenses, transactions, trend } from "../../../../ui";

interface MenuItem {
  id: number;
  title: string;
  icon: ReactNode;
  link: string;
}

const menuItems: MenuItem[] = [
  { id: 1, title: "Статистика", icon: dashboard, link: "/" },
  { id: 2, title: "Операции", icon: transactions, link: "/transactions" },
  { id: 3, title: "Доходы", icon: trend, link: "/incomes" },
  { id: 4, title: "Расходы", icon: expenses, link: "/expenses" },
];

export const MenuItems: FC = () => {
  return (
    <MenuItemsStyled>
      {menuItems.map((item) => (
        <li key={item.id}>
          <NavLink
            to={item.link}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        </li>
      ))}
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
    height: 50px;
    margin: 0.6rem 0;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    padding-left: 1rem;
    position: relative;

    a {
      color: rgba(34, 34, 96, 0.6);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      height: 100%;
      justify-content: flex-start;

      span {
        font-size: 1.2em;
      }
    }

    .active {
      color: rgba(34, 34, 96, 1) !important;

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
  }
`;
