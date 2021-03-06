﻿const dialog = require('electron').remote.dialog; // access file system dialogs

// Show an open file dialog, select a file, and load it into the editor
function openFile(){
  dialog.showOpenDialog(require('electron').remote.BrowserWindow, {
    properties: ['openFile', 'openDirectory']
  }).then(result => {
    readFile(result.filePaths[0])
    openFileName=result.filePaths[0];
  }).catch(err => {
    console.log(err)
  })
}

// Open the new file template and load it into the editor
function newFile(){
  readFile("./src/newFileTemplate.json");
  openFileName = "";
}

// Helper function for saving a file
function writeFile(fileName){
  fs.writeFile(fileName, data, function (err) {
    if(err){
      alert("An error occurred creating the file " + err.message);
  }
  else{
    console.log("save");
  }
  });
}

// Save the content of the editor into a JSON file
function saveFile() {
  parsedJson = editor.get();
  data = JSON.stringify(parsedJson, null, 2);
  console.log(data);
  if (openFileName == "")
  {
    dialog.showSaveDialog(require('electron').remote.BrowserWindow, {
    }).then(result => {
      writeFile(result.filePath);
      console.log(result.filePath)
    }).catch(err => {
      console.log(err)
    })
  }
  else
  {
    writeFile(openFileName);
  }
}

function showJSON(){
  document.getElementById("jsonViewer").innerHTML=JSON.stringify(editor.get(), null, 2);
}

// Add the event handlers to the buttons
document.getElementById('btnOpenFile').addEventListener('click', openFile);
document.getElementById('btnNewFile').addEventListener('click', newFile);
document.getElementById('btnSaveFile').addEventListener('click', saveFile);
document.getElementById('jsonViewer').addEventListener('click', showJSON);