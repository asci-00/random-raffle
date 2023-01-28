import { playerInterface, player } from '@/components/games/interfaces';
import { getMousePos, random } from '@/utils/common';

export default class Player {
  info: playerInterface;
  players: player[];

  constructor(playerInfo: playerInterface, nameList: string[]) {
    this.info = playerInfo;
    this.players = nameList.map((name, idx) => ({
      idx,
      name,
      state: idx,
      color: `rgb(${200 + random(55)}, ${200 + random(55)}, ${200 + random(55)})`,
    }));
  }

  drawPlayer(ctx: CanvasRenderingContext2D | null): void {
    if (ctx === null) return;

    const { radius } = this.info;

    this.players.forEach((player, idx) => {
      ctx.beginPath();
      ctx.fillStyle = player.color;

      const positionX = this.getPlayerPosition(idx);

      ctx.arc(positionX, radius, radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.font = '30px Quicksand';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'black';

      ctx.fillText(player.name[0], positionX, radius);
    });
  }

  addPlayerClickHandler(canvas: HTMLCanvasElement, callback: (idx: number) => void) {
    const { radius, marginHorizontal, horizontalGap } = this.info;

    canvas.addEventListener('click', (ev: any) => {
      const { x, y } = getMousePos(canvas, ev);

      const player = Math.floor((x - (marginHorizontal - horizontalGap)) / (2 * (radius + horizontalGap)));
      if (player < 0 || y > radius * 2 || Math.abs(this.getPlayerPosition(player) - x) > radius) return null;
      callback(player);
    });
  }

  getPlayerPosition(n: number): number {
    const { marginHorizontal, radius, horizontalGap } = this.info;
    return 2 * n * (radius + horizontalGap) + marginHorizontal + radius;
  }

  getColor(n: number): string {
    return this.players[n].color;
  }
}
