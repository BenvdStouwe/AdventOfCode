import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class InputService {
  private dataDirectory = "app/AdventOfCode/Data";

  constructor(private httpClient: HttpClient) { }

  public getInput(year: number, day: number): any {
    const url = `${this.dataDirectory}/${year}/${day}`;
    return this.httpClient.get(url, { responseType: "text", withCredentials: true });
  }
}
