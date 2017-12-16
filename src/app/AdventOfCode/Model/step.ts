export class Step {
  public description?: string;
  public input: any;
  public result: any;
  public output: any;

  constructor(input: any, description?: string) {
    this.input = input;
    this.description = description;
  }
}
