import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdventOfCodeComponent } from "./AdventOfCode/adventofcode.component";

const routes: Routes = [
  { path: "day", component: AdventOfCodeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
