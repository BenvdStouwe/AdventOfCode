export class Step {
  public description?: string;
  public input: any;
  public result: any;
  public output: any;
  public isCalculating: boolean;

  constructor(input: any, description?: string) {
    this.input = input;
    this.description = description;
  }
}
