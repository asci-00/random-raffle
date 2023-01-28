import { createRouter, createWebHistory } from 'vue-router';
import LadderGame from '@/views/LadderGame.vue';
import LottoGame from '@/views/LottoGame.vue';
import PlayerManage from '@/views/PlayerManage.vue';

export const routes = [
  { path: '/', component: PlayerManage },
  {
    name: '사다리타기',
    icon: 'assets/images/ladder.png',
    isService: true,
    path: '/ladder-game',
    component: LadderGame,
  },
  {
    name: '로또',
    icon: 'assets/images/lotto.png',
    isService: true,
    path: '/lotto-game',
    component: LottoGame,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes: routes.map(({ path, component }) => ({
    path,
    component,
  })),
});
