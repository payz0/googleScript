
var source = [];
var start = 0;
var sampai = 10;
var data = []
function doGet(){

     return HtmlService//.createHtmlOutputFromFile("home");
     .createTemplateFromFile("home")
     .evaluate()
     .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}


function getData(){
      var fileName = "testa.json";
      var files = DriveApp.getFilesByName(fileName);
      if (files.hasNext()) {
        var file = files.next();
        var content = file.getBlob().getDataAsString();
         data = JSON.parse(content)
         
         return data;//JSON.parse( files.next().getBlob().getDataAsString());
        }
      
}



function db(siswa){
  var url = "https://docs.google.com/spreadsheets/d/1bdZ1hSjJgkhwClPuJfOoKk-MBUepH7bhcmZBArHJq94/edit#gid=0";
  var data = SpreadsheetApp.openByUrl(url).getSheetByName("db");
  data.appendRow([siswa])
  
}
//update file json
function updateDb(siswa){
    var targetFileID = "1Y0o8RFuh1fgbd02-_nbLjGsXVaU53kgj"; //id file json di driveApp
    var filesResource = Drive.Files.get(targetFileID);
    var blob = Utilities.newBlob(JSON.stringify(siswa), "application/vnd.google-apps.script+json");
    Drive.Files.update(filesResource, targetFileID, blob, {"convert":"true"});
}

// create file json
function saveAsJSON(siswa) {
  var blob,file,fileSets,obj;

  obj = {//Object literal for testing purposes
    key:"siswa"
  }

  fileSets = {
    title: 'testa.json',
    mimeType: 'application/json'
  };

  blob = Utilities.newBlob(JSON.stringify(obj), "application/vnd.google-apps.script+json");
  file = Drive.Files.insert(fileSets, blob);
  Logger.log('ID: %s, File size (bytes): %s, type: %s', file.id, file.fileSize, file.mimeType);

}

// membaca isi file json
// function getFileContent() {
//  var fileName = "testa.json";
//  var files = DriveApp.getFilesByName(fileName);
//  if (files.hasNext()) {
//    var file = files.next();
//    var content = file.getBlob().getDataAsString();
//    var json = JSON.parse(content);
//    return json;
//  }
// }
