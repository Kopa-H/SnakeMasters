import { useEffect, useCallback, useState } from "react";

interface DirectionMap {
  [key: string]: string;
}

const manageDirectionInputs = (
  direction: string,
  directionButtonPressed: string,
  setDirectionButtonPressed: (direction: string) => void,
  hasMoved: boolean,
  setDirection: (direction: string) => void,
  setHasMoved: (hasMoved: boolean) => void,
  invertedControlls: boolean,
) => {
  const [inputBuffer, setInputBuffer] = useState<string[]>([]); // Buffer de inputs
  const [inputToAdd, setInputToAdd] = useState<string | null>(null); // Input a añadir al buffer

  const invertedDirection: DirectionMap = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT",
  };

  const moveDirection = useCallback(
    (newDirection: string) => {
      if (invertedControlls) {
        newDirection = invertedDirection[newDirection];
      }
      // Si no hemos movido y la dirección es válida, se realiza el movimiento
      if (!hasMoved && newDirection !== direction && newDirection !== invertedDirection[direction]) {
        setDirection(newDirection);
        setHasMoved(true);
      }
    },
    [invertedControlls, hasMoved, direction, setDirection, setHasMoved]
  );

  // Esta función procesa el primer input en el buffer y lo elimina de la cola
  useEffect(() => {
    // Si en este frame ya se ha realizado el movimiento, NO se procesa el siguiente input
    if (hasMoved) {
      return;
    }

    // Resolver saturación del buffer
    if (inputBuffer.length > 2) {
      setInputBuffer((prev) => prev.slice(0,1)); // Limpiamos el buffer
      return;
    }

    if (inputBuffer.length > 0) {
      const nextInput = inputBuffer[0];
      moveDirection(nextInput); // Procesa el siguiente input
      setInputBuffer((prev) => prev.slice(1)); // Elimina el input procesado del buffer
    }

  }, [inputBuffer, moveDirection]);

  // Gestionar la admision de nuevos inputs al buffer
  useEffect(() => {
    if (inputToAdd === null || inputBuffer.length >= 2) {
      return;
    }

    // Si la dirección es válida, se añade el movimiento al buffer
    if (inputToAdd !== direction && inputToAdd !== invertedDirection[direction]) {
      if (inputToAdd !== inputBuffer[0] && inputToAdd !== invertedDirection[inputBuffer[0]]) {
        setInputBuffer((prev) => [...prev, inputToAdd]); // Añadimos la dirección al buffer
      }
    }
  }, [inputToAdd]);

  // GESTIÓN DE LA DIRECCIÓN POR BOTONES INCRUSTADOS EN PANTALLA (gestionada en otro componente)
  useEffect(() => {
    if (directionButtonPressed) {
      setInputToAdd(directionButtonPressed);
      setDirectionButtonPressed(""); // Resetea el estado de input
    }
  }, [directionButtonPressed, setDirectionButtonPressed]);

  // GESTIÓN DE LA DIRECCIÓN POR TECLADO O DESPLAZAMIENTO TÁCTIL
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let newDirection: string | null = null;
      switch (event.key) {
        case "ArrowUp":
        case "w":
          newDirection = "UP";
          break;
        case "ArrowDown":
        case "s":
          newDirection = "DOWN";
          break;
        case "ArrowLeft":
        case "a":
          newDirection = "LEFT";
          break;
        case "ArrowRight":
        case "d":
          newDirection = "RIGHT";
          break;
        default:
          break;
      }

      if (newDirection) {
        setInputToAdd(newDirection);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const startX = event.touches[0].clientX;
      const startY = event.touches[0].clientY;

      const handleTouchMove = (moveEvent: TouchEvent) => {
        const moveX = moveEvent.touches[0].clientX;
        const moveY = moveEvent.touches[0].clientY;

        const deltaX = moveX - startX;
        const deltaY = moveY - startY;

        const direction =
          Math.abs(deltaX) > Math.abs(deltaY)
            ? deltaX > 0
              ? "RIGHT"
              : "LEFT"
            : deltaY > 0
            ? "DOWN"
            : "UP";

        setInputToAdd(direction);
      };

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return null;
};

export default manageDirectionInputs;
