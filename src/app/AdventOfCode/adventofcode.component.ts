import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Day } from "./Model/day";
import { DaysService } from "./Services/days.service";
import { InputService } from "./Services/input.service";

@Component({
  selector: "app-adventofcode-component",
  templateUrl: "adventofcode.component.html"
})

export class AdventOfCodeComponent implements OnInit {
  private day: Day;
  private input: any;
  public nextDayAvailable: boolean;

  constructor(private route: ActivatedRoute, private dayService: DaysService, private inputService: InputService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const year = +params["year"];
        const day = +params["day"];
        this.day = this.dayService.getDay(year, day);
        this.nextDayAvailable = this.dayService.nextDayAvaiable(this.day.year, this.day.day);
        this.getInput(this.day);
      }
    );
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
