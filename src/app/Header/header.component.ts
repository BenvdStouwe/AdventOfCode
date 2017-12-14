import { Component, OnInit } from "@angular/core";

import { Day, DaysService } from "../AdventOfCode/Services/day.service";

@Component({
  selector: "app-header-component",
  templateUrl: "header.component.html"
})

export class HeaderComponent implements OnInit {
  private days: Day[];
  constructor(private dayService: DaysService) { }

  ngOnInit() {
    this.days = this.dayService.getDays();
  }

  public getYears(): number[] {
    const years = [...Array.from(new Set(this.days.map(day => day.year)))];
    return years;
  }

  public getDaysOfYear(year: number): Day[] {
    const days = this.days.filter(day => day.year === year);
    return days;
  }
}
