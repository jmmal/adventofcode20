const fs = require("fs");

const birthday = (birthday) => {
  return +birthday >= 1920 && +birthday <= 2002;
}

const issue = (year) => {
  return +year >= 2010 && +year <= 2020;
}

const expiration = (year) => {
  return +year >= 2020 && +year <= 2030;
}

const height = (height) => {
  const groups = height.match(/(\d+)(cm|in)/)
  
  if (!groups) {
    return false;
  }

  if (groups[2] === 'cm') {
    return +groups[1] >= 150 && +groups[1] <= 193;
  }

  if (groups[2] === 'in') {
    return +groups[1] >= 59 && +groups[1] <= 76;
  }

  return false;
}

const hairColour = (color) => {
  return color.match(/#[0-9a-f]{6}$/)
}

const eyeColour = (colour) => {
  return colour.match(/amb|blu|brn|gry|grn|hzl|oth/)
}

const passport = (id) => {
  return id.match(/^\d{9}$/)
}

const validators = new Map([
  ['byr', birthday],
  ['iyr', issue],
  ['eyr', expiration],
  ['hgt', height],
  ['hcl', hairColour],
  ['pid', passport],
  ['hcl', hairColour],
  ['ecl', eyeColour]
]);

fs.readFile("./input.txt", "utf8", (err, data) => {
  const passports = data.split("\n\n");

  let invalid = 0;

  passports.forEach(line => {
    const matches = [...line.matchAll(/(ecl|pid|eyr|hcl|byr|hgt|iyr):(\S+)/g)];
    
    if (matches.length < 7) {
      invalid++;
      return;
    }

    for(let i = 0; i < matches.length; i++) {
      let match = matches[i];      
      const [key, value] = [ match[1], match[2] ];
      
      let validator = validators.get(key);

      if (!validator(value)) {
        invalid++;
        break;
      }
    }
  });

  console.log(passports.length - invalid);
});