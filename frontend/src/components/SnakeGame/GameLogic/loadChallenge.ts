import CHALLENGES_INFO from "../Parameters/challenges_info";
import addFruit from "../Fruits/addFruit";
import { Fruit, FruitsEaten } from "../interfaces/fruit";
import handleGameOver from "../GameOver/handleGameOver";
import { SnakeSegment } from "../interfaces/snake";
import FRUITS_INFO from "../Parameters/fruit_info";

export const loadChallenge = (
    isChallengeMode: boolean,
    level: number,
    setFruits: React.Dispatch<React.SetStateAction<Fruit[]>>,
    setSnake: React.Dispatch<React.SetStateAction<SnakeSegment[]>>,
    setChallengeGoal: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
) => {
    // Se obtiene el challenge actual
    if (isChallengeMode) {
        const challenge = CHALLENGES_INFO.find(c => c.id === level);

        if (!challenge) {
            console.error(`Challenge with level ${level} not found.`);
            return;
        }

        // Inicializamos un array de frutas
        const fruitsToAdd: Fruit[] = [];

        // Iteramos sobre las filas del grid
        for (let i = 0; i < challenge.grid.length; i++) {
            const row = challenge.grid[i];

            // Iteramos sobre las celdas de la fila
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];

                // Reemplazamos las comparaciones directas con emojis por comparaciones con el campo 'type'
                if (cell.type === 'empty') {
                    continue; // Ignoramos las celdas vacías (🟩)
                }

                if (cell.type === 'start') {
                    setSnake([{ x: j, y: i, color: "green" }]); // Establecer posición inicial de la serpiente
                }

                if (cell.type === 'goal') {
                    fruitsToAdd.push({
                        x: j,
                        y: i,
                        color: FRUITS_INFO.goal,
                    });
                    setChallengeGoal({ x: j, y: i }); // Establecer la posición del objetivo
                }

                // Encontramos el fruit correspondiente al emoji si el 'type' de la celda es una fruta
                const fruit = Object.values(FRUITS_INFO).find(fruit => fruit.emoji === cell.content);
                if (fruit) {
                    // Agregamos la fruta al tablero
                    fruitsToAdd.push({
                        x: j,
                        y: i,
                        color: fruit,
                    });
                }
            }
        }

        // Añadimos todas las frutas al juego
        fruitsToAdd.forEach(fruit => addFruit(fruit, setFruits, true));
    }
};


export const manageChallengeCompletion = (
    newHead: SnakeSegment,
    challengeGoal: { x: number; y: number },
    level: number,
    fruitsEaten: FruitsEaten,
    setCurrentScore: React.Dispatch<React.SetStateAction<number>>,
    dispatch: any,
    onGameScoreChange: any,
    setChallengeWon: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (newHead.x === challengeGoal.x && newHead.y === challengeGoal.y) {
        setChallengeWon(true);

        const challenge = CHALLENGES_INFO[level];
        setCurrentScore((prevScore) => prevScore + challenge.goldReward);
        handleGameOver(dispatch, true, fruitsEaten, onGameScoreChange);
        if (onGameScoreChange) {
            onGameScoreChange();
        }
    };
};