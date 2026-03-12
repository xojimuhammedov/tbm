const fs = require("fs");
const path = require("path");

const dir =
  "c:/Users/zuxrd/OneDrive/Рабочий стол/tbm/src/pages/rh-252/a-252/components/View";
const files = fs.readdirSync(dir).filter((f) => f.endsWith("view.tsx"));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Fix the asComponent block to include the header
  content = content.replace(
    /if\s*\(asComponent\)\s*\{\s*return\s*<>\s*\{modalInstance\.props\.children\}\s*<\/>;\s*\}/g,
    `if (asComponent) {
    return (
      <div className="flex flex-col h-full bg-gray-100 overflow-hidden relative">
        <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-200 w-full shadow-sm shrink-0">
          {modalInstance.props.header}
        </div>
        <div className="flex-1 overflow-auto">
          {modalInstance.props.children}
        </div>
      </div>
    );
  }`,
  );

  fs.writeFileSync(filePath, content, "utf8");
}
