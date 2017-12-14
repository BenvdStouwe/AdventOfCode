import { Injectable } from "@angular/core";

@Injectable()
export class DaysService {

  constructor() { }

  public getDays(): Day[] {
    return [new Day(2017, 1), new Day(2017, 2)];
  }

}

export class Day {
  static _id = 0;
  private id: number;
  public year: number;
  public day: number;

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
