import { Injectable } from "@angular/core";

import { Year2016Day1 } from "../Model/2016/day1";
import { Day1 } from "../Model/2017/day1";
import { Day17 } from "../Model/2017/day17";
import { Day2 } from "../Model/2017/day2";
import { Day3 } from "../Model/2017/day3";
import { Day4 } from "../Model/2017/day4";
import { Day } from "../Model/day";

@Injectable()
export class DaysService {
  private days: Day[];

  constructor() {
    this.days = [
      ...this.getYear2016(),
      ...this.getYear2017()
    ];
  }

  public getYears(): number[] {
    return [...Array.from(new Set(this.days.map(day => day.year))).sort((n1, n2) => n2 - n1)];
  }

  public getDays(year?: number): Day[] {
    const days = year ? this.days.filter(d => d.year === year) : this.days;
    return days;
  }

  public getDay(year: number, day: number): Day {
    return this.days.find(d => d.year === year && d.day === day);
  }

  public getDayNumbersOfYear(year: number): number[] {
    return this.days.filter(d => d.year === year).map(d => d.day);
  }

  private getYear2016(): Day[] {
    return [
      new Year2016Day1()
    ];
  }

  private getYear2017(): Day[] {
    return [
      new Day1(), new Day2(), new Day3(), new Day4(),
      new Day17()
    ];
  }
}
