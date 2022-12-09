import { BaseDay } from '../day';

export class Day extends BaseDay<number[][], number, number> {
  parse(input: string): number[][] {
    return input.split('\n').map((it) => {
      return it.split('').map((it) => parseInt(it));
    });
  }

  async partOne(): Promise<number> {
    let visibles = 0;
    for (let i = 1; i < this.input.length - 1; i++) {
      for (let j = 1; j < this.input[0].length - 1; j++) {
        const isVisible =
          this.visibleTop(i, j, this.input) ||
          this.visibleLeft(i, j, this.input) ||
          this.visibleBottom(i, j, this.input) ||
          this.visibleRight(i, j, this.input);
        if (isVisible) {
          visibles++;
        }
      }
    }

    return this.input.length * 2 + this.input[0].length * 2 + visibles - 4;
  }

  visibleTop(row: number, col: number, map: number[][]): boolean {
    const h = map[row][col];
    for (let i = row - 1; i >= 0; i--) {
      if (map[i][col] >= h) return false;
    }
    return true;
  }

  visibleBottom(row: number, col: number, map: number[][]): boolean {
    const h = map[row][col];
    for (let i = row + 1; i < map.length; i++) {
      if (map[i][col] >= h) return false;
    }
    return true;
  }

  visibleRight(row: number, col: number, map: number[][]): boolean {
    const h = map[row][col];
    for (let i = col + 1; i < map[0].length; i++) {
      if (map[row][i] >= h) return false;
    }
    return true;
  }

  visibleLeft(row: number, col: number, map: number[][]): boolean {
    const h = map[row][col];
    for (let i = col - 1; i >= 0; i--) {
      if (map[row][i] >= h) return false;
    }
    return true;
  }

  async partTwo(): Promise<number> {
    let max = 0;
    for (let i = 1; i < this.input.length - 1; i++) {
      for (let j = 1; j < this.input[0].length - 1; j++) {
        const bottom = this.viewDistanceBottom(i, j, this.input);
        const right = this.viewDistanceRight(i, j, this.input);
        const top = this.viewDistanceTop(i, j, this.input);
        const left = this.viewDistanceLeft(i, j, this.input);
        const score = bottom * top * left * right;
        max = max > score ? max : score;
      }
    }
    return max;
  }

  viewDistanceTop(row: number, col: number, map: number[][]): number {
    const h = map[row][col];
    let i = row - 1;
    while (i > 0 && map[i][col] < h) {
      i--;
    }
    return row - i;
  }

  viewDistanceBottom(row: number, col: number, map: number[][]): number {
    const h = map[row][col];
    let i = row + 1;
    while (i < map.length - 1 && map[i][col] < h) {
      i++;
    }
    return i - row;
  }

  viewDistanceRight(row: number, col: number, map: number[][]): number {
    const h = map[row][col];
    let i = col + 1;
    while (i < map[0].length - 1 && map[row][i] < h) {
      i++;
    }
    return i - col;
  }

  viewDistanceLeft(row: number, col: number, map: number[][]): number {
    const h = map[row][col];
    let i = col - 1;
    while (i > 0 && map[row][i] < h) {
      i--;
    }
    return col - i;
  }
}

export default Day;
