function describe(feature, tests) {
  const passes = [];
  const failures = [];

  const it = (description, testRun) => {
    try {
      testRun();
      process.stdout.write(".");
      passes.push(description);
    } catch (e) {
      process.stdout.write("x");
      failures.push({ description, e });
    }
  };

  tests(it);

  console.log(
    `\n\n${passes.length} passing tests, ${failures.length} failures.`
  );

  failures.forEach(failure => {
    console.error(
      `
Failure in "it ${failure.description}":
    ${failure.e}
` +
        (failure.e.expected
          ? `
Expected
${failure.e.expected}

Received
${failure.e.actual}
`
          : "")
    );
  });

  console.log(feature);
  console.log(passes.map(p => "  " + p + " ⭕️").join("\n"));
  console.log(failures.map(f => "  " + f.description + " ❌").join("\n"));
}

module.exports = describe;
