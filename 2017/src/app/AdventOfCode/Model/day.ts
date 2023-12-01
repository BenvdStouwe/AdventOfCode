import { DayPart } from "./dayPart";

export abstract class Day {
  public year: number;
  public day: number;
  public parts: DayPart[];
  public input: any;

  constructor(year: number, day: number) {
    this.year = year;
    this.day = day;
    this.parts = new Array<DayPart>();
  }

  public createSteps(input: any): void {
    if (this.parts.length > 0) {
      return;
    }
    this.input = input;
    this.calculatePart1();
    this.calculatePart2();
  }

  protected abstract calculatePart1(): void;
  protected abstract calculatePart2(): void;
}
