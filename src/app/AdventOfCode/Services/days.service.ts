import { Injectable } from "@angular/core";

import { Day } from "../Model/day";

@Injectable()
export class DaysService {
  private days: Day[];

  constructor() {
    this.days = [new Day(2017, 1), new Day(2017, 2), new Day(2016, 1)];
  }

  public getDays(): Day[] {
    return this.days.map(day => new Day(day.year, day.day));
  }

  public getDay(dayId: number): Day {
    return this.days.find(day => day.getId() === dayId);
  }
}
