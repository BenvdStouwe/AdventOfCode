import { Day } from "../day";
import { DayPart } from "../dayPart";

export class Day17 extends Day {
  constructor() {
    super(2017, 17);
  }

  protected calculatePartOne(): void {
    let stepDescription, stepResult, step;
    const part = new DayPart(`
      This spinlock's algorithm is simple but efficient, quickly consuming everything in its path.
      It starts with a circular buffer containing only the value 0, which it marks as the current position.
      It then steps forward through the circular buffer some number of steps (your puzzle input) before inserting the first new value, 1,
      after the value it stopped on. The inserted value becomes the current position.
      Then, it steps forward from there the same number of steps, and wherever it stops, inserts after it the second new value, 2,
      and uses that as the new current position again.

        It repeats this process of stepping forward, inserting a new value, and using the location of the inserted value as the new current
        position a total of 2017 times, inserting 2017 as its final operation, and ending with a total of 2018
        values (including 0) in the circular buffer.
        `);
    this.parts.push(part);

    stepDescription = `We have to skip ${this.input} times before adding a new number, for a total of 2017 times.
    The number after 2017 is the result`;
    step = part.newStep(this.input, stepDescription);
    // stepResult = this.doPartOne(2017, Number(step.input));
    stepResult = 0;
    part.finishStep(step, stepResult);
  }

  protected calculatePartTwo(): void {
    let stepDescription, stepResult, step;
    const part = new DayPart(`
    What is the value after 0 the moment 50000000 is inserted?`);
    this.parts.push(part);

    stepDescription = `This could take a while...`;
    step = part.newStep(this.input, stepDescription);
    stepResult = this.doPartTwo(50000000, step.input);
    // stepResult = 0;
    part.finishStep(step, stepResult);
  }

  private doPartOne(iterations: number, skip: number): number {
    const numbers: number[] = [0];
    let nextInsert = 0;
    for (let i = 1; i <= iterations; i++) {
      nextInsert = ((nextInsert + skip) % numbers.length) + 1;
      numbers.splice(nextInsert, 0, i);
    }
    return numbers[nextInsert + 1];
  }

  private doPartTwo(iterations: number, skip: number): number {
    let target = 0;
    let nextInsert = 0;
    for (let i = 0; i < iterations; i++) {
      nextInsert = ((nextInsert + skip) % i) + 1;
      if (nextInsert === 1) {
        target = i;
        console.log(target);
      }
    }
    console.log(target);
    return target;
  }
}
