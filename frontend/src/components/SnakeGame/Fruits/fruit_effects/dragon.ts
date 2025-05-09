import FRUITS_INFO from "../../Parameters/fruit_info";

let inmortalState = false;

export const activateInmortalEffect = (durationInSeconds: number, setActiveFruitEffects: React.Dispatch<React.SetStateAction<string[]>>) => {
  // Se activa el estado
  inmortalState = true;

  // Se añade el emoji de la fruta loca a la lista de efectos activos:
  const dragonEmoji = FRUITS_INFO.DRAGON.emoji;
  setActiveFruitEffects((prev) => {
    if (!prev.includes(dragonEmoji)) {
      return [...prev, dragonEmoji];
    }
    return prev;
  });

  setTimeout(() => {
    inmortalState = false;
    setActiveFruitEffects((prev) => prev.filter(effect => effect !== dragonEmoji));
  }, durationInSeconds * 1000);
};

export { inmortalState };
