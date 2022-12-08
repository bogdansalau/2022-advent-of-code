import { BaseDay } from '../day';

const LETTER = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
].reduce((acc: Record<string, number>, currentValue, i) => {
  acc[currentValue] = i + 1;
  return acc;
}, {});

export class Day extends BaseDay<string[], number, number> {
  parse(input: string): string[] {
    return input.split('\n');
  }

  async partOne(): Promise<number> {
    return this.input
      .map((it) => ({
        firstHalf: it.slice(0, it.length / 2),
        secondHalf: it.slice(it.length / 2, it.length),
      }))
      .map(({ firstHalf, secondHalf }) =>
        this.getDuplicateLetter(firstHalf, secondHalf)
      )
      .map((it) => LETTER[it])
      .reduce((a, b) => a + b);
  }

  getDuplicateLetter(firstHalf: string, secondHalf: string): string {
    for (const letter in LETTER) {
      if (firstHalf.includes(letter) && secondHalf.includes(letter)) {
        return letter;
      }
    }
    return '';
  }

  async partTwo(): Promise<number> {
    const badges = [];
    for (let i = 0; i < this.input.length; i += 3) {
      badges.push(
        this.getDuplicateLetter3(
          this.input[i],
          this.input[i + 1],
          this.input[i + 2]
        )
      );
    }

    return badges.map((it) => LETTER[it]).reduce((a, b) => a + b);
  }

  getDuplicateLetter3(
    firstHalf: string,
    secondHalf: string,
    thirdHalf: string
  ): string {
    for (const letter in LETTER) {
      if (
        firstHalf.includes(letter) &&
        secondHalf.includes(letter) &&
        thirdHalf.includes(letter)
      ) {
        return letter;
      }
    }
    return '';
  }
}

export default Day;
