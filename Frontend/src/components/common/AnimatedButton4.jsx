import React from 'react';
import styled from 'styled-components';
import { PiUploadBold } from "react-icons/pi";
const AnimatedButton4 = (props) => {
  return (
    <StyledWrapper>
      <button>
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
          <PiUploadBold className=' text-2xl' />
          </div>
        </div>
        <span>{props.text}</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 20px;
    // background: bg-cyan-900;
    color: cyan;
    padding: 0.7em 1em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button:hover .svg-wrapper {
    animation: fly-1 0.5s ease-in-out infinite alternate;
  }

  button:hover svg {
    transform: translateX(1.4em)   scale(1.1);
    
  }

  button:hover span {
    transform: translateX(5em);
  }

  button:active {
    transform: scale(0.95);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.2em);
    }

    to {
      transform: translateY(-0.2em);
    }
  }`;

export default AnimatedButton4;
