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
            // fs.copyFile('templates/variables.json', 'flint/'+btns[i].name, (err) => {
            //     if (err) throw err;
            //     console.log('source.txt was copied to destination.txt');
            // });
        }
    }
    fs.writeFile('flint/gcbm_config.cfg', s, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    console.log(s);
}



document.getElementById('create').addEventListener('click',create);