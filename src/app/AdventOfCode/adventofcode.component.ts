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

  constructor(private route: ActivatedRoute, private dayService: DaysService, private inputService: InputService) { }

  ngOnInit() {
    this.getInput();
  }

  private getInput(): void {
    const dayId = +this.route.snapshot.paramMap.get("id");
    this.day = this.dayService.getDay(dayId);

    this.inputService.getInput(this.day.year, this.day.day).subscribe(data => {
      console.log(data);
    });
  }
}
