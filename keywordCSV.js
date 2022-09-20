//@fileName: keywordCSV
//@description: CSVファイルを読み込み、それをarrayにまとめる

//@keyword genre: 商品名、商品詳細、カラー名、キーワード

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

function csvToArray(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  keywordList = ["productName", "productDescription", "colorName", "keyword"];
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToArray(text);
    const productList = keywordCount(data, keywordList);
    document.write(JSON.stringify(countList));
  };

  reader.readAsText(input);
});

function keywordCount(dataArray, keywordList) {
  var sortedList = {};
  var product = [];
  var description = [];
  var color = [];
  var keyword = [];
  var keyList = [];

  var i = 0;
  for (var i = 0; i < keywordList.length; i++) {
    sortedList[keywordList[i]] = [];
    sortedList[keywordList[i]] = _.pluck(arr, keywordList[i]);
  }
  product = sortedList[keywordList[0]];
  description = sortedList[keywordList[1]];
  color = sortedList[keywordList[2]];
  keyword = sortedList[keywordList[3]];

  keyList = _.union(product, description, color, keyword);
  return keyList;
}
