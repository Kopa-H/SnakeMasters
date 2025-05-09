import FRUITS_INFO from '../../Parameters/fruit_info';

export let speedUpState = false;

export const activateSpeedUpEffect = (durationInSeconds: number, setActiveFruitEffects: React.Dispatch<React.SetStateAction<string[]>>) => {
  speedUpState = true;
  const cheetaEmoji = FRUITS_INFO.CHEETA.emoji;
  setActiveFruitEffects((prev) => {
    if (!prev.includes(cheetaEmoji)) {
      return [...prev, cheetaEmoji];
    }
    return prev;
  });

  setTimeout(() => {
    speedUpState = false;
    setActiveFruitEffects((prev) => prev.filter(effect => effect !== cheetaEmoji));
  }, durationInSeconds * 1000);
};
