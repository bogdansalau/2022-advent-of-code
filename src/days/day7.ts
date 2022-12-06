import { BaseDay } from '../day';

export class Day extends BaseDay<number[], number, number> {
  parse(input: string): number[] {
    return [];
  }

  async partOne(): Promise<number> {
    return 42;
  }

  async partTwo(): Promise<number> {
    return 42;
  }
}

export default Day;
