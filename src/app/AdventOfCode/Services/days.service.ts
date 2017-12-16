import { Injectable } from "@angular/core";

import { Day1 } from "../Model/2017/day1";
import { Day } from "../Model/day";

@Injectable()
export class DaysService {
  private days: Day[];

  constructor() {
    this.days = [new Day1()];
  }

  public getYears(): number[] {
    return [...Array.from(new Set(this.days.map(day => day.year).sort((n1, n2) => n2 - n1)))];
  }

  public getDays(): Day[] {
    return this.days.map(d => <Day>{ year: d.year, day: d.day });
  }

  public getDay(year: number, day: number): Day {
    return this.days.find(d => d.year === year && d.day === day);
  }

  public nextDayAvaiable(currentYear: number, currentDay: number): boolean {
    const nextDay = currentDay + 1;
    return this.days.filter(d => d.year === currentYear && d.day === nextDay).length > 0;
  }
}
