function toMarkdown(sheetObject) {
  const [firstRow, ...rest] = sheetObject;
  const dividingLine = firstRow.map(() => ({ value: "-" }));

  return [firstRow, dividingLine, ...rest]
    .map(row => "|" + row.map(c => c.value).join("|") + "|")
    .join("\n");
}

function toJSON(markdown) {
  const rows = markdown.split("\n");
  rows.splice(1, 1);
  return JSON.stringify(
    rows.map(row =>
      row
        .substr(1, row.length - 2)
        .split("|")
        .map(c => ({ value: c }))
    )
  );
}

module.exports = {
  toMarkdown,
  toJSON
};
