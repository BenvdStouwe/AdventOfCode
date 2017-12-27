import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { OnChanges } from "@angular/core/src/metadata/lifecycle_hooks";

import { Day } from "../Model/day";
import { DaysService } from "../Services/days.service";

@Component({
  selector: "app-pagination-component",
  templateUrl: "pagination.component.html"
})
// currently used for days in the same year
export class PaginationComponent implements OnInit, OnChanges {
  @Input() public day: Day;

  public relativeDaysNumbers: number[];

  constructor(private daysService: DaysService) { }

  ngOnInit() {
    this.getRelativeDayNumbers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["day"]) {
      const day: Day = changes["day"].currentValue;
      const previousDay: Day = changes["day"].previousValue;

      if (previousDay && day.year !== previousDay.year) {
        this.getRelativeDayNumbers();
      }
    }
  }

  public isSameDay(dayNumber: number): boolean {
    return dayNumber === this.day.day;
  }

  public getFirstDayNumber(): number {
    return Math.min(...this.relativeDaysNumbers);
  }

  public getLastDayNumber(): number {
    return Math.max(...this.relativeDaysNumbers);
  }

  public getPreviousDayNumber(): number {
    return Math.max(...this.relativeDaysNumbers.filter(d => d < this.day.day));
  }

  public getNextDayNumber(): number {
    return Math.min(...this.relativeDaysNumbers.filter(d => d > this.day.day));
  }

  private getRelativeDayNumbers(): void {
    this.relativeDaysNumbers = this.daysService.getDayNumbersOfYear(this.day.year);
  }
}
