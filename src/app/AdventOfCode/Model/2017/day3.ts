import { Day } from "../day";
import { DayPart } from "../dayPart";

export class Day3 extends Day {
  constructor() {
    super(2017, 3);
  }

  protected calculatePartOne() {
    let stepDescription, step;
    const part = new DayPart(`
      How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?`);
    this.parts.push(part);

    stepDescription = `Screw this. Thanks https://www.reddit.com/r/adventofcode/comments/7h7ufl/2017_day_3_solutions/dqpvvif/`;
    step = part.newStep(this.input, stepDescription);
    part.finishStep(step, this.doMagic(step.input));
  }

  protected calculatePartTwo() {
    let stepDescription, step;
    const part = new DayPart(`
    As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1.
    Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.`);
    this.parts.push(part);

    stepDescription = `Screw this as well.`;
    step = part.newStep(this.input, stepDescription);
    part.finishStep(step, this.doMoreMagic(step.input));
  }

  private doMagic(input: number): number {
    const size = Math.ceil(Math.sqrt(input));
    const center = Math.ceil((size - 1) / 2);
    return Math.max(0, center - 1 + Math.abs(center - input % size));
  }

  private doMoreMagic(input: number): number {
    let x, y, matrix;
    x = y = 0;
    matrix = {};
    matrix[x + "," + y] = 1;
    while (true) {
      const val = this.getValue(matrix, x, y);
      if (val >= input) {
        return val;
      }
      matrix[x + "," + y] = val;

      if ((x !== y || x >= 0) && Math.abs(x) <= Math.abs(y)) {
        x += y >= 0 ? 1 : -1;
      } else {
        y += x >= 0 ? -1 : 1;
      }
    }
  }

  private getValue(matrix, posX, posY) {
    let sum = 0;
    for (let x = posX - 1; x <= posX + 1; x++) {
      for (let y = posY - 1; y <= posY + 1; y++) {
        if (matrix[x + "," + y]) {
          sum += matrix[x + "," + y];
        }
      }
    }
    return sum;
  }
}
