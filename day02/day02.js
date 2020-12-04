const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  const lines = data.split("\n");
  let validPasswords1 = 0;
  let validPasswords2 = 0;

  lines.forEach((line) => {
    if (part1(line)) {
      validPasswords1++;
    }

    if (part2(line)) {
      validPasswords2++;
    }
  });

  console.log("Part 1: " + validPasswords1);
  console.log("Part 2: " + validPasswords2);
});

const part1 = (line) => {
  const [rule, password] = line.split(": ");
  const [bounds, letter] = rule.split(" ");
  const [lower, upper] = bounds.split("-");

  let charCount = 0;

  for (let i = 0; i < password.length; i++) {
    if (password.charAt(i) === letter) {
      charCount++;
    }
  }

  return charCount >= +lower && charCount <= +upper;
};

const part2 = (line) => {
  const [rule, password] = line.split(": ");
  const [bounds, letter] = rule.split(" ");
  const [lower, upper] = bounds.split("-");

  const pos1Valid = password.charAt(+lower - 1) === letter;
  const pos2Valid = password.charAt(+upper - 1) === letter;

  return pos1Valid ? !pos2Valid : pos2Valid; // XOR
};
