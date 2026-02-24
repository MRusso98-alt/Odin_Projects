import { capitalize } from "./base.js";
import { reverseString } from "./base.js";
import { calculator } from "./base.js";
import { caesar } from "./base.js";
import { analyzeArray } from "./base.js";

test("capitalize", () => {
    expect(capitalize("ciao")).toBe("Ciao");
});

test("reverse", () => {
    expect(reverseString("loop")).toBe("pool");
});

test("calculator", ()=>{
    const calc = new calculator();

    expect(calc.sum(1, 2)).toBe(3);
    expect(calc.subtract(9, 5)).toBe(4);
    expect(calc.multiply(2, 6)).toBe(12);
    expect(calc.divide(10, 5)).toBe(2);
});

test("caesar", ()=>{
    expect(caesar("fAIlure", 3)).toBe("iDLoxuh");
    expect(caesar("fAIlure", 29)).toBe("iDLoxuh");
});

test("analyze", ()=>{
    expect(analyzeArray([1, 2, 3, 4, 5, 6, 7, 8])).toEqual({average:36/8, min:1, max:8, length:8});
});