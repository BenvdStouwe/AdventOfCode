import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from ".//app-routing.module";
import { DaysService } from "./AdventOfCode/Services/days.service";
import { InputService } from "./AdventOfCode/Services/input.service";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./Header/header.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DaysService,
    InputService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
