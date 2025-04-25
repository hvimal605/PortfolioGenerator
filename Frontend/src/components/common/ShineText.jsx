import React from 'react';
import styled from 'styled-components';

const ShineText = (props) => {
  return (
    <StyledText>
      {props.text}
    </StyledText>
  );
}

const StyledText = styled.span`
  display: inline-block;
  padding: 1px 4px;
  color: #fff;
  background: linear-gradient(to right, #9f9f9f 0, #fff 10%, #868686 20%);
  background-position: 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s infinite linear;
  font-weight: 800;
  font-size: 60px;
  text-decoration: none;
  white-space: nowrap;
  font-family: "Poppins", sans-serif;

  @keyframes shine {
    0% {
      background-position: 0;
    }
    60% {
      background-position: 180px;
    }
    100% {
      background-position: 280px;
    }
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    font-size: 50px; /* Smaller font size for tablets and phones */
  }

  @media (max-width: 480px) {
    font-size: 36px; /* Even smaller font size for smaller phones */
  }
`;

export default ShineText;
