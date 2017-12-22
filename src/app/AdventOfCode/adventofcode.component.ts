import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Day } from "./Model/day";
import { DaysService, relativeDayType } from "./Services/days.service";
import { InputService } from "./Services/input.service";

@Component({
  selector: "app-adventofcode-component",
  templateUrl: "adventofcode.component.html"
})

export class AdventOfCodeComponent implements OnInit {
  private input: any;
  public day: Day;

  // relative days
  public nextDay: Day;
  public previousDay: Day;
  public firstDay: Day;
  public lastDay: Day;

  constructor(private route: ActivatedRoute, private dayService: DaysService, private inputService: InputService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const year = +params["year"];
        const day = +params["day"];
        this.day = this.dayService.getDay(year, day);
        this.setRelativeDays(this.day);
        this.getInput(this.day);
      }
    );
  }

  private setRelativeDays(day: Day): void {
    this.firstDay = this.dayService.getRelativeDay(this.day, relativeDayType.first);
    this.previousDay = this.dayService.getRelativeDay(this.day, relativeDayType.previous);
    this.nextDay = this.dayService.getRelativeDay(this.day, relativeDayType.next);
    this.lastDay = this.dayService.getRelativeDay(this.day, relativeDayType.last);
  }

  private getInput(day: Day): void {
    if (!day) {
      alert("There is no day");
      return;
    }
    this.inputService.getInput(day.year, day.day).subscribe(data => {
      this.day.createSteps(data);
    });
  }
}
