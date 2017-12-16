import { DayPart } from "./dayPart";

export abstract class Day {
  public year: number;
  public day: number;
  public parts: DayPart[];

  constructor() {
    this.parts = new Array<DayPart>();
  }

  public abstract createSteps(input: any);
}
