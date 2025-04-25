const HeroTemplate = (portfolioId) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hero Section</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background-color: #121212;
      color: white;
    }

    .hero {
      display: flex;
      flex-wrap: wrap;
      margin-top: 2rem;
      width: 100%;
    }

    .hero-left {
      flex: 1;
      padding: 2rem;
    }

    .hero-left h1 {
      margin-bottom: 1rem;
    }

    .hero-left h1:nth-child(1) {
      font-size: 1rem;
    }

    .hero-left h1:nth-child(2) {
      font-size: 1.8rem;
    }

    .hero-left .typewriter {
      font-size: 1.2rem;
      color: cyan;
      white-space: nowrap;
      overflow: hidden;
      border-right: 2px solid cyan;
      width: 24ch;
      animation: typing 3s steps(24) infinite, blink 0.6s step-end infinite;
    }

    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 24ch;
      }
    }

    @keyframes blink {
      50% {
        border-color: transparent;
      }
    }

    .hero-left .social-icons {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .hero-left .social-icons a {
      font-size: 1.5rem;
      transition: transform 0.3s, border 0.3s;
    }

    .hero-left .social-icons a svg {
      width: 24px;
      height: 24px;
      fill: white;
      transition: transform 0.3s;
    }

    .hero-left .social-icons a:hover svg {
      transform: scale(1.2);
      fill: cyan;
    }

    .hero-left .buttons {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .hero-left .buttons button {
      border: 2px solid cyan;
      background-color: transparent;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background-color 0.3s;
    }

    .hero-left .buttons button:hover {
      background-color: cyan;
    }

    .hero-right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .hero-right img {
      width: 300px;
      height: 300px;
      border: 4px solid cyan;
      border-radius: 50%;
      box-shadow: 0 20px 50px rgba(8, 112, 184, 0.7);
      animation: move-up-down 2s infinite;
    }

    @keyframes move-up-down {
      0%, 100% {
        transform: translateY(-10px);
      }
      50% {
        transform: translateY(10px);
      }
    }

    hr {
      margin-top: 2rem;
      border: none;
      height: 1px;
      background: white;
    }
  </style>
</head>
<body>
  <div class="hero">
    <div class="hero-left">
      <h1>Hello It's me</h1>
      <h1>Harsh Kumar Vimal</h1>
      <div class="typewriter">MERN STACK DEVELOPER | CODER | UI/UX DESIGNER</div>
      <div class="social-icons">
        <a href="#" target="_blank">
         <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><path fill-rule="nonzero" d="M170.663 256.157c-.083-47.121 38.055-85.4 85.167-85.482 47.121-.092 85.407 38.029 85.499 85.159.091 47.13-38.047 85.4-85.176 85.492-47.112.09-85.399-38.039-85.49-85.169zm-46.108.092c.141 72.602 59.106 131.327 131.69 131.185 72.592-.14 131.35-59.089 131.209-131.691-.141-72.577-59.114-131.336-131.715-131.194-72.585.141-131.325 59.114-131.184 131.7zm237.104-137.092c.033 16.954 13.817 30.682 30.772 30.649 16.961-.034 30.689-13.811 30.664-30.765-.033-16.954-13.818-30.69-30.78-30.656-16.962.033-30.689 13.818-30.656 30.772zm-208.696 345.4c-24.958-1.086-38.511-5.234-47.543-8.709-11.961-4.628-20.496-10.177-29.479-19.093-8.966-8.951-14.532-17.461-19.202-29.397-3.508-9.033-7.73-22.569-8.9-47.527-1.269-26.983-1.559-35.078-1.683-103.433-.133-68.338.116-76.434 1.294-103.441 1.069-24.941 5.242-38.512 8.709-47.536 4.628-11.977 10.161-20.496 19.094-29.478 8.949-8.983 17.459-14.532 29.403-19.202 9.025-3.526 22.561-7.715 47.511-8.9 26.998-1.278 35.085-1.551 103.423-1.684 68.353-.133 76.448.108 103.456 1.294 24.94 1.086 38.51 5.217 47.527 8.709 11.968 4.628 20.503 10.145 29.478 19.094 8.974 8.95 14.54 17.443 19.21 29.413 3.524 8.999 7.714 22.552 8.892 47.494 1.285 26.998 1.576 35.094 1.7 103.432.132 68.355-.117 76.451-1.302 103.442-1.087 24.957-5.226 38.52-8.709 47.56-4.629 11.953-10.161 20.488-19.103 29.471-8.941 8.949-17.451 14.531-29.403 19.201-9.009 3.517-22.561 7.714-47.494 8.9-26.998 1.269-35.086 1.56-103.448 1.684-68.338.133-76.424-.124-103.431-1.294zM149.977 1.773c-27.239 1.286-45.843 5.648-62.101 12.019-16.829 6.561-31.095 15.353-45.286 29.603C28.381 57.653 19.655 71.944 13.144 88.79c-6.303 16.299-10.575 34.912-11.778 62.168C.172 178.264-.102 186.973.031 256.489c.133 69.508.439 78.234 1.741 105.548 1.302 27.231 5.649 45.827 12.019 62.092 6.569 16.83 15.353 31.089 29.611 45.289 14.25 14.2 28.55 22.918 45.404 29.438 16.282 6.294 34.902 10.583 62.15 11.777 27.305 1.203 36.022 1.468 105.521 1.336 69.532-.133 78.25-.44 105.555-1.734 27.239-1.302 45.826-5.664 62.1-12.019 16.829-6.585 31.095-15.353 45.288-29.611 14.191-14.251 22.917-28.55 29.428-45.404 6.304-16.282 10.592-34.904 11.777-62.134 1.195-27.323 1.478-36.049 1.344-105.557-.133-69.516-.447-78.225-1.741-105.522-1.294-27.256-5.657-45.844-12.019-62.118-6.577-16.829-15.352-31.08-29.602-45.288-14.25-14.192-28.55-22.935-45.404-29.429-16.29-6.304-34.903-10.6-62.15-11.778C333.747.164 325.03-.101 255.506.031c-69.507.133-78.224.431-105.529 1.742z"/></svg>
        </a>
        <a href="#" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 4.56c-.88.4-1.83.67-2.82.8a4.9 4.9 0 0 0 2.14-2.7 9.79 9.79 0 0 1-3.12 1.2 4.92 4.92 0 0 0-8.38 4.5 13.94 13.94 0 0 1-10.12-5.14 4.88 4.88 0 0 0 1.52 6.56c-.8 0-1.56-.24-2.24-.6v.06c0 2.44 1.74 4.44 4.02 4.92a4.92 4.92 0 0 1-2.22.08c.6 1.8 2.32 3.12 4.34 3.16A9.87 9.87 0 0 1 0 20.38a13.89 13.89 0 0 0 7.56 2.2c9.06 0 14.02-7.52 14.02-14.02 0-.2 0-.4-.02-.6a10.01 10.01 0 0 0 2.44-2.54z"/></svg>
        </a>
        <a href="#" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.79 0 0 .8 0 1.78v20.45C0 23.2.79 24 1.77 24h20.45c.99 0 1.78-.8 1.78-1.78V1.78C24 .79 23.2 0 22.23 0zM7.2 20.5H3.55V9h3.65v11.5zm-1.83-12.95c-1.17 0-1.96-.8-1.96-1.8 0-1.02.8-1.8 2-1.8s1.96.78 1.96 1.8c0 1-.8 1.8-2 1.8zm15.13 12.95h-3.65v-5.8c0-1.45-.54-2.43-1.86-2.43-.98 0-1.56.66-1.81 1.3-.1.25-.13.6-.13.96v6h-3.66s.05-9.73 0-10.73h3.66v1.5c.48-.75 1.3-1.8 3.16-1.8 2.3 0 4.04 1.5 4.04 4.73v6.3z"/></svg>
        </a>
      </div>
    </div>
    <div class="hero-right">
      <img src="https://via.placeholder.com/300" alt="Profile Image">
    </div>
  </div>
</body>
</html>

`;
};
module.exports = HeroTemplate;
