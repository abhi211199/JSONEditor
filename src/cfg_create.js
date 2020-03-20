const fs = require('fs');

function create()
{
    fs.mkdir('flint', { recursive: true }, (err) => {
        if (err) throw err;
    });
    var s=[];
    const btns=document.getElementsByTagName("input");
    for(i=0;i<btns.length;i++)
    {
        if(btns[i].checked==true)
        {
            s+="config="+btns[i].name+"\n";
            fs.copyFile('templates/variables.json', 'flint/'+btns[i].name, (err) => {
                if (err) throw err;
                console.log('source.txt was copied to destination.txt');
            });
        }
    }
    fs.writeFile('flint/gcbm_config.cfg', s, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
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
    if(flag==1)
    {
        aler
    }
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

flag=0;

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

document.getElementById('startover').addEventListener('click',readdir);
document.getElementById('create').addEventListener('click',create);
document.getElementById('btnSaveFile').addEventListener('click', saveFile);
var editor = new JSONEditor(document.getElementById("jsonEditor"), {});