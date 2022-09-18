function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      getKeyWord(this);
    }
  };
  xmlhttp.open("GET", "cd_catalog.xml", true);
  xmlhttp.send();
}
function getKeyWord(xml) {
  var txt = "";
  var keywordList = [];
  var xmlDoc = xml.responseXML;
  var keyword = xmlDoc.getElementsByTagName("ARTIST");
  for (var i = 0; i < keyword.length; i++) {
    txt += keyword[i].childNodes[0].nodeValue + ",";
  }

  keywordList.push(txt);
  keyWordList = _.uniq(keyWordList);
  console.log(keywordList);
  document.getElementById("list").innerHTML = keywordList;
  //return keyWordList;
}
