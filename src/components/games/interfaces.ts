export interface player {
  idx: number;
  name: string;
  state: number;
  color: string;
}
export interface gameInterface {
  complexity: number;
  number: number;
}

export interface playerInterface {
  marginHorizontal: number;
  radius: number;
  horizontalGap: number;
  count: number;
}

export interface ladderInterface {
  marginHorizontal: number;
  stepCount: number;
  stepVerticalGap: number;
  player: playerInterface;
}
