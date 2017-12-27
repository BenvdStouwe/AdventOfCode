import { Component, Input } from "@angular/core";

@Component({
  selector: "app-daybutton-component",
  templateUrl: "daybutton.component.html"
})

export class DayButtonComponent {
  @Input() public dayNumber: number;
  @Input() public year: number;
  @Input() public text: string;
  @Input() public disabled: boolean;

  public getTitle(): string {
    return `Go to ${this.year}, day ${this.dayNumber}`;
  }
}
