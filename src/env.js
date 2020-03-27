const { exec } = require('child_process');

function py()
{
    exec('where python', (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          document.getElementById("pys").style.color="red";
          document.getElementById("pys").innerHTML="Python not installed. Please install Python3 <a href='https://www.python.org/download/releases/3.0/' target='_blank'>here</a>"
          return;
        }
        var path=`${stdout}`;
        document.getElementById("pys").style.color="green";
        document.getElementById("pys").innerHTML="Success! Python Installed at "+path.slice(0,path.length-12);
        // console.log(path.slice(0,path.length-12));
        console.log(`stderr: ${stderr}`);
      });
}

function pip()
{
    exec('where pip', (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          document.getElementById("pips").style.color="red";
          document.getElementById("pips").innerHTML="Pip not installed. Please install Pip using `python get-pip.py`"
          return;
        }
        var path=`${stdout}`;
        document.getElementById("pips").style.color="green";
        document.getElementById("pips").innerHTML="Success! Pip Installed at "+path.slice(0,path.length-10);
        // console.log(path.slice(0,path.length-12));
        console.log(`stderr: ${stderr}`);
      });
}

document.getElementById("py").addEventListener('click',py);
document.getElementById("pip").addEventListener('click',pip);
