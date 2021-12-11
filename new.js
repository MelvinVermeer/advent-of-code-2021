const fs = require("fs");
const shell = require("child_process").execSync;

const currentDayNumbers = fs
  .readdirSync("src/")
  .filter((file) => fs.lstatSync("src/" + file).isFile())
  .map((filename) => filename.split("-")[0])
  .map((x) => Number(x));

const nextDay = Math.max(...currentDayNumbers) + 1;
const title = process.argv[process.argv.length - 1];
const kebabTitle = title.replace(/ /g, "-").toLowerCase();
const newNumber = nextDay.toString().padStart(2, "0");

const cb = (err) => {
  if (err) throw err;
};

fs.copyFile("test/data/00", `test/data/${newNumber}`, cb);

fs.copyFile("test/00.test.ts", `test/${newNumber}.test.ts`, cb);

fs.copyFile("src/00-template.ts", `src/${newNumber}-${kebabTitle}.ts`, cb);

shell(
  `sed -i "" "s!00 - Template!${newNumber} - ${title}!g" ./test/${newNumber}.test.ts`
);

shell(
  `sed -i "" "s!00-template!${newNumber}-${kebabTitle}!g" ./test/${newNumber}.test.ts`
);

shell(`sed -i "" "s!data/00!data/${newNumber}!g" ./test/${newNumber}.test.ts`);
