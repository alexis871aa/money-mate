import { FC } from "react";
import avatar from "../../../../assets/avatar.png";
import styled from "styled-components";

export const MenuUser: FC = () => {
  return (
    <>
      <MenuUserStyled>
        <div className="user">
          <img src={avatar} alt="my-avatar" />
          <div className="text">
            <h2>Алексей</h2>
            <p>Ваш кошелёк</p>
          </div>
        </div>
      </MenuUserStyled>
    </>
  );
};

const MenuUserStyled = styled.div`
  .user {
    display: flex;
    height: 100px;
    gap: 1rem;
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
    padding: 0.1rem;
    box-shadow: 0 1px 17px rgba(0, 0, 0, 0.06);
  }

  h2 {
    color: rgba(34, 34, 96, 1);
  }

  p {
    color: rgba(34, 34, 96, 0.6);
  }
`;
