import { BaseDay } from '../day';

type Round = {
  p1: string;
  p2: string;
};

const bonus: any = {
  X: 1,
  Y: 2,
  Z: 3,
};

const rules: Record<string, Record<string, number>> = {
  A: {
    //rock
    X: 3, //rock
    Y: 6, //paper
    Z: 0, //scissors
  },
  B: {
    //paper
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    //scissors
    X: 6,
    Y: 0,
    Z: 3,
  },
};

const toPlay: any = {
  A: {
    //rock
    X: 'Z', //lose
    Y: 'X', //draw
    Z: 'Y', //win
  },
  B: {
    //paper
    X: 'X',
    Y: 'Y',
    Z: 'Z',
  },
  C: {
    //scissors
    X: 'Y',
    Y: 'Z',
    Z: 'X',
  },
};

export class Day extends BaseDay<Round[], number, number> {
  parse(input: string): Round[] {
    return input.split('\n').map((it) => {
      const [p1, p2] = it.split(' ');
      return { p1, p2 };
    });
  }

  async partOne(): Promise<number> {
    return this.input
      .map((it) => rules[it.p1][it.p2] + bonus[it.p2])
      .reduce((a, b) => a + b, 0);
  }

  async partTwo(): Promise<number> {
    return this.input
      .map((it) => {
        const myMove = toPlay[it.p1][it.p2];
        return rules[it.p1][myMove] + bonus[myMove];
      })
      .reduce((a, b) => a + b, 0);
  }
}

export default Day;
