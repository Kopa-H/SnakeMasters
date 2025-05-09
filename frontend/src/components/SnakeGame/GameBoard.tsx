import React, { useState, useEffect, useCallback } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import screenConfig from "./Parameters/screen_info";
import { Fruit } from "./interfaces/fruit";
import "./styles/gameBoard.css";

interface Props {
  snake: { x: number; y: number; color: string }[];
  fruits: Fruit[];
  numberOfRows?: number;
  numberOfColumns?: number;
  activeSkin?: string;
}

const GameBoard = ({ snake, fruits, activeSkin }: Props) => {
  const [cellSize, setCellSize] = useState(screenConfig.defaultCellSize);

  useEffect(() => {
    const handleResize = () => {
      const gameScreen = document.querySelector(".game-screen");

      if (gameScreen instanceof HTMLElement) {
        const screenWidth = gameScreen.offsetWidth - 40;
        const screenHeight = gameScreen.offsetHeight - 30;

        // Calcula el tamaño necesario para las celdas basándose en las dimensiones actuales
        const minWidthRequired = screenConfig.columns * cellSize;
        const minHeightRequired = screenConfig.rows * cellSize;

        // Lógica para ajustar el tamaño de las celdas
        if (
          screenWidth < minWidthRequired ||
          screenHeight < minHeightRequired
        ) {
          // Reducir el tamaño de las celdas si es necesario, pero sin bajar del mínimo
          setCellSize((prevCellSize) =>
            Math.max(prevCellSize * 0.9, screenConfig.minCellSize)
          );
        } else if (
          screenWidth > minWidthRequired + 100 &&
          screenHeight > minHeightRequired + 100
        ) {
          // Aumentar el tamaño de las celdas si hay espacio extra, pero sin superar el máximo
          setCellSize((prevCellSize) =>
            Math.min(prevCellSize * 1.1, screenConfig.maxCellSize)
          );
        }
      }
    };

    // Llamar la primera vez para ajustar el tamaño inicial
    handleResize();

    // Escuchar cambios de tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cellSize]);

  const Cell = useCallback(
    ({
      columnIndex,
      rowIndex,
      style,
    }: {
      columnIndex: number;
      rowIndex: number;
      style: React.CSSProperties;
    }) => {
      const isSnakeSegment = snake.some(
        (segment) => segment.x === columnIndex && segment.y === rowIndex
      );

      const fruitInCell = fruits.find(
        (fruit) => fruit.x === columnIndex && fruit.y === rowIndex
      );

      const segmentColor = snake.find(
        (segment) => segment.x === columnIndex && segment.y === rowIndex
      )?.color;

      let snakeHead = null;
      if (columnIndex === snake[0].x && rowIndex === snake[0].y) {
        snakeHead = <div className="snake-head">{activeSkin}</div>;
      }
      const fruitCell = (
        <div className="fruit-cell">{fruitInCell?.color.emoji}</div>
      );

      return (
        <div
          className="cell"
          style={{
            ...style,
            backgroundColor: isSnakeSegment
              ? segmentColor
              : fruitInCell
              ? fruitInCell.color.colorHex
              : (columnIndex + rowIndex) % 2 === 0
              ? "#FFE4C4"
              : "#D2B48C",
            borderColor: fruitInCell
              ? "#FFA07A"
              : isSnakeSegment
              ? "blue"
              : "black",
          }}
        >
          {fruitInCell ? fruitCell : snakeHead}
        </div>
      );
    },
    [snake, fruits, activeSkin]
  );

  const numberOfRows = screenConfig.rows;
  const numberOfColumns = screenConfig.columns;

  return (
    <div className="game-board-container">
      <Grid
        className="game-board"
        width={numberOfColumns * cellSize}
        height={numberOfRows * cellSize}
        rowCount={numberOfRows}
        rowHeight={cellSize}
        columnCount={numberOfColumns}
        columnWidth={cellSize}
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default GameBoard;
