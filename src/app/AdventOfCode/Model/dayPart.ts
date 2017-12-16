import { Step } from "./step";

export class DayPart {
  public challenge: string;
  public steps: Step[];

  constructor(challenge: string) {
    this.challenge = challenge;
    this.steps = new Array<Step>();
  }
}
