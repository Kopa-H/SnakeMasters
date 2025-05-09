import { useState, useEffect } from "react";

// Tipado para las posiciones de los mensajes
interface ElementPosition {
  id: number;
  top: string;
  left: string;
}

interface ShowTextAnimationProps {
  content: string; // Cadena de texto a mostrar en posiciones aleatorias
  frequency?: number; // Número de mensajes a mostrar, valor por defecto es 5
  duration?: number; // Duración de la animación en milisegundos, valor por defecto es 5000ms (5 segundos)
  size?: string; // Tamaño del texto, valor por defecto es 2.5rem
  color?: string; // Color del texto, valor por defecto es "gold"
}

// Función para generar nuevas posiciones aleatorias
const generateRandomPositions = (frequency: number) => {
  const newPositions: ElementPosition[] = [];
  const screenWidth = window.innerWidth; // Ancho de la pantalla
  const screenHeight = window.innerHeight; // Alto de la pantalla

  for (let i = 0; i < frequency; i++) {
    // Calculamos las posiciones asegurándonos de que los mensajes no se salgan de la pantalla
    newPositions.push({
      id: i,
      top: `${Math.random() * (screenHeight - 100)}px`, // Posición aleatoria vertical, ajustada al tamaño de la pantalla
      left: `${Math.random() * (screenWidth - 200)}px`, // Posición aleatoria horizontal, ajustada al tamaño de la pantalla
    });
  }

  return newPositions;
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ShowTextAnimation: React.FC<ShowTextAnimationProps> = ({
  content,
  frequency = 5, // Número de mensajes que se mostrarán, con un valor por defecto
  duration = 5000, // Duración de la animación, valor por defecto es 5000ms
  size = "2.5rem", // Tamaño del texto, valor por defecto es
  color = "gold", // Color del texto, valor por defecto es "gold"
}) => {
  const [contentPositions, setContentPositions] = useState<ElementPosition[]>(
    []
  );

  useEffect(() => {
    // Solo ejecutar el efecto si content no está vacío
    if (!content) return;

    // Mostrar posiciones inmediatamente al montar el componente
    const newPositions = generateRandomPositions(frequency);
    setContentPositions(newPositions);

    // Actualizar las posiciones aleatorias en un intervalo
    const intervalId = setInterval(() => {
      const newPositions = generateRandomPositions(frequency);
      setContentPositions(newPositions);
    }, 1000); // Actualizar cada segundo

    // Limpiar después de la duración especificada
    const cleanupTimeout = setTimeout(() => {
      clearInterval(intervalId);
      setContentPositions([]); // Borrar las posiciones cuando termine la animación
    }, duration);

    // Limpiar intervalos y efectos secundarios al desmontar el componente
    return () => {
      clearInterval(intervalId);
      clearTimeout(cleanupTimeout);
    };
  }, [content, frequency, duration]);

  return (
    <div>
      {/* Mostrar los mensajes en posiciones aleatorias */}
      {contentPositions.map((position) => (
        <div
          key={position.id}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            fontSize: size,
            color: "gold",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            textShadow:
              "0 0 10px rgba(255, 0, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.7), 0 0 30px rgba(255, 0, 0, 0.7)",
            padding: "5px",
            backgroundColor: hexToRgba(color, 0.7),
            borderRadius: "10px",
            zIndex: 9999,
            animation: "fall 1s ease-in-out",
          }}
        >
          {content}
        </div>
      ))}
    </div>
  );
};

export default ShowTextAnimation;
