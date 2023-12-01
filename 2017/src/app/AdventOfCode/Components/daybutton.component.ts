import { Component, Input } from "@angular/core";

import { Day } from "../Model/day";

@Component({
    selector: "app-daybutton-component",
    templateUrl: "daybutton.component.html"
})

export class DayButtonComponent {
    @Input() public day: Day;
    @Input() public text: string;
}
