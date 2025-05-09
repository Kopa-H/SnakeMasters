import FRUITS_INFO from "../../Parameters/fruit_info";

let stopSnakeState = false;

export const activateStopSnakeEffect = (durationInSeconds: number, setActiveFruitEffects: React.Dispatch<React.SetStateAction<string[]>>) => {
  stopSnakeState = true;

  const paralysisEmoji = FRUITS_INFO.PARALYSIS.emoji;
  setActiveFruitEffects((prev) => {
    if (!prev.includes(paralysisEmoji)) {
      return [...prev, paralysisEmoji];
    }
    return prev;
  });

  setTimeout(() => {
    stopSnakeState = false;
    setActiveFruitEffects((prev) => prev.filter(effect => effect !== paralysisEmoji));
  }, durationInSeconds * 1000);
};

export { stopSnakeState };
