import { Component, Input, OnInit } from "@angular/core";

import { Day } from "../AdventOfCode/Model/day";
import { DaysService } from "../AdventOfCode/Services/days.service";

@Component({
  selector: "app-header-component",
  templateUrl: "header.component.html"
})

export class HeaderComponent implements OnInit {
  public days: Day[];
  @Input() title: string;

  constructor(private dayService: DaysService) { }

  ngOnInit() {
    this.days = this.dayService.getDays();
  }

  public getYears(): number[] {
    return [...Array.from(new Set(this.days.map(day => day.year).sort((n1, n2) => n2 - n1)))];
  }

  public getDaysOfYear(year: number): Day[] {
    return this.days.filter(day => day.year === year);
  }
}
