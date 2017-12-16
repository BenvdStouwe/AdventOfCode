import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from ".//app-routing.module";
import { AdventOfCodeComponent } from "./AdventOfCode/adventofcode.component";
import { DaysService } from "./AdventOfCode/Services/days.service";
import { InputService } from "./AdventOfCode/Services/input.service";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./Header/header.component";
import { HomeComponent } from "./Home/home.component";


@NgModule({
  declarations: [
    AdventOfCodeComponent,
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DaysService,
    InputService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
