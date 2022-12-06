import { BaseDay } from '../day';

export class Day extends BaseDay<number[], number, number> {
  parse(input: string): number[] {
    return input
      .split('\n\n')
      .map((it) => it.split('\n').map((it) => parseInt(it)))
      .map((it) => it.reduce((x, y) => x + y));
  }

  async partOne(): Promise<number> {
    return this.input.reduce((a, b) => (b > a ? b : a), 0);
  }

  async partTwo(): Promise<number> {
    const r = this.input.sort((a, b) => b - a);
    return r[0] + r[1] + r[2];
  }
}

export default Day;
