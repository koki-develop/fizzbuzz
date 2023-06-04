export const fizzbuzz = (n: number): string => {
  const multipleOf3 = n % 3 === 0;
  const multipleOf5 = n % 5 === 0;

  if (multipleOf3 && multipleOf5) return "FizzBuzz";
  if (multipleOf3) return "Fizz";
  if (multipleOf5) return "Buzz";

  return n.toString();
};
