import { Step } from "./step";

export class DayPart {
  public challenge: string;
  public steps: Step[];

  constructor(challenge: string) {
    this.challenge = challenge;
    this.steps = new Array<Step>();
  }

  public newStep(input: any, description: string): Step {
    const step = new Step(input, description);
    step.isCalculating = true;
    this.steps.push(step);
    return step;
  }

  public finishStep(step: Step, output: any) {
    step.output = output;
    step.isCalculating = false;
  }
}
