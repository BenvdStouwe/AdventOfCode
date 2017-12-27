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
  private input: any;
  public alerts: Alert[];
  public day: Day;

  constructor(private route: ActivatedRoute, private dayService: DaysService, private inputService: InputService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const year = +params["year"];
        const day = +params["day"];
        this.day = this.dayService.getDay(year, day);
        this.getInput(this.day);
      }
    );
  }

  private getInput(day: Day): void {
    // if (!day) {
    //   this.alerts.push(new Alert("danger", "This day was not found."));
    //   return;
    // }
    this.inputService.getInput(day.year, day.day).subscribe(data => {
      this.day.createSteps(data);
    });
  }
}

export class Alert {
  static _id: number;
  id: number;
  type: string;
  message: string;

  constructor(type: string, message: string) {
    Alert._id += 1;
    this.id = Alert._id;
    this.type = type;
    this.message = message;
  }
}
