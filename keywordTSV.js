//@fileName: keywordCSV
//@description: CSVファイルを読み込み、それをarrayにまとめる
const keywordList = [
  "product_name",
  "product_price",
  "product_price_tax",
  "brand_code",
];
const tsvForm = document.getElementById("tsvForm");
const tsvFile = document.getElementById("tsvFile");

function tsvArray2(str, delimiter = "\t") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  for (var i = 0; i < headers.length; i++) {
    headers[i] = headers[i].replace(/"/g, "");
  }
  const rows = str.slice(str.indexOf("\n")).split("\t");

  let arr = {};
  let countIndex = headers.length - 1;
  //console.log(countIndex);

  for (var i = 0; i < headers.length; i++) {
    let index = countIndex * i;
    let endPoint = index + countIndex;
    console.log(endPoint);
    let rowIndex = rows.slice(index, endPoint);
    console.log(rowIndex);
    arr = _.object(headers, rowIndex);
  }
  console.log(arr);
}
function tsvToArray(str, delimiter = "\t") {
  const headers = str.slice(0, str.indexOf("\r")).split(delimiter);
  for (var i = 0; i < headers.length; i++) {
    headers[i] = headers[i].replace(/"/g, "");
  }
  //console.log(headers.length);

  const rows = str.slice(str.indexOf("\n")).split("\t");

  const countIndex = headers.length - 1;
  //console.log(countIndex);
  let arr = [];
  for (var i = 0; i < headers.length; i++) {
    arr[i] = {};
    let index = countIndex * i;
    for (var j = 0; j < 74; j++) {
      index = index + j;
      arr[i][headers[j]] = rows[index];
    }
  }

  return arr;
}
tsvForm.addEventListener("submit", function (e) {
  e.preventDefault();

  //console.log("Form submitted");
  const input = tsvFile.files[0];
  const reader = new FileReader();
  const count = {};

  reader.onload = function (e) {
    const text = e.target.result;
    const tsvData = tsvToArray(text);
    tsvArray2(text);
    //console.log(tsvData);
    const keywordData = keyWordCount(tsvData, keywordList);

    document.write(JSON.stringify(keywordData));
  };
  reader.readAsText(input);
});

function keyWordCount(arr, keywordList) {
  var sortedList = {};
  var keyList = [];
  for (var i = 0; i < keywordList.length; i++) {
    sortedList[keywordList[i]] = [];
    sortedList[keywordList[i]] = _.pluck(arr, keywordList[i]);
    //document.write(JSON.stringify(sortedList[keywordList[i]]));
  }
  var productName = sortedList[keywordList[0]];
  var productInfo = sortedList[keywordList[1]];
  var productColor = sortedList[keywordList[2]];
  var productKeyword = sortedList[keywordList[3]];

  //keyList = _.values(sortedList);
  //console.log(productColor);
  return sortedList;
}
