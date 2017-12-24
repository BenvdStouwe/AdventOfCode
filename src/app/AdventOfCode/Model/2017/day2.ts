import { Day } from "../day";
import { DayPart } from "../dayPart";

export class Day2 extends Day {
  constructor() {
    super(2017, 2);
  }

  protected calculatePartOne(): void {
    let stepResult, stepDescription, step;
    const part = new DayPart(`
    The spreadsheet consists of rows of apparently-random numbers.
    To make sure the recovery process is on the right track, they need you to calculate the spreadsheet's checksum.
    For each row, determine the difference between the largest value and the smallest value; the checksum is the sum of all of
    these differences.`);
    this.parts.push(part);

    stepDescription = "Here's our input.";
    step = part.newStep(this.input, stepDescription);
    stepResult = step.input;
    part.finishStep(step, stepResult);

    const digits = this.convertInputToDigits(step.output);

    stepDescription = `This is just one big string with tabs and newlines,
      first we're going to convert it to a two-dimensional array with numbers.`;
    step = part.newStep(step.output, stepDescription);
    stepResult = digits;
    part.finishStep(step, stepResult);

    stepDescription = "Let's take a look at the first row";
    step = part.newStep(digits, stepDescription);
    stepResult = digits[0];
    part.finishStep(step, stepResult);

    const firstRowHighestLowest = this.getHighestAndLowestDigitOfRow(digits[0]);

    stepDescription = `The highest number in this row is ${firstRowHighestLowest[0]} and the lowest is ${firstRowHighestLowest[1]}.
    The difference between these two is:`;
    step = part.newStep(digits, stepDescription);
    stepResult = this.calculateDigitDif(firstRowHighestLowest[0], firstRowHighestLowest[1]);
    part.finishStep(step, stepResult);

    stepDescription = `When the difference between all highest en lowest digits is added up we get:`;
    step = part.newStep(digits, stepDescription);
    stepResult = this.getSum(digits);
    part.finishStep(step, stepResult);
  }

  protected calculatePartTwo(): void {
    let stepResult, stepDescription, step;
    const part = new DayPart(`
      It sounds like the goal is to find the only two numbers in each row where one evenly divides the other - that is,
      where the result of the division operation is a whole number.
      They would like you to find those numbers on each line, divide them, and add up each line's result.
      these differences.`);
    this.parts.push(part);

    stepDescription = `The first few steps are the same as the previous part.
      The input is converted to a two-dimensional array of numbers.`;
    step = part.newStep(this.input, stepDescription);
    stepResult = this.convertInputToDigits(step.input);
    part.finishStep(step, stepResult);

    stepDescription = `I'm lazy and just made a function to calculate the whole thing at once.`;
    step = part.newStep(step.output, stepDescription);
    stepResult = step.input.map(r => this.getProductOfEvenlyDividablyDigits(r)).reduce(function (a, b) { return a + b; }, 0);
    part.finishStep(step, stepResult);
  }

  private convertInputToDigits(input: string): number[][] {
    return input.split("\n").map(r => this.getDigitsForRow(r));
  }

  private getDigitsForRow(row: string): number[] {
    return row.split("\t").map(d => +d);
  }

  private getSum(arraysOfDigits: number[][]): number {
    let sum = 0;
    for (const array of arraysOfDigits) {
      const highestLowest = this.getHighestAndLowestDigitOfRow(array);
      sum += this.calculateDigitDif(highestLowest[0], highestLowest[1]);
    }
    return sum;
  }

  private getHighestAndLowestDigitOfRow(digits: number[]): number[] {
    let lowest = digits[0], highest = digits[0];

    for (const digit of digits) {
      lowest = digit < lowest ? digit : lowest;
      highest = digit > highest ? digit : highest;
    }

    return [highest, lowest];
  }

  private calculateDigitDif(firstDigit: number, secondDigit: number) {
    return firstDigit > secondDigit ? firstDigit - secondDigit : secondDigit - firstDigit;
  }

  private getProductOfEvenlyDividablyDigits(row: number[]): number {
    for (let i = 0; i < row.length; i++) {
      const firstDigit = row[i];
      for (let j = i + 1; j < row.length; j++) {
        const secondDigit = row[j];
        const firstDivide = firstDigit / secondDigit;
        if (firstDivide % 1 === 0) {
          return firstDivide;
        }
        const secondDivide = secondDigit / firstDigit;
        if (secondDivide % 1 === 0) {
          return secondDivide;
        }
      }
    }
  }
}
