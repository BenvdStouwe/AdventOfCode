import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Day } from "../AdventOfCode/Model/day";
import { DaysService } from "../AdventOfCode/Services/days.service";

@Component({
  selector: "app-header-component",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.css"]
})

export class HeaderComponent implements OnInit {
  public days: Day[];
  public dayNavigation: FormGroup;
  public dayId: FormControl;
  @Input() title: string;

  constructor(private dayService: DaysService) { }

  public ngOnInit() {
    this.days = this.dayService.getDays();
    this.createForm();
  }

  public onSubmit() {
    if (this.dayNavigation.valid) {

    }
  }

  private createForm() {
    this.dayId = new FormControl("", Validators.required);

    this.dayNavigation = new FormGroup({
      day: this.dayId
    });
  }

  public getYears(): number[] {
    return this.dayService.getYears();
  }

  public getDaysOfYear(year: number): Day[] {
    return this.days.filter(day => day.year === year);
  }
}
