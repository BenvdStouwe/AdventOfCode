import { Injectable } from "@angular/core";

import { Day } from "../Model/day";
import { DayPart } from "../Model/dayPart";
import { Step } from "../Model/step";

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
}

class Day1 extends Day {
  constructor() {
    super();
    this.year = 2017;
    this.day = 1;
  }

  public createSteps(input: string) {
    this.parts.push(this.createStepsPart1(input));
  }

  private createStepsPart1(input: string) {

    // tslint:disable-next-line:max-line-length
    const part = new DayPart(`You're standing in a room with "digitization quarantine" written in LEDs along one wall. The only door is locked, but it includes a small interface. "Restricted Area - Strictly No Digitized Users Allowed."
      It goes on to explain that you may only leave by solving a captcha to prove you're not a human. Apparently, you only get one millisecond to solve the captcha: too fast for a normal human, but it feels like hours to you.
      The captcha requires you to review a sequence of digits(your puzzle input) and find the sum of all digits that match the next digit in the list.The list is circular, so the digit after the last digit is the first digit in the list.`);
    const step1 = new Step(input);
    part.steps.push(step1);
    step1.description = "";

    return part;
  }
}
