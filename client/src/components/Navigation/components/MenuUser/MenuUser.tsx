import { FC } from "react";
import avatar from "../../../../assets/avatar.png";
import styled from "styled-components";
import { useTypedSelector } from "../../../../hooks";
import { selectUser } from "../../../../store/selectors";
import { getUsername } from "../../../../helpers";

export const MenuUser: FC = () => {
  const { user } = useTypedSelector(selectUser);
  const { email, isActivated } = user;

  return (
    <>
      <MenuUserStyled>
        <div className="user">
          <img src={avatar} alt="my-avatar" />
          <div className="text">
            <h2>{getUsername(email)}</h2>
            <div>
              <IndicatorStyled
                $isActivated={isActivated}
                children={isActivated ? "активирован" : "не активирован"}
              />
            </div>
          </div>
        </div>
      </MenuUserStyled>
    </>
  );
};

const MenuUserStyled = styled.div`
  .user {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }
`;

interface IndicatorProps {
  $isActivated: boolean;
}

const IndicatorStyled = styled.h5<IndicatorProps>`
  font-size: 1rem;
  padding-left: 1rem;
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
    background: ${({ $isActivated }) =>
      $isActivated ? "var(--color-green)" : "red"};
  }
`;
