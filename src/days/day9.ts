import { BaseDay } from '../day';

type Command = {
  direction: string;
  steps: number;
};

type Coord = {
  x: number;
  y: number;
};

export class Day extends BaseDay<Command[], number, number> {
  parse(input: string): Command[] {
    return input.split('\n').map((it) => ({
      direction: it.split(' ')[0],
      steps: parseInt(it.split(' ')[1]),
    }));
  }

  async partOne(): Promise<number> {
    const set = new Set<string>();

    const tail = { x: 0, y: 0 };
    const head = { x: 0, y: 0 };

    this.input.map((it) => {
      this.executeCommand(tail, head, it, set);
    });

    return set.size;
  }

  executeCommand(tail: Coord, head: Coord, cmd: Command, set: Set<string>) {
    for (let i = cmd.steps; i > 0; i--) {
      const lastHeadPos = { x: head.x, y: head.y };
      switch (cmd.direction) {
        case 'D':
          head.y = head.y - 1;
          break;
        case 'R':
          head.x = head.x + 1;
          break;
        case 'U':
          head.y = head.y + 1;
          break;
        case 'L':
          head.x = head.x - 1;
          break;
      }

      if (!this.isAdjacent(tail, head)) {
        set.add(`${tail.x} ${tail.y}`);
        tail.x = lastHeadPos.x;
        tail.y = lastHeadPos.y;
        set.add(`${tail.x} ${tail.y}`);
      }
    }
  }

  isAdjacent(tail: Coord, head: Coord): boolean {
    const a = tail.x - head.x;
    const b = tail.y - head.y;

    const dist = Math.round(Math.sqrt(a * a + b * b));

    return dist <= 1;
  }

  async partTwo(): Promise<number> {
    const rope = Array.from(Array(10)).map((it) => ({ x: 0, y: 0 }));
    const set = new Set<string>(['0 0']);

    this.input.map((it) => {
      this.executeCommand2(rope, it, set);
    });

    return set.size;
  }

  executeCommand2(rope: Coord[], cmd: Command, set: Set<string>) {
    const head = rope[9];
    for (let i = cmd.steps; i > 0; i--) {
      const lastHead = { ...head };
      switch (cmd.direction) {
        case 'D':
          head.y = head.y - 1;
          break;
        case 'R':
          head.x = head.x + 1;
          break;
        case 'U':
          head.y = head.y + 1;
          break;
        case 'L':
          head.x = head.x - 1;
          break;
      }

      this.propagateMove(rope, 9, set);
    }
  }

  propagateMove(rope: Coord[], index: number, set: Set<string>) {
    if (index === 0) {
      set.add(`${rope[0].x} ${rope[0].y}`);
      return;
    }
    const head = rope[index];
    const tail = rope[index - 1];

    const diffX = head.x - tail.x;
    const diffY = head.y - tail.y;

    if (this.isAdjacent(tail, head)) {
      return;
    }

    tail.x += diff[diffX];
    tail.y += diff[diffY];

    this.propagateMove(rope, index - 1, set);
  }
}

const diff: Record<number, number> = {
  [-2]: -1,
  [-1]: -1,
  [0]: 0,
  [1]: 1,
  [2]: 1,
};

export default Day;
