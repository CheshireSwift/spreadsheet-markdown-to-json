const describe = require("./describe");
const assert = require("assert");

const convert = require(".");
describe("The markdown/JSON converter", [
  it => {
    it("converts JSON to markdown");
    const markdown = convert.toMarkdown([
      [{ value: "a" }, { value: "b" }, { value: "c" }],
      [{ value: "d" }, { value: "e" }, { value: "f" }],
      [{ value: "g" }, { value: "h" }, { value: "i" }]
    ]);
    assert.strictEqual(
      markdown,
      `
|a|b|c|
|-|-|-|
|d|e|f|
|g|h|i|
    `.trim()
    );
  },

  it => {
    it("converts markdown to JSON");
    const json = convert.toJSON(
      `
|a|b|c|
|-|-|-|
|d|e|f|
|g|h|i|
    `.trim()
    );
    assert.strictEqual(
      json,
      JSON.stringify([
        [{ value: "a" }, { value: "b" }, { value: "c" }],
        [{ value: "d" }, { value: "e" }, { value: "f" }],
        [{ value: "g" }, { value: "h" }, { value: "i" }]
      ])
    );
  },

  it => {}
]);
