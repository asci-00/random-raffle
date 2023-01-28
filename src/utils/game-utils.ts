import { playerInterface } from '@/components/games/interfaces';

export const getLadderGameWidth = (player: playerInterface): number => {
  const { radius, marginHorizontal, count, horizontalGap } = player;

  return 2 * (radius + marginHorizontal + (count - 1) * (radius + horizontalGap));
};
