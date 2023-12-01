import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdventOfCodeComponent } from "./AdventOfCode/adventofcode.component";
import { HomeComponent } from "./Home/home.component";

const routes: Routes = [
  { path: "home", redirectTo: "", pathMatch: "full" },
  { path: "", component: HomeComponent },
  { path: "day/:year/:day", component: AdventOfCodeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
