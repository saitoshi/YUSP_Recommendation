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
function getKeyWord(xml) {
  var txt = "";
  var keywordList = [];
  var xmlDoc = xml.responseXML;
  var keyword = xmlDoc.getElementsByTagName("keyword");
  for (var i = 0; i < keyword.length; i++) {
    txt += keyword[i].childNodes[0].nodeValue + ",";
  }

  keywordList.push(txt);
  keyWordList = _.uniq(keywordList);
  console.log(keywordList);
  document.getElementById("list").innerHTML = keywordList;
  return keyWordList;
}

function compareKeyWord(xml, keywordA, keywordB) {
  keywordList = [];
  keywordList = getKeyWord(xml);
}

function getKeyWord2(xml) {
  var keywordList = [];
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xml, "text/xml");
  var keyword = xmlDoc.getElementsByTagName("TITLE");
  for (var i = 0; i < keyword.length; i++) {
    txt += keyword[i].childNodes[0].nodeValue + ",";
  }

  keywordList.push(txt);
  //keyWordList = _.uniq(keywordList);
  console.log(keywordList);
}
