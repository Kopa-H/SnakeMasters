import { Fruit } from "../interfaces/fruit";

// Función para eliminar una fruta del array de frutas
const removeFruit = (
  fruitToRemove: Fruit,
  setFruits: React.Dispatch<React.SetStateAction<Fruit[]>>
) => {
  setFruits((prevFruits: Fruit[]) =>
    prevFruits.filter((fruit) => fruit !== fruitToRemove)
  );
};

export default removeFruit;
