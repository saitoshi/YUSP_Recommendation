var _ = require("underscore");
function loadXMLDoc() {}
function getKeyWord(xml) {
  keywordList = [];
  var xmlDoc = xml.responseXML;
  keyword = xmlDoc.getElementsByTagName("keyword");
  for (i = 0; i < keyword.length; i++) {
    keywordList.push(keyword[i].childNodes[0].nodeValue);
  }
  keyWordList = _.uniq(keyWordList);
  console.log(keywordList);
  return keyWordList;
}

function matchKeyword(keywordA, keywordB, xml) {}
