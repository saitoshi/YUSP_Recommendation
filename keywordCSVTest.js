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
    /** 
    nameData = _.pluck(data, "name");
    document.write(JSON.stringify(nameData));
    //console.log(typeof nameData);
    const nameArray = Object.values(nameData);
    console.log(nameArray);
    for (var i = 0; i < nameArray.length; i++) {
      keyData.push(nameArray[i]);
      console.log(keyData);
    }
    */
    let keyData,
      keyCount = keyWordCount(data);
    document.write(JSON.stringify(keyData));
    document.write(JSON.stringify(keyCount));
  };

  reader.readAsText(input);
});

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

  return keyList, keywordCount;
}
