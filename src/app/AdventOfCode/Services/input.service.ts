import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class InputService {
  private url = "http://adventofcode.com/2017/day/1/input";

  constructor(private httpClient: HttpClient) { }

  public getInput(year: number, day: number): any {
    return this.httpClient.get(this.url);
  }
}
