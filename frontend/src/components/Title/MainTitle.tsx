import { useNavigate, useLocation } from "react-router-dom";
import "./MainTitle.css";

const letter_colors = [
  "#6495ED", // cornflowerblue
  "#FFA500", // orange
  "#76E600", // chartreuse
  "#FF69B4", // hotpink
  "#FF8C00", // darkorange
  "#48D1CC", // mediumturquoise
  "#DC143C", // crimson
];
const title1 = "SNAKE";
const title2 = "MASTERS";

interface Props {
  className?: string;
  rotate?: boolean;
  centerInX?: boolean;
  fontSize?: string;
  onClick?: () => void;
}

function MainTitle({ className, rotate, onClick }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/home" || location.pathname === "/") {
      window.location.reload();
      return;
    }

    navigate("/home");
    onClick && onClick();
  };

  let containerClass = "main-title";
  if (className) {
    containerClass = `${className} ${containerClass}`;
  }

  return (
    <div className={containerClass} onClick={handleClick}>
      {/* LETRAS INDIVIDUALES PARA SNAKE */}
      {title1.split("").map((letter, index) => (
        <h1
          key={`snake-${index}`}
          style={{
            color: letter_colors[index % letter_colors.length],
            transform: rotate
              ? `rotate(${index % 2 === 0 ? 10 : -10}deg)`
              : "none",
            marginTop: index % 3 === 0 ? "2%" : "0px",
          }}
        >
          {letter}
        </h1>
      ))}
      <br />
      {/* LETRAS INDIVIDUALES PARA MASTERS */}
      {title2.split("").map((letter, index) => (
        <h1
          key={`masters-${index}`}
          style={{
            color: letter_colors[index % letter_colors.length],
            transform: rotate
              ? `rotate(${index % 2 === 0 ? 10 : -10}deg)`
              : "none",
            marginTop: index % 3 === 0 ? "2%" : "0px",
          }}
        >
          {letter}
        </h1>
      ))}
    </div>
  );
}

export default MainTitle;
