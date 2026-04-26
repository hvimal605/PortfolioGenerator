import React from 'react';
import styled from 'styled-components';

const AnimatedButton2 = ({ text }) => {
  return (
    <StyledWrapper>
      <button className="super-premium-btn">
        <div className="btn-bg" />
        <div className="btn-liquid" />
        <div className="btn-scanning-line" />
        <div className="btn-border-glow" />
        <span className="btn-content">
          <span className="icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          {text}
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  
  .super-premium-btn {
    position: relative;
    width: 100%;
    padding: 14px 24px;
    background: #09090b;
    border-radius: 100px;
    cursor: pointer;
    border: none;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-bg {
    position: absolute;
    inset: 1px;
    background: #09090b;
    border-radius: 100px;
    z-index: 1;
  }

  .btn-liquid {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      #4f46e5,
      #818cf8,
      #c084fc,
      #e879f9
    );
    filter: blur(40px);
    opacity: 0.15;
    transition: all 0.6s ease;
    z-index: 0;
    animation: rotateLiquid 10s linear infinite;
  }

  .btn-content {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    transition: all 0.5s ease;
  }

  .icon-wrap {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #818cf8;
    transition: all 0.5s ease;
  }

  .btn-border-glow {
    position: absolute;
    inset: 0;
    padding: 1.2px;
    background: linear-gradient(
      to right,
      rgba(129, 140, 248, 0.4),
      rgba(192, 132, 252, 0.4)
    );
    border-radius: 100px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: 2;
    transition: all 0.5s ease;
  }

  .btn-scanning-line {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(129, 140, 248, 0.2),
      transparent
    );
    z-index: 5;
    transition: all 0.8s ease;
  }

  /* Hover Effects */
  .super-premium-btn:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 40px -10px rgba(79, 70, 229, 0.4);
  }

  .super-premium-btn:hover .btn-liquid {
    opacity: 0.5;
    filter: blur(30px);
  }

  .super-premium-btn:hover .btn-content {
    color: #fff;
    letter-spacing: 0.25em;
  }

  .super-premium-btn:hover .icon-wrap {
    transform: translateX(5px) scale(1.1);
    color: #fff;
  }

  .super-premium-btn:hover .btn-border-glow {
    background: linear-gradient(
      to right,
      #818cf8,
      #c084fc
    );
    padding: 2px;
  }

  .super-premium-btn:hover .btn-scanning-line {
    left: 100%;
    transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .super-premium-btn:active {
    transform: scale(0.95);
  }

  @keyframes rotateLiquid {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export default AnimatedButton2;
