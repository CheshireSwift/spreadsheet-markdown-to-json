const assert = require("assert");

function runTests(tests) {
  let pass = 0;
  const failures = [];

  tests.forEach(testRun => {
    const deets = { name: "a test" };
    try {
      testRun(deets);
      process.stdout.write(".");
      pass++;
    } catch (e) {
      process.stdout.write("x");
      failures.push({ deets, e });
    }
  });
  console.log(`\n\n${pass} passing tests, ${failures.length} failures.`);

  failures.forEach(failure => {
    console.error(
      `
Failure in ${failure.deets.name}:
    ${failure.e}` +
        (failure.e.expected
          ? `

Expected
${failure.e.expected}

Received
${failure.e.actual}`
          : "")
    );
  });
}

const convert = require(".");
runTests([
  test => {
    test.name = "Converts JSON to markdown";
    const markdown = convert.toMarkdown([
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"]
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

  test => {
    test.name = "Converts markdown to JSON";
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
      JSON.stringify([["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]])
    );
  }
]);
