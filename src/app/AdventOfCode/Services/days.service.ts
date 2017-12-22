import { Injectable } from "@angular/core";

import { Day1 } from "../Model/2017/day1";
import { Day2 } from "../Model/2017/day2";
import { Day3 } from "../Model/2017/day3";
import { Day4 } from "../Model/2017/day4";
import { Day } from "../Model/day";

@Injectable()
export class DaysService {
  private days: Day[];

  constructor() {
    this.days = [new Day1(), new Day2(), new Day3(), new Day4()];
  }

  public getYears(): number[] {
    return [...Array.from(new Set(this.days.map(day => day.year).sort((n1, n2) => n2 - n1)))];
  }

  public getDays(): Day[] {
    return this.days.map(d => this.makeBasicDay(d));
  }

  public getDay(year: number, day: number): Day {
    return this.days.find(d => d.year === year && d.day === day);
  }

  public getRelativeDay(day: Day, type: relativeDayType): Day {
    let relativeDay: Day;
    switch (type) {
      case relativeDayType.next:
        // get first day of days later than attached day
        relativeDay = this.days.find(d => d.year === day.year
          && d.day === Math.min(...this.getDayNumbersOfYear(day.year).filter(number => number > day.day)));

        // if no later day is found, check if there is a first one in the next year
        if (!relativeDay) {
          relativeDay = this.getFirstDayOfNextYear(day.year);
        }
        break;
      case relativeDayType.previous:
        // get last day of days earlier than attached day
        relativeDay = this.days.find(d => d.year === day.year
          && d.day === Math.max(...this.getDayNumbersOfYear(day.year).filter(number => number < day.day)));

        // if no earlier day is found, check if there is a last one in the previous year
        if (!relativeDay) {
          relativeDay = this.getLastDayOfPreviousYear(day.year);
        }
        break;
      case relativeDayType.first:
        // get first day of year, but not when that's the attached day
        relativeDay = this.days.find(d => d.year === day.year
          && d.day === Math.min(...this.getDayNumbersOfYear(day.year)));
        break;
      case relativeDayType.last:
        // get last day of year, but not when that's the attached day
        relativeDay = this.days.find(d => d.year === day.year
          && d.day === Math.max(...this.getDayNumbersOfYear(day.year)));
        break;
      default:
        relativeDay = null;
    }
    return this.makeBasicDay(relativeDay ? relativeDay : day);
  }

  private getDayNumbersOfYear(year: number): number[] {
    return this.days.filter(d => d.year === year).map(d => d.day);
  }

  private getFirstDayOfNextYear(currentYear: number): Day {
    const nextYear = Math.min(...this.getYears().filter(y => y > currentYear));
    return this.days.find(d => d.year === nextYear && d.day === Math.min(...this.getDayNumbersOfYear(nextYear)));
  }

  private getLastDayOfPreviousYear(currentYear: number): Day {
    const previousYear = Math.max(...this.getYears().filter(y => y < currentYear));
    return this.days.find(d => d.year === previousYear && d.day === Math.max(...this.getDayNumbersOfYear(previousYear)));
  }

  private makeBasicDay(day: Day) {
    if (!day) {
      return null;
    }
    return <Day>{ year: day.year, day: day.day };
  }
}

export enum relativeDayType {
  next = 0,
  previous,
  first,
  last
}
