import FRUITS_INFO from "../../Parameters/fruit_info";

let invertedControlsState = false;

export const activateInvertControlsEffect = (durationInSeconds: number, setActiveFruitEffects: React.Dispatch<React.SetStateAction<string[]>>) => {
  // Se activa el estado de controles invertidos:
  invertedControlsState = true;

  // Se añade el emoji de la fruta loca a la lista de efectos activos:
  const crazyEmoji = FRUITS_INFO.CRAZY.emoji;
  setActiveFruitEffects((prev) => {
    if (!prev.includes(crazyEmoji)) {
      return [...prev, crazyEmoji];
    }
    return prev;
  });

  setTimeout(() => {
    invertedControlsState = false;
    setActiveFruitEffects((prev) => prev.filter(effect => effect !== crazyEmoji));
  }, durationInSeconds * 1000);
};

export { invertedControlsState };
