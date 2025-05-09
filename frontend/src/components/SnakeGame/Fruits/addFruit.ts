// Objective: Generate a new fruit position for the snake game
import { Fruit } from "../interfaces/fruit";
import removeFruit from "./remove_fruit";

const addFruit = (
  newFruit: Fruit,
  setFruits: React.Dispatch<React.SetStateAction<Fruit[]>>,
  isChallengeMode?: boolean
) => {

  // Se le añade un ID único a la fruta
  newFruit.id = Math.random().toString(8).substring(2, 11);

  // Se agrega la fruta a la lista de frutas usando la función de retorno de llamada
  setFruits(currentFruits => [newFruit, ...currentFruits]);

  // <--- ELIMINACIÓN AUTOMÁTICA DE LA FRUTA --->
  if (!isChallengeMode) {
    setTimeout(() => {
      // Usamos una función de retorno de llamada para asegurar que estamos accediendo al valor actualizado de fruits
      setFruits(currentFruits => {
        const fruitIndex = currentFruits.findIndex(fruit => fruit.id === newFruit.id);

        removeFruit(currentFruits[fruitIndex], setFruits);
        return currentFruits;
      });
    }, newFruit.color.lifeExpectancy * 1000);
  }
};

export default addFruit;
