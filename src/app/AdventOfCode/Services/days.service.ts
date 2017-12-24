import { Injectable } from "@angular/core";

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
      ...this.getYear2017()
    ];
  }

  public getYears(): number[] {
    return [...Array.from(new Set(this.days.map(day => day.year))).sort((n1, n2) => n2 - n1)];
  }

  public getDays(year?: number): Day[] {
    const days = year ? this.days.filter(d => d.year === year) : this.days;
    return days.map(d => this.getBasicDay(d));
  }

  public getDay(year: number, day: number): Day {
    return this.days.find(d => d.year === year && d.day === day);
  }

  public getRelativeDay(day: Day, type: relativeDayType): Day {
    let relativeDay: Day;
    let relativeDayNumber: number;
    switch (type) {
      case relativeDayType.next:
        // get first day of days later than attached day
        relativeDayNumber = Math.min(...this.getDayNumbersOfYear(day.year).filter(number => number > day.day));
        relativeDay = <Day>{ year: day.year, day: Number.isInteger(relativeDayNumber) ? relativeDayNumber : day.day };

        // if no later day is found, check if there is one in the next year
        if (!relativeDay) {
          relativeDay = this.getFirstDayOfNextYear(day.year);
        }
        break;
      case relativeDayType.previous:
        // get last day of days earlier than attached day
        relativeDayNumber = Math.max(...this.getDayNumbersOfYear(day.year).filter(number => number < day.day));
        relativeDay = <Day>{ year: day.year, day: Number.isInteger(relativeDayNumber) ? relativeDayNumber : day.day };

        // if no earlier day is found, check if there is one in the previous year
        if (!relativeDay) {
          relativeDay = this.getLastDayOfPreviousYear(day.year);
        }
        break;
      case relativeDayType.first:
        relativeDayNumber = Math.min(...this.getDayNumbersOfYear(day.year));
        relativeDay = <Day>{ year: day.year, day: Number.isInteger(relativeDayNumber) ? relativeDayNumber : day.day };
        break;
      case relativeDayType.last:
        relativeDayNumber = Math.max(...this.getDayNumbersOfYear(day.year));
        relativeDay = <Day>{ year: day.year, day: Number.isInteger(relativeDayNumber) ? relativeDayNumber : day.day };
        break;
      default:
        relativeDay = null;
    }
    return relativeDay ? relativeDay : day;
  }

  public getDayNumbersOfYear(year: number): number[] {
    return this.days.filter(d => d.year === year).map(d => d.day);
  }

  private getFirstDayOfNextYear(currentYear: number): Day {
    const nextYear = Math.min(...this.getYears().filter(y => y > currentYear));
    const firstDay = Math.min(...this.getDayNumbersOfYear(nextYear));
    return <Day>{ year: nextYear, day: firstDay };
  }

  private getLastDayOfPreviousYear(currentYear: number): Day {
    const previousYear = Math.max(...this.getYears().filter(y => y < currentYear));
    const lastDay = Math.max(...this.getDayNumbersOfYear(previousYear));
    return <Day>{ year: previousYear, day: lastDay };
  }

  private getBasicDay(day: Day): Day {
    if (!day) {
      return null;
    }
    return <Day>{ year: day.year, day: day.day };
  }

  private getYear2017(): Day[] {
    return [
      new Day1(), new Day2(), new Day3(), new Day4(),
      new Day17()
    ];
  }
}

export enum relativeDayType {
  next = 0,
  previous,
  first,
  last
}
