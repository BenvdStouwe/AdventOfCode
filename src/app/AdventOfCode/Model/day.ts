import { DayPart } from "./dayPart";

export abstract class Day {
  public year: number;
  public day: number;
  public parts: DayPart[];

  constructor() {
    this.parts = new Array<DayPart>();
  }

  public createSteps(input: any): void {
    if (this.parts.length > 0) {
      return;
    }
    const part1 = this.calculatePart1(input);
    const part2 = this.calculatePart2(input);
    if (part1) {
      this.parts.push(part1);
    }
    if (part2) {
      this.parts.push(part2);
    }
  }

  protected abstract calculatePart1(input: any): DayPart;
  protected abstract calculatePart2(input: any): DayPart;
}
