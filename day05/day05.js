const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  const boardingPasses = data.split("\n");
  const seatMap = new Map();

  boardingPasses.forEach(pass => {
    let rowBottom = 0;
    let rowTop = 127;
    let rowDivider = 64;

    let colLeft = 0;
    let colRight = 7;
    let colDivider = 4;

    for(let i = 0; i < pass.length; i++) {
      const char = pass.charAt(i);
      
      if (char === 'F') {
        rowTop -= rowDivider;
      } else if (char === 'B') {
        rowBottom += rowDivider;
      }
      
      if (char === 'L') {
        colRight -= colDivider;
      } else if (char === 'R') {
        colLeft += colDivider;
      }
      
      if (char === 'L' || char === 'R') {
        console.log(`Taking ${char} Current seat: ${colLeft} - ${colRight}`)
        colDivider /= 2;
      }

      rowDivider /= 2;
    }

    const row = seatMap.get(rowBottom) || [];
    row.push(colLeft);
    seatMap.set(rowBottom, row);
  });

  const rows = [];
  for (const [rowNum, seats] of seatMap.entries()) {
    if (seats.length < 8) {
      console.log(rowNum, seats)
    }
  }
});