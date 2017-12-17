import { Day } from "../day";
import { DayPart } from "../dayPart";

export class Day1 extends Day {
  private sum: number;

  constructor() {
    super();
    this.year = 2017;
    this.day = 1;
  }

  protected calculatePart1(): void {
    let stepResult, stepDescription, step;
    const part = new DayPart(`You're standing in a room with "digitization quarantine" written in LEDs along one wall.
      The only door is locked, but it includes a small interface. "Restricted Area - Strictly No Digitized Users Allowed."
      It goes on to explain that you may only leave by solving a captcha to prove you're not a human.
      Apparently, you only get one millisecond to solve the captcha: too fast for a normal human, but it feels like hours to you.
      The captcha requires you to review a sequence of digits(your puzzle input) and find the sum of all digits that match the next
      digit in the list.The list is circular, so the digit after the last digit is the first digit in the list.`);
    this.parts.push(part);

    stepDescription = "Here's our input:";
    step = part.newStep(this.input, stepDescription);
    stepResult = step.input;
    part.finishStep(step, stepResult);

    stepDescription = "Now we'll have to find digits that match the next digit. Here are all the double digits we have to add up.";
    step = part.newStep(step.output, stepDescription);
    stepResult = this.getDoubleDigits(step.input, 1);
    part.finishStep(step, stepResult);

    stepDescription = `The sum of these ${stepResult.length} digits is:`;
    step = part.newStep(step.output, stepDescription);
    stepResult = this.sum;
    part.finishStep(step, stepResult);

    stepDescription = "And there you have it, the answer to part 1 of day 1!";
    step = part.newStep(step.output, stepDescription);
    stepResult = null;
    part.finishStep(step, stepResult);
  }

  protected calculatePart2(): void {
    let stepResult, stepDescription, step;
    const part = new DayPart(`
      Now, instead of considering the next digit, it wants you to consider the digit halfway around the circular list.
      That is, if your list contains 10 items, only include a digit in your sum if the digit 10/2 = 5 steps forward matches it.
      Fortunately, your list has an even number of elements.`);
    this.parts.push(part);

    stepDescription = "The input is the same as part 1.";
    step = part.newStep(this.input, stepDescription);
    stepResult = step.input;
    part.finishStep(step, stepResult);

    stepDescription = `This time we'll have to match the same digit that is half the length of the input away.
      Our input is ${step.input.length} characters long, so the next digit is ${step.input.length / 2} places away.
      Good luck figuring that out by hand.`;
    step = part.newStep(step.output, stepDescription);
    stepResult = this.getDoubleDigits(step.input, step.input.length / 2);
    part.finishStep(step, stepResult);

    stepDescription = "The sum of these digits is:";
    step = part.newStep(step.output, stepDescription);
    stepResult = this.sum;
    part.finishStep(step, stepResult);

    stepDescription = "That's it, day 1 is done.";
    step = part.newStep(step.output, stepDescription);
    stepResult = null;
    part.finishStep(step, stepResult);
  }

  private getDoubleDigits(input: string, indexDifference: number): string {
    this.sum = 0;
    let result = "";
    const firstDigit = input[0];
    for (let i = 0; i < input.length; i++) {
      const digit = input[i];
      const nextDigit = input[i + indexDifference > input.length - 1 ? i + indexDifference - input.length : i + indexDifference];
      if (digit === nextDigit) {
        result += digit;
        this.sum += +digit;
      }
    }
    return result;
  }
}
