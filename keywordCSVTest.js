//@fileName: keywordCSV
//@description: CSVファイルを読み込み、それをarrayにまとめる
//

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
  keywordList = ["name", "role"];
  const input = csvFile.files[0];
  const reader = new FileReader();
  const count = {};

  reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToArray(text);
    const countList = keyWordCount(data, keywordList);

    for (const element of countList) {
      if (count[element]) {
        count[element] += 1;
      } else {
        count[element] = 1;
      }
    }
    document.write(JSON.stringify(countList));
    document.write(JSON.stringify(count));
    console.log(count);
  };

  reader.readAsText(input);
});

//
function keyWordCount(arr, keywordList) {
  var sortedList = {};
  var keyList = [];
  var name;
  var role;
  var j = 0;
  /**
  for (var i = 0; i < keywordList.length; i++) {
    console.log(keywordList[i]);
    sortedList += _.pluck(arr, keywordList[i]);
  }
  console.log(sortedList);
  return sortedList; 
   //console.log(sortedList);
  for (var j = 0; j < keywordList.length; j++) {
    sortedList[keywordList[j]] = _.pluck(arr, keywordList[j]);
  }*/
  for (var i = 0; i < keywordList.length; i++) {
    sortedList[keywordList[i]] = [];
    sortedList[keywordList[i]] = _.pluck(arr, keywordList[i]);
  }

  var j = 0;
  console.log(keywordList[0]);
  name = sortedList[keywordList[0]];
  role = sortedList[keywordList[1]];
  console.log(name);
  console.log(role);

  keyList = _.union(name, role);

  return keyList;
}
