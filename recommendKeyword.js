const DICT_PATH = "./dict";

function keywordExtract(arr, keywordList) {
  var nameArray = [];
  for (var i = 0; i < keywordList.length; i++) {
    nameArray.push(_.pluck(arr, keywordList[i]));
  }
  return nameArray;
}

function getKeyword() {
  const myInput = document.getElementById("myInput");
  const inputList = document.getElementById("inputList");

  var inputArray = [];

  myInput.addEventListener("submit", () => {
    const inputKeyword = inputList;
    inputArray = inputKeyWord.split(",");
    console.log(inputArray);
  });
}

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

function keyText(str) {
  let nounList = [];
  var keywordCount = {};
  kuromoji.builder({ dicPath: DICT_PATH }).build((err, tokenizer) => {
    const tokens = tokenizer.tokenize(keyText); // 解析データの取得
    //document.write(JSON.stringify(tokens));
    tokens.forEach((token) => {
      tokenList.push(token);
      if (token.pos == "名詞") {
        nounList.push(token.surface_form);
        //console.log(nounList);
        if (keywordCount[token.surface_form]) {
          keywordCount[token.surface_form] += 1;
        } else {
          keywordCount[token.surface_form] = 1;
        }
        for (var i in keywordCount) {
          sortedCount.push([i, keywordCount[i]]);
        }
        sortedCount.sort(function (a, b) {
          return b - a;
        });
      }
    });
    return nounList;
  });
}
