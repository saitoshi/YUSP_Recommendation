var keywordList = [];

function userInput() {
  keyWordList.push(document.getElementById("userInputForm").split(","));
}
function tsvToArray(str, delimiter = "\t") {
  const headers = str.slice(0, str.indexOf("\r")).split(delimiter);
  for (var i = 0; i < headers.length; i++) {
    headers[i] = headers[i].replace(/"/g, "");
  }
  console.log(headers.length);

  const rows = str.slice(str.indexOf("\n")).split("\t");
  console.log(rows);
  console.log(rows.length);
  for (var i = 0; i < rows.length; i++) {
    rows[i] = rows[i].replace(/"/g, "");
    //rows[i] = rows[i].replace(/"/g, " \r\n");
  }
  //console.log(rows);
  const countIndex = headers.length - 1;
  console.log(countIndex);
  let arr = [];
  for (var i = 0; i < headers.length; i++) {
    arr[i] = {};
    let index = countIndex * i;
    for (var j = 0; j < 74; j++) {
      index = index + j;
      arr[i][headers[j]] = rows[index];
    }
  }
  //console.log(_.pluck(arr, "product_price_tax"));
  return arr;
}

function csvToArray(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  for (var i = 0; i < headers.length; i++) {
    headers[i] = headers[i].replace(/"/g, "");
  }
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
// まとめた情報をcsvファイルとして保存
function saveArrayCSV(array) {
  var csvOutput = "";
  for (let row of array) {
    for (let col of row) {
      csvOutput += col + ",";
    }
    csvOutput += "\r\n";
  }
  // (C) CREATE BLOB OBJECT
  var myBlob = new Blob([csvOutput], { type: "text/csv" });

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

function keywordExtract(arr, keywordList) {
  var nameArray = [];
  for (var i = 0; i < keywordList.length; i++) {
    nameArray.push(_.pluck(arr, keywordList[i]));
    console.log(nameArray);
  }
  return nameArray;
}

function keyWordCount(arr, keyWordList) {
  let keywordList = ["name", "role"];
  var keywordCount = {};
  var keyList = [];
  var nameArray;
  for (var i = 0; i < keywordList.length; i++) {
    let nameData = _.pluck(arr, keywordList[i]);
    nameArray = Object.values(nameData);
    for (var j = 0; j < nameArray.length; j++) {
      keyList.push(nameArray[j]);
      console.log(keyList);
    }
  }
  for (const element of keyList) {
    if (keywordCount[element]) {
      keywordCount[element] += 1;
    } else {
      keywordCount[element] = 1;
    }
  }

  return keywordCount;
}

function loadXMLDoc() {
  var xmlFile = "https://www.cataloghouse.co.jp/cataloghouse_product.xml";
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open("GET", xmlFile, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //getKeyWord(this);
      getKeyWord2(this);
    }
  };
  xmlhttp.open("GET", "cd_catalog.xml", true);
  xmlhttp.send();
}

function getKeyWord2(xml) {
  var txt = "";
  var keywordList = [];
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xml, "text/xml");
  var keyword = xmlDoc.getElementsByTagName("keyword");
  for (var i = 0; i < keyword.length; i++) {
    txt += keyword[i].childNodes[0].nodeValue + ",";
  }

  keywordList.push(txt);
  //keyWordList = _.uniq(keywordList);
  console.log(keywordList);
  document.getElementById("demo").innerHTML = keywordList;
}
