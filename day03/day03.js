const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  const lines = data.split("\n");

  const grid = [];

  lines.forEach((line) => {
    grid.push(line.split(''));
  });

  part1(grid);

  const p2 = part2(grid, 1, 1) * part2(grid, 3, 1) * part2(grid, 5, 1) * part2(grid, 7, 1) * part2(grid, 1, 2)
  console.log(p2);
});

const part1 = (grid) => {
  let row = 0;
  let col = 0;
  let trees = 0;

  while(row < grid.length) {
    console.log(`Checking row: ${row} and col: ${col}`);

    if (grid[row][col] === '#') {
      trees++;
    }

    row += 1;
    col = (col + 3) % grid[0].length;
  }

  console.log(trees);
}

const part2 = (grid, right, down) => {
  let row = 0;
  let col = 0;
  let trees = 0;

  while(row < grid.length) {
    console.log(`Checking row: ${row} and col: ${col}`);

    if (grid[row][col] === '#') {
      trees++;
    }

    row += down;
    col = (col + right) % grid[0].length;
  }

  return trees;
}
