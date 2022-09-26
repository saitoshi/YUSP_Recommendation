const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

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

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToArray(text);

    console.log(data);
    let keyCount = keyWordCount(data);
    let keyList = keywordExtract(data);

    document.write(JSON.stringify(keyList));
    document.write(JSON.stringify(keyCount));
    saveArrayCSV(keyList);
  };

  reader.readAsText(input);
});

function keywordExtract(arr) {
  let keywordList = ["name", "role"];
  var nameArray = [];
  for (var i = 0; i < keywordList.length; i++) {
    nameArray.push(_.pluck(arr, keywordList[i]));
    console.log(nameArray);
  }
  return nameArray;
}

function keyWordCount(arr) {
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

// まとめた情報をcsvファイルとして保存
function saveArrayCSV(array) {
  // (B) ARRAY TO CSV STRING
  var csv = "";
  for (let row of array) {
    for (let col of row) {
      csv += col + ",";
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
