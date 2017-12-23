import { Day } from "../day";
import { DayPart } from "../dayPart";

export class Day17 extends Day {
    constructor() {
        super(2017, 17);
    }

    protected calculatePart1(): void {
        let stepDescription, step;
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

        stepDescription = `We have to skip ${this.input} times before adding a new number, for a total of 2017 times.`;
        step = part.newStep(this.input, stepDescription);
        // part.finishStep(step, this.doMagic(step.input));
    }

    protected calculatePart2(): void {
        let stepDescription, step;
        const part = new DayPart(`
      As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1.
      Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.`);
        this.parts.push(part);

        stepDescription = `Screw this as well.`;
        step = part.newStep(this.input, stepDescription);
        // part.finishStep(step, this.doMoreMagic(step.input));
    }

    // private iterateThroughStringAndAddNumber(iterations: number, startingIndex: number, skip: number, text?: string): [string, number] {

    //     // for (let i = 0; i < iterations; i++) {
    //     //     if (text.length === 1) {
    //     //         text.app
    //     //     }
    //     // }
    // }
}
