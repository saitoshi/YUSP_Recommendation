//@fileName: keywordCSV
//@description: CSVファイルを読み込み、それをarrayにまとめる

const tsvForm = document.getElementById("tsvForm");
const tsvFile = document.getElementById("tsvFile");

function tsvToArray2(str, delimiter = "\t") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  for (var i = 0; i < headers.length; i++) {
    headers[i] = headers[i].replace(/"/g, "");
  }
  const rows = str.slice(str.indexOf("\n")).split("\t");

  var arr = [];
  let countIndex = headers.length - 1;

  for (var i = 0; i < headers.length; i++) {
    let index = countIndex * i;
    var obj = {};
    let endPoint = index + countIndex;
    let rowWork = rows.slice(index, endPoint);
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = rowWork[j];
    }
    arr.push(obj);
  }
  return arr;
}
/** 
function tsvArray2(str, delimiter = "\t") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  for (var i = 0; i < headers.length; i++) {
    headers[i] = headers[i].replace(/"/g, "");
  }
  const rows = str.slice(str.indexOf("\n")).split("\t");

  let list = {};
  let arr = [];
  let countIndex = headers.length - 1;
  //console.log(countIndex);

  for (var i = 0; i < headers.length; i++) {
    let index = countIndex * i;
    let endPoint = index + countIndex;
    let rowIndex = rows.slice(index, endPoint);
  }
  console.log(arr);
  return arr;
}
function tsvToArray(str, delimiter = "\t") {
  const headers = str.slice(0, str.indexOf("\r")).split(delimiter);
  for (var i = 0; i < headers.length; i++) {
    headers[i] = headers[i].replace(/"/g, "");
  }
  //console.log(headers);

  const rows = str.slice(str.indexOf("\n")).split("\t");

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
*/
tsvForm.addEventListener("submit", function (e) {
  e.preventDefault();

  //console.log("Form submitted");

  const input = tsvFile.files[0];
  const reader = new FileReader();
  const nounList = [];
  let tokenList = [];
  let sortedCount = [];
  let counterObj = {};
  reader.onload = function (e) {
    const keywordList = ["description", "title", "color"];
    const DICT_PATH = "./dict";
    const text = e.target.result;
    const data2 = tsvToArray2(text);
    let keyList = keywordExtract(data2, keywordList);
    let keyText = keyList.toString();
    keyText = keyText.replace(/\|/g, " ");
    keyText = keyText.replace(/["']/g, "");
    console.log(keyText);
    //keyText = keyText.replace(/,/g, "　");
    kuromoji.builder({ dicPath: DICT_PATH }).build((err, tokenizer) => {
      const tokens = tokenizer.tokenize(keyText); // 解析データの取得
      tokens.forEach((token) => {
        tokenList.push(token);
        if (token.pos == "名詞" && token.word_id != 80) {
          nounList.push(token);
        }
      });
      for (let token of nounList) {
        counterObj[token.surface_form] =
          1 + (counterObj[token.surface_form] || 0);
      }
      for (var noun in counterObj) {
        sortedCount.push([noun, counterObj[noun]]);
      }

      sortedCount.sort(function (a, b) {
        return b[1] - a[1];
      });
      console.log(nounList);
      saveArrayCSV(sortedCount);
      let top15 = getFifteen(sortedCount);
      console.log(top15);
    });
  };

  reader.readAsText(input);
});

function keywordExtract(arr, keywordList) {
  var nameArray = [];
  for (var i = 0; i < keywordList.length; i++) {
    nameArray.push(_.pluck(arr, keywordList[i]));
  }
  return nameArray;
}

function getFifteen(arr) {
  let top15 = [];
  for (let i = 0; i < 15; i++) {
    top15.push(arr[i]);
  }
  return top15;
}

function saveCSV(array) {
  var csv = "";
  // (B) ARRAY TO CSV STRING
  csv += "キーワード";
  csv += "回数";
  csv += "\r\n";
  for (let i = 0; i < array.length + 1; i++) {
    for (let j = 0; j < array[i].length; j++) {
      csv += array[i][j];
    }
    csv += "\r\n";
  }
  // (C) CREATE BLOB OBJECT
  var myBlob = new Blob([csv], { type: "text/csv" });

  // (D) CREATE DOWNLOAD LINK
  var url = window.URL.createObjectURL(myBlob);
  var anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "demo.csv";

  // (E) "FORCE DOWNLOAD"
  // NOTE: MAY NOT ALWAYS WORK DUE TO BROWSER SECURITY
  // BETTER TO LET USERS CLICK ON THEIR OWN
  anchor.click();
  window.URL.revokeObjectURL(url);
  anchor.remove();
}
