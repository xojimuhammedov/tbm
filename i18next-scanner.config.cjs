"use strict";
const fs = require("fs");

module.exports = {
  input: ["./src/**/*.ts", "./src/**/*.tsx"], // Glob patterns to match your source code files.
  output: "./",
  options: {
    lngs: ["ru", "uz", "en"],
    debug: true,
    sort: true,
    plural: true,
    defaultNs: "common",
    ns: ["common", "ERROR", "validation"],
    resource: {
      loadPath: "public/locales/{{lng}}/{{ns}}.json",
      savePath: "public/locales/{{lng}}/{{ns}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    defaultValue: (lng, ns, key) => (lng === "en" ? key : ""),
    func: {
      list: ["t"], // This should match the function you use for translations in your code (e.g., 't' or 'i18n.t').
      extensions: [".ts", ".tsx"],
    },
  },
  transform: function customTransform(file, enc, done) {
    this.parser.options.defaultNs = "common";

    const content = fs.readFileSync(file.path, enc);
    const useTranslationRegex =
      /useTranslation\(\s*(?:['"]([^'"]+)['"]|\[([^\]]+)\])\s*\)/g;
    const detectedNamespaces = [];
    let match;

    while ((match = useTranslationRegex.exec(content)) !== null) {
      if (match[1]) {
        detectedNamespaces.push(match[1]);
      }
      if (match[2]) {
        match[2].split(",").forEach((ns) => {
          detectedNamespaces.push(ns.trim().replace(/['"]/g, ""));
        });
      }
    }

    if (/schema\.ts$/i.test(file.path)) {
      detectedNamespaces.push("validation");
    }

    if (detectedNamespaces.length > 0) {
      this.parser.options.defaultNs = detectedNamespaces[0];
    }
    console.log(file.path, this.parser.options.defaultNs, detectedNamespaces);
    this.parser.parseFuncFromString(content);
    done();
  },
};
