//@fileName: keywordCSV
//@description: CSVファイルを読み込み、それをarrayにまとめる

const myForm = document.getElementById("myForm");
const tsvFile = document.getElementById("tsvFile");

function tsvToArray(str, delimiter = "\t") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  return arr;
}
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Form submitted");
  const input = tsvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    document.write(text);
  };
  reader.readAsText(input);
});
