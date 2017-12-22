import { Day } from "../day";
import { DayPart } from "../dayPart";
import { Step } from "../step";

export class Day4 extends Day {
    constructor() {
        super();
        this.year = 2017;
        this.day = 4;
    }

    protected calculatePart1(): void {
        let stepDescription: string, step: Step, stepResult: any, rows: string[];
        const part = new DayPart(`
        A new system policy has been put in place that requires all accounts to use a passphrase instead of simply a password.
        A passphrase consists of a series of words (lowercase letters) separated by spaces.

        To ensure security, a valid passphrase must contain no duplicate words.

        How many passphrases are valid?`);
        this.parts.push(part);
        stepDescription = "Sounds interessting. Let's look at our input.";
        step = part.newStep(this.input, stepDescription);
        stepResult = step.input;
        part.finishStep(step, stepResult);

        rows = this.getRows(step.input);

        stepDescription = `That's... a lot of input. Let's look at the first row. No two words in this passphrase may be the same.
        Is this passphrase correct?`;
        step = part.newStep(rows, stepDescription);
        stepResult = rows[0];
        part.finishStep(step, stepResult);

        stepDescription = `The answer is ${this.hasDuplicateWords(step.output) ? "no" : "yes"}.`;
        step = part.newStep(step.output, stepDescription);
        stepResult = null;
        part.finishStep(step, stepResult);

        stepDescription = `Now we'll repeat that step for all passphrases and sum all that pass the test.`;
        step = part.newStep(rows, stepDescription);
        stepResult = rows.filter(row => !this.hasDuplicateWords(row)).length;
        part.finishStep(step, stepResult);
    }

    protected calculatePart2(): void {

    }

    private getRows(input: string): string[] {
        return input.split("\n");
    }

    private hasDuplicateWords(passphrase: string): boolean {
        const words = passphrase.split(" ");
        let sum = 0;
        if (words.length === 0) { return true; } // because invalid passphrase
        for (const word of words) {
            if (words.filter(w => word.localeCompare(w) === 0).length > 1) {
                sum += 1;
                console.log(`${words} contrains ${word} multiple times`);
                break;
            }
        }
        console.log(sum);
        return words.some(w => words.filter(w2 => w.localeCompare(w2) === 0).length > 1);
    }
}
