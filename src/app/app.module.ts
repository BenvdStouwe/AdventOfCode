import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { DaysService } from "./Common/Services/day.service";
import { HeaderComponent } from "./Header/header.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DaysService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
