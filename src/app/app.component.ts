import { Component } from "@angular/core";

import { Day } from "./AdventOfCode/Model/day";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public title = "Bens AoC";
  private selectedDay: Day;

  constructor() { }
}
