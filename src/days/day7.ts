import { BaseDay } from '../day';

class Node {
  name: string;
  files: Node[];
  directories: Node[];
  size: number;

  parent: Node | null;
  private constructor(name: string, size: number) {
    this.name = name;
    this.files = [];
    this.directories = [];
    this.size = size;
  }

  addFile(fileName: string, size: number) {
    this.files = this.files.concat(Node.newFile(fileName, size));
  }

  addDir(fileName: string): Node {
    const node = this.directories.find((it) => it.name === fileName);
    if (node) return node;

    const newDir = Node.newDir(fileName);
    this.directories = this.directories.concat(newDir);
    return newDir;
  }

  getSize(): number {
    if (this.size !== 0) return this.size;

    const dirSizes = this.directories
      .map((it) => it.getSize())
      .reduce((a, b) => a + b, 0);
    const fileSizes = this.files
      .map((it) => it.getSize())
      .reduce((a, b) => a + b, 0);

    return dirSizes + fileSizes;
  }

  static newFile(fileName: string, size: number): Node {
    return new this(fileName, size);
  }

  static newDir(fileName: string): Node {
    return new this(fileName, 0);
  }
}

export class Day extends BaseDay<string[], number, number> {
  parse(input: string): string[] {
    return input.split('\n');
  }

  async partOne(): Promise<number> {
    const root = Node.newDir('/');
    let currDir: Node = root;
    for (let i = 1; i < this.input.length; i++) {
      const cmd = this.input[i];
      if (cmd.startsWith('$ cd')) {
        const dirName = cmd.split(' ')[2];

        if (dirName === '..') {
          currDir = this.findParent(root, currDir.name) || root;
          continue;
        }

        if (dirName === '/') {
          currDir = root;
          continue;
        }

        currDir = currDir.addDir(dirName);
        continue;
      }

      if (cmd.startsWith('$ ls')) {
        i++;
        let nextCmd = this.input[i];
        while (nextCmd && !nextCmd.startsWith('$')) {
          if (nextCmd.startsWith('dir')) {
            const dirName = nextCmd.split(' ')[1];
            currDir.addDir(dirName);
          } else {
            const fileName = nextCmd.split(' ')[1];
            const size = nextCmd.split(' ')[0];
            currDir.addFile(fileName, parseInt(size));
          }

          i++;
          nextCmd = this.input[i];
        }
        i--;
      }
    }

    const list: Node[] = [root];
    this.exploreDir(root, list);

    return list
      .map((it) => it.getSize())
      .filter((it) => it <= 100000)
      .reduce((a, b) => a + b, 0);
  }

  findParent(root: Node, name: string): Node | null {
    let node: Node | null = null;
    root.directories.forEach((it) => {
      if (it.name === name) {
        node = root;
      }
    });
    return node;
  }

  exploreDir(root: Node, dirs: Node[]) {
    root.directories.forEach((it) => {
      dirs.push(it);
      this.exploreDir(it, dirs);
    });
  }

  async partTwo(): Promise<number> {
    return 42;
  }
}

export default Day;
