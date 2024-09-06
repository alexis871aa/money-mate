import { FC } from "react";
import { useWindowSize } from "../../hooks";
import styled, { keyframes } from "styled-components";

export const Orb: FC = () => {
  const { width, height } = useWindowSize();

  return <OrbStyled width={width} height={height}></OrbStyled>;
};

const moveOrb = (width: number, height: number) => keyframes`
    0% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(${width / 1.2}px, ${height / 2}px);
    }
    100% {
        transform: translate(0, 0);
    }
`;

interface OrbStyledProps {
  width: number;
  height: number;
}

const OrbStyled = styled.div<OrbStyledProps>`
  width: 70vh;
  height: 70vh;
  position: absolute;
  border-radius: 50%;
  margin: -37vh 0 0 -37vh;
  background: linear-gradient(180deg, #f56692 0%, #f2994a 100%);
  filter: blur(400px);
  animation: ${({ width, height }) => moveOrb(width, height)} 15s alternate
    linear infinite;
  pointer-events: none;
  z-index: 0;
`;
