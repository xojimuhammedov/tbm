const fs = require("fs");
const path = require("path");

const dir =
  "c:/Users/zuxrd/OneDrive/Рабочий стол/tbm/src/pages/rh-252/a-252/components/View";
const files = fs.readdirSync(dir).filter((f) => f.endsWith("view.tsx"));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Find the class string containing 'bg-white' and 'min-h-[1100px]'
  // and inject 'h-fit' to ensure it stretches to its content height.
  content = content.replace(
    /className="(.*?bg-white.*?min-h-\[1100px\].*?)"/g,
    (match, classes) => {
      if (!classes.includes("h-fit")) {
        return `className="${classes} h-fit"`;
      }
      return match;
    },
  );

  fs.writeFileSync(filePath, content, "utf8");
}
