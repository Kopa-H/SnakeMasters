interface ChallengeInfo {
  id: number;
  name: string;
  grid: Cell[][];
  snakeStart: { x: number; y: number };
  initialLength: number;
  initialDirection: string;
  goal: { x: number; y: number };
  goldReward: number;
}

interface Cell {
  type: string;
  content: string;
}

// Función para convertir un grid legible en strings a un grid de objetos
function convertGrid(grid: string[]): Cell[][] {
  const symbolToCell: { [key: string]: Cell } = {
    "💀": { type: "wall", content: "💀" },
    "🟩": { type: "empty", content: "🟩" },
    "🔺": { type: "start", content: "🔺" },
    "📍": { type: "goal", content: "📍" },
    "🐆": { type: "obstacle", content: "🐆" },
    "🤪": { type: "crazy", content: "🤪" }
  };

  return grid.map(row => {
    const rowCells: Cell[] = [];
    // Recorremos la fila en saltos de 2 caracteres
    for (let i = 0; i < row.length; i += 2) {
      const emoji = row.slice(i, i + 2); // Tomamos dos caracteres adyacentes
      const cell = symbolToCell[emoji]; // Buscamos el emoji en el objeto
      if (cell) {
        rowCells.push(cell); // Si existe, lo añadimos al array de celdas
      }
    }
    return rowCells;
  });
}


const CHALLENGES: ChallengeInfo[] = [
  
  {
    id: 1,
    name: "Little Room",
    grid: convertGrid([
      "💀💀💀💀💀💀💀💀💀💀",
      "💀🔺🟩🟩🟩🟩🟩🟩🟩💀",
      "💀💀💀💀💀💀💀💀🟩💀",
      "💀🟩🟩🟩🟩🟩🟩🟩🟩💀",
      "💀🟩💀💀💀💀💀💀💀💀",
      "💀🟩💀💀💀💀💀💀💀💀",
      "💀🟩🟩🟩🟩🟩🟩🟩🟩💀",
      "💀💀💀💀💀💀💀💀🟩💀",
      "💀📍🟩🟩🟩🟩🟩🟩🟩💀",
      "💀💀💀💀💀💀💀💀💀💀"
    ]),
    snakeStart: { x: 1, y: 1 },
    initialDirection: "right",
    initialLength: 2,
    goal: { x: 5, y: 2 },
    goldReward: 50
  },
  {
    id: 2,
    name: "Fast Room",
    grid: convertGrid([
      "💀💀💀💀💀💀💀💀💀💀",
      "💀🔺🟩🟩🟩🟩🟩🟩🟩💀",
      "💀💀💀💀💀💀💀💀🟩💀",
      "💀🟩🟩🟩🟩🐆🟩🟩🟩💀",
      "💀🟩💀💀💀💀💀💀💀💀",
      "💀🟩💀💀💀💀💀💀💀💀",
      "💀🟩🟩🟩🟩🐆🟩🟩🟩💀",
      "💀💀💀💀💀💀💀💀🟩💀",
      "💀📍🟩🟩🟩🟩🟩🟩🟩💀",
      "💀💀💀💀💀💀💀💀💀💀"
    ]),
    snakeStart: { x: 1, y: 1 },
    initialLength: 2,
    initialDirection: "right",
    goal: { x: 5, y: 2 },
    goldReward: 75
  },
  {
    id: 3,
    name: "Crazy Room",
    grid: convertGrid([
      "💀💀💀💀💀💀💀💀💀💀",
      "💀🔺🟩🟩🟩🟩🟩🟩🤪💀",
      "💀💀💀💀💀💀💀💀🟩💀",
      "💀🟩🟩🟩🟩🐆🟩🟩🟩💀",
      "💀🟩💀💀💀💀💀💀💀💀",
      "💀🟩💀💀💀💀💀💀💀💀",
      "💀🟩🟩🟩🟩🐆🟩🟩🟩💀",
      "💀💀💀💀💀💀💀💀🟩💀",
      "💀📍🟩🟩🟩🟩🟩🟩🟩🤪💀",
      "💀💀💀💀💀💀💀💀💀💀"
    ]),
    snakeStart: { x: 1, y: 1 },
    initialLength: 2,
    initialDirection: "right",
    goal: { x: 5, y: 2 },
    goldReward: 150
  }
];

export default CHALLENGES;