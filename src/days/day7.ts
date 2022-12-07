import { BaseDay } from '../day';

const DISK_SPACE = 70000000;
const REQUIRED_SPACE = 30000000;

class Node {
  name: string;
  files: Node[];
  directories: Node[];
  size: number;

  parent: Node | null;
  private constructor(name: string, size: number, parent: Node | null) {
    this.name = name;
    this.files = [];
    this.directories = [];
    this.size = size;
    this.parent = parent;
  }

  addFile(fileName: string, size: number) {
    this.files.push(Node.newFile(fileName, size, this));
  }

  addDir(fileName: string): Node {
    const node = this.directories.find((it) => it.name === fileName);
    if (node) return node;

    const newDir = Node.newDir(fileName, this);
    this.directories.push(newDir);
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

  static newFile(fileName: string, size: number, parent: Node): Node {
    return new this(fileName, size, parent);
  }

  static newDir(fileName: string, parent: Node | null): Node {
    return new this(fileName, 0, parent);
  }
}

export class Day extends BaseDay<string[], number, number> {
  parse(input: string): string[] {
    return input.split('\n');
  }

  async partOne(): Promise<number> {
    const { nodes } = this.getNodes();

    return nodes
      .map((it) => it.getSize())
      .filter((it) => it <= 100000)
      .reduce((a, b) => a + b, 0);
  }

  getNodes(): { nodes: Node[]; root: Node } {
    const root = this.buildTree();
    return {
      nodes: this.exploreTree(root, [root]),
      root,
    };
  }

  buildTree(): Node {
    const root = Node.newDir('/', null);
    let currDir: Node = root;
    for (let i = 1; i < this.input.length; i++) {
      const cmd = this.input[i];
      if (cmd.startsWith('$ cd')) {
        const dirName = cmd.split(' ')[2];

        if (dirName === '..') {
          currDir = currDir.parent!;
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
    return root;
  }

  exploreTree(root: Node, dirs: Node[]): Node[] {
    root.directories.forEach((it) => {
      dirs.push(it);
      this.exploreTree(it, dirs);
    });
    return dirs;
  }

  async partTwo(): Promise<number> {
    const { nodes, root } = this.getNodes();
    const freeSpace = DISK_SPACE - root.getSize();
    const toFree = REQUIRED_SPACE - freeSpace;

    return nodes
      .map((it) => it.getSize())
      .filter((it) => it > toFree)
      .sort((a, b) => a - b)[0];
  }
}

export default Day;
