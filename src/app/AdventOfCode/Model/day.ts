import { Step } from "./step";

export class Day {
  static _id = 0;
  private id: number;
  public year: number;
  public day: number;
  public steps: Step[];

  constructor(year: number, day: number) {
    Day._id++;
    this.id = Day._id;
    this.year = year;
    this.day = day;
  }

  public getId(): number {
    return this.id;
  }
}
