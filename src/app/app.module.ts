import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from ".//app-routing.module";
import { AdventOfCodeComponent } from "./AdventOfCode/adventofcode.component";
import { DayButtonComponent } from "./AdventOfCode/Components/daybutton.component";
import { PaginationComponent } from "./AdventOfCode/Components/pagination.component";
import { DaysService } from "./AdventOfCode/Services/days.service";
import { InputService } from "./AdventOfCode/Services/input.service";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./Header/header.component";
import { HomeComponent } from "./Home/home.component";

@NgModule({
  declarations: [
    // Main
    AppComponent,
    HeaderComponent,
    HomeComponent,

    // AoC
    AdventOfCodeComponent,
    DayButtonComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    DaysService,
    InputService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
