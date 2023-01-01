type serviceType = {
  name: string;
  icon: string;
  path: string;
};

export const SERVICE: Readonly<serviceType[]> = Object.freeze([
  {
    name: '사다리타기',
    icon: 'assets/images/ladder.png',
    path: '',
  },
  {
    name: '로또',
    icon: 'assets/images/lotto.png',
    path: '',
  },
]);
