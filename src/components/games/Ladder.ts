import { random } from '@/utils/common';
import { ladderInterface } from '@/components/games/interfaces';
import { getLadderGameWidth } from '@/utils/game-utils';

export default class Ladder {
  info: ladderInterface;
  result: number[];
  ladderStatus: boolean[][];
  height: number;
  animationId: number | null;

  constructor(initialize: ladderInterface) {
    this.info = initialize;
    this.result = Array.from({ length: initialize.player.count }, (_, i) => i);
    this.ladderStatus = Array.from({ length: initialize.player.count }, () => Array(initialize.stepCount).fill(false));
    this.height = initialize.stepCount * initialize.stepVerticalGap;
    this.animationId = null;

    this.initializeLadder();
  }

  initializeLadder(): void {
    const { stepCount, player } = this.info;

    for (let step = 0; step < stepCount; step++) {
      // todo(idea) 가질 수 있는 다리 개수를 설정하고 다리를 못 가질 수록 확률 증가시키기
      if (!(step > 0 && step < stepCount - 1)) continue;

      this.ladderStatus.forEach((ladder, idx) => {
        if (idx === 0 || this.ladderStatus[idx - 1][step] || random(player.count / 2) !== 0) return;
        // todo: 왼 쪽에 다리가 없다면 1/number 확률로 다리 생성 / 확률이 너무 낮을 수 있음
        ladder[step] = true;
        [this.result[idx - 1], this.result[idx]] = [this.result[idx], this.result[idx - 1]];
      });
    }
  }

  drawLadder(ctx: CanvasRenderingContext2D | null): void {
    if (ctx === null) return;
    ctx.clearRect(0, 0, getLadderGameWidth(this.info.player), this.info.stepCount * this.info.stepVerticalGap);

    const {
      stepVerticalGap,
      player: { radius, horizontalGap: playerHorizontalGap },
    } = this.info;

    const horizontalGap = 2 * (radius + playerHorizontalGap);

    ctx.strokeStyle = '#6E6767FF';
    ctx.lineCap = 'round';
    ctx.lineWidth = 3;

    ctx.beginPath();

    this.ladderStatus.forEach((ladder, idx) => {
      const x = this.getLadderPosition(idx);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();

      ladder.forEach((bridge, idx) => {
        if (!bridge) return;
        ctx.moveTo(x, stepVerticalGap * idx);
        ctx.lineTo(x - horizontalGap, stepVerticalGap * idx);
        ctx.stroke();
      });
    });
  }

  getLadderPosition(n: number): number {
    const {
      marginHorizontal,
      player: { radius, horizontalGap },
    } = this.info;

    return 2 * n * (radius + horizontalGap) + marginHorizontal + radius;
  }

  lineDrawing(lineNumber: number, ctx: CanvasRenderingContext2D | null, color = 'black', direction: string): void {
    if (ctx === null) return;
    if (this.animationId) cancelAnimationFrame(this.animationId);

    const {
      stepVerticalGap,
      player: { radius, horizontalGap: playerHorizontalGap },
    } = this.info;

    const horizontalGap = 2 * (radius + playerHorizontalGap);
    const startX = this.getLadderPosition(lineNumber);
    const endY = direction === 'D' ? this.height : 0;

    const animation = {
      moveStep: 4,
      moveCount: stepVerticalGap / 4, // moveStep
      nowStep: 0,
      nowLine: lineNumber,
      position: {
        x: startX,
        y: direction === 'D' ? 0 : this.height,
      },
      direction,
    };

    this.drawLadder(ctx);

    const moveDirection = Object.freeze({
      U: [0, -animation.moveStep],
      D: [0, animation.moveStep],
      L: [-animation.moveStep, 0],
      R: [animation.moveStep, 0],
    });

    const moveLine = () => {
      ctx.beginPath();
      ctx.fillStyle = color;

      animation.moveCount--;

      const [dx, dy] = moveDirection[animation.direction as keyof typeof moveDirection];

      animation.position.x += dx;
      animation.position.y += dy;

      const { x, y } = animation.position;

      ctx.arc(x, y, animation.moveStep, 0, Math.PI * 2);
      ctx.fill();

      ctx.closePath();
    };

    const drawingAnimation = () => {
      moveLine();
      if (!animation.moveCount) {
        if (animation.direction !== direction) {
          animation.moveCount = stepVerticalGap / animation.moveStep;
          animation.direction = direction;
        } else {
          const step = animation.position.y / stepVerticalGap;
          if (this.ladderStatus[lineNumber][step]) {
            animation.moveCount = horizontalGap / animation.moveStep;
            lineNumber -= 1;
            animation.direction = 'L';
          } else if (this.ladderStatus[lineNumber + 1] && this.ladderStatus[lineNumber + 1][step]) {
            animation.moveCount = horizontalGap / animation.moveStep;
            lineNumber += 1;
            animation.direction = 'R';
          } else {
            animation.moveCount = stepVerticalGap / animation.moveStep;
          }
        }
      }

      if (animation.position.y !== endY) this.animationId = requestAnimationFrame(drawingAnimation);
    };

    drawingAnimation();
  }
}
