import { Day } from "../day";
import { DayPart } from "../dayPart";
import { Step } from "../step";

export class Day1 extends Day {
  private result = 0;

  constructor() {
    super();
    this.year = 2017;
    this.day = 1;
  }

  protected calculatePart1(input: string) {
    // tslint:disable-next-line:max-line-length
    const part = new DayPart(`You're standing in a room with "digitization quarantine" written in LEDs along one wall. The only door is locked, but it includes a small interface. "Restricted Area - Strictly No Digitized Users Allowed."` +
      `It goes on to explain that you may only leave by solving a captcha to prove you're not a human. Apparently, you only get one millisecond to solve the captcha: too fast for a normal human, but it feels like hours to you.` +
      // tslint:disable-next-line:max-line-length
      `The captcha requires you to review a sequence of digits(your puzzle input) and find the sum of all digits that match the next digit in the list.The list is circular, so the digit after the last digit is the first digit in the list.`);
    let step = new Step(input);
    step.description = "Here's our input:";
    step.output = step.input;
    part.steps.push(step);

    step = new Step(step.output);
    step.description = "Now we'll have to find digits that match the next digit. Here are all the double digits we have to add up.";
    step.output = (this.getDoubleDigits(step.input, 1));
    part.steps.push(step);

    step = new Step(step.output);
    step.description = "The sum of these digits is:";
    step.output = this.sumDoubleDigits(step.input);
    part.steps.push(step);

    step = new Step(step.output);
    step.description = "And there you have it, the answer to part 1 of day 1!";
    part.steps.push(step);

    return part;
  }

  protected calculatePart2(input: string): DayPart {
    // tslint:disable-next-line:max-line-length
    const part = new DayPart(`You're standing in a room with "digitization quarantine" written in LEDs along one wall. The only door is locked, but it includes a small interface. "Restricted Area - Strictly No Digitized Users Allowed."` +
      `It goes on to explain that you may only leave by solving a captcha to prove you're not a human. Apparently, you only get one millisecond to solve the captcha: too fast for a normal human, but it feels like hours to you.` +
      // tslint:disable-next-line:max-line-length
      `The captcha requires you to review a sequence of digits(your puzzle input) and find the sum of all digits that match the next digit in the list.The list is circular, so the digit after the last digit is the first digit in the list.`);
    let step = new Step(input);
    step.description = "The input is the same as part 1.";
    step.output = step.input;
    part.steps.push(step);

    step = new Step(step.output);
    step.description = "This time we'll have to match the same digit that is half the length of the input away. A bit harder to checkk...";
    step.output = (this.getDoubleDigits(step.input, step.input.length / 2));
    part.steps.push(step);

    step = new Step(step.output);
    step.description = "The sum of these digits is:";
    step.output = this.sumDoubleDigits(step.input);
    part.steps.push(step);

    step = new Step(step.output);
    step.description = "And there you have it, the answer to part 1 of day 1!";
    part.steps.push(step);

    return part;
  }

  private getDoubleDigits(input: string, indexDifference: number): string {
    let result = "";
    const firstDigit = input[0];
    for (let i = 0; i < input.length; i++) {
      const digit = input[i];
      const nextDigit = input[i + indexDifference > input.length - 1 ? i + indexDifference - input.length : i + indexDifference];
      if (digit === nextDigit) {
        result += digit;
      }
    }
    return result;
  }

  private sumDoubleDigits(input: string): number {
    let sum = 0;
    for (const digit of input) {
      sum += +digit;
    }
    return sum;
  }
}
