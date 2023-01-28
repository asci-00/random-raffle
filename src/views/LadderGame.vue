<template lang="pug">
#ladderGame
  div(:style="{ width: `${ladderCanvas.width}px`, margin: '0 auto'}")
    canvas#playerCanvas(:width="ladderCanvas.width" :height="playerCanvas.height")
    canvas#ladderCanvas(:width="ladderCanvas.width" :height="ladderCanvas.height")
    canvas#resultCanvas(:width="ladderCanvas.width" :height="playerCanvas.height")
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Ladder from '@/components/games/Ladder';
import { ladderInterface, playerInterface } from '@/components/games/interfaces';
import Player from '@/components/games/Player';
import { getLadderGameWidth } from '@/utils/game-utils';

const playerInfo: playerInterface = {
  marginHorizontal: 0,
  radius: 30,
  horizontalGap: 10,
  count: 7,
};

const ladderInfo: ladderInterface = {
  marginHorizontal: 0,
  stepCount: 32,
  stepVerticalGap: 20,
  player: playerInfo,
};

export default defineComponent({
  name: 'LadderGame',
  setup(props, { emit }) {
    const game = new Ladder(ladderInfo);
    const player = new Player(playerInfo, Array(playerInfo.count).fill('한건욱'));
    const result = new Player(playerInfo, Array(playerInfo.count).fill('꽝'));

    const ladderCanvas = {
      width: getLadderGameWidth(playerInfo),
      height: ladderInfo.stepCount * ladderInfo.stepVerticalGap,
    };

    const playerCanvas = {
      width: ladderCanvas.width,
      height: playerInfo.radius * 2,
    };

    onMounted(() => {
      const ladderCanvas = document.getElementById('ladderCanvas') as HTMLCanvasElement;
      const playerCanvas = document.getElementById('playerCanvas') as HTMLCanvasElement;
      const resultCanvas = document.getElementById('resultCanvas') as HTMLCanvasElement;

      game.drawLadder(ladderCanvas.getContext('2d'));
      player.drawPlayer(playerCanvas.getContext('2d'));
      result.drawPlayer(resultCanvas.getContext('2d'));

      player.addPlayerClickHandler(playerCanvas, (idx) =>
        game.lineDrawing(idx, ladderCanvas.getContext('2d'), player.getColor(idx), 'D')
      );
      result.addPlayerClickHandler(resultCanvas, (idx) =>
        game.lineDrawing(idx, ladderCanvas.getContext('2d'), result.getColor(idx), 'U')
      );
    });

    return { ladderCanvas, playerCanvas };
  },
});
</script>

<style lang="scss" scoped>
#ladderGame {
  padding: 10px 20px;
  overflow: auto;
  overflow-y: hidden;
}
</style>
