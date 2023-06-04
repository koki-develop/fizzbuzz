import { fizzbuzz } from "./fizzbuzz";
import { describe, expect, test } from "vitest";

test("fizzbuzz", () => {
  const testcases: [number, string][] = [
    [1, "1"],
    [2, "2"],
    [3, "Fizz"],
    [4, "4"],
    [5, "Buzz"],
    [6, "Fizz"],
    [7, "7"],
    [8, "8"],
    [9, "Fizz"],
    [10, "Buzz"],
    [11, "11"],
    [12, "Fizz"],
    [13, "13"],
    [14, "14"],
    [15, "FizzBuzz"],

    [18, "Fizz"],
    [20, "Buzz"],
    [21, "Fizz"],
    [24, "Fizz"],
    [25, "Buzz"],
    [27, "Fizz"],
    [30, "FizzBuzz"],

    [33, "Fizz"],
    [35, "Buzz"],
    [36, "Fizz"],
    [39, "Fizz"],
    [40, "Buzz"],
    [42, "Fizz"],
    [45, "FizzBuzz"],
  ];

  for (const testcase of testcases) {
    const [input, expected] = testcase;
    const actual = fizzbuzz(input);
    expect(actual).toBe(expected);
  }
});
