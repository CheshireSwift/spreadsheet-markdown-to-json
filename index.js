function toMarkdown(sheetObject) {
  const [firstRow, ...rest] = sheetObject;
  const dividingLine = firstRow.map(() => "-");

  return [firstRow, dividingLine, ...rest]
    .map(row => "|" + row.join("|") + "|")
    .join("\n");
}

function toJSON(markdown) {
  const rows = markdown.split("\n");
  rows.splice(1, 1);
  return JSON.stringify(
    rows.map(row => row.substr(1, row.length - 2).split("|"))
  );
}

module.exports = {
  toMarkdown,
  toJSON
};
