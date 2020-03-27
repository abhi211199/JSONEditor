const fs = require('fs');
const dialog = require('electron').remote.dialog;
const {ipcRenderer} = require('electron');

function create()
{
    const btns=document.getElementsByTagName("input");
    flag=0;
    for(i=0;i<btns.length;i++)
    {
        if(btns[i].checked==true)
        {
            flag=1
            break;
        }
    }
    if(flag==0)
    {
        alert("Please select some json files to create a cfg file!");
        return;
    }

    fs.mkdir('flint', { recursive: true }, (err) => {
        if (err) throw err;
    });
    var s=[];
    
    for(i=0;i<btns.length;i++)
    {
        if(btns[i].checked==true)
        {
            s+="config="+btns[i].name+"\n";
            fs.copyFile('templates/'+btns[i].name, 'flint/'+btns[i].name, (err) => {
                if (err) throw err;
                console.log('source.txt was copied to destination.txt');
            });
        }
    }
    fs.writeFile('flint/gcbm_config.cfg', s, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        location.reload();
      });
    console.log(s);
}

fs.access("flint/", fs.constants.F_OK, (err) => {
    if(err)
    {
        document.getElementById("starter").style.display="block";
        document.getElementById("checker").style.display="none";
    }
    else
    {
        readdir();
        document.getElementById("starter").style.display="none";
        document.getElementById("checker").style.display="block";
    }
});

function startover(){
    fs.rmdir("flint/",{recursive:true},err=>{
        if(err)
        alert("can't delete directory");
        else
        {
            document.getElementById("starter").style.display="block";
            document.getElementById("checker").style.display="none";
        }
    });
}

function readdir()
{
    fs.readdir("flint/",(err,files)=>{
        for(i=0;i<files.length;i++)
        {
            document.getElementById("panel").innerHTML+="<button name='"+files[i]+"' onClick='openjson(this.name)'>"+files[i]+"</button>"
        }
        console.log(files);
    })
}

function openjson(imp)
{
    document.getElementById("ongoing").innerText="You are editing "+imp;
    readFile("flint/"+imp);
    flag=1;
    openFileName=imp;
}

function readFile(filepath){
    fs.readFile(filepath, 'utf-8', function (err, data) {
      if (err){
        alert("An error occurred reading the file: " + err.message);
        return;
      }
      console.log(data);
      parsedJson = JSON.parse(data);
      editor.set(parsedJson);
    });
}


function saveFile() {
    parsedJson = editor.get();
    data = JSON.stringify(parsedJson, null, 2);
    console.log(data);
    writeFile("flint/"+openFileName);
    flag=0;
}

function writeFile(fileName){
  fs.writeFile(fileName, data, function (err) {
    if(err){
      alert("An error occurred creating the file " + err.message);
  }
  else{
    console.log("save");
  }
})
}

function loadcfg()
{
    fs.mkdir('flint', { recursive: true }, (err) => {
        if (err) throw err;
    });
    ipcRenderer.send('open-file-dialog')
    ipcRenderer.on('selected-directory', (event, path) => {
        fs.readdir( `${path}`,(err,files)=>{
            if(err)
            return;
            else
            {
                for(i=0;i<files.length;i++)
                {
                    fs.copyFile(`${path}`+"/"+files[i],'flint/'+files[i],(err)=>{if(err)throw err;})
                }
            }
        })
        console.log(`You selected: ${path}`);
      })
}



function openFile(){
    dialog.showOpenDialog(require('electron').remote.BrowserWindow, {
      properties: ['openDirectory']},dir =>{
console.log(dir);
      })
    
}



document.getElementById('startover').addEventListener('click',startover);
document.getElementById('create').addEventListener('click',create);
document.getElementById('btnSaveFile').addEventListener('click', saveFile);
document.getElementById('loadcfg').addEventListener('click', loadcfg);
var editor = new JSONEditor(document.getElementById("jsonEditor"), {});