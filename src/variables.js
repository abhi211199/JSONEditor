const fs = require('fs');
const {clipboard}=require('electron').remote;

var editor=document.getElementById("editor");

// import {MDCTextField} from '@material/textfield';
const {MDCTextField} = require('@material/textfield');
const cl=document.getElementsByClassName('mdc-text-field');
console.log(cl.length);
for(i=0;i<cl.length;i++){
const textField = new MDCTextField(cl[i]);}

//adding base fields
editor.innerHTML="<div class='container'><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i>"+
"<div class='row'><div class='col-25'><label>enable_peatland:</label></div><div class='col-75'><input type='checkbox' name='enable_peatland' ></div></div><br>"+
"<div class='row'><div class='col-25'><label>enable_moss:</label></div><div class='col-75'><input type='checkbox' name='enable_moss'></div></div><br>"+
"<div class='row'><div class='col-25'><label>admin_boundary:</label></div><div class='col-75'>"+retHtml('text','admin_boundary','admin_boundary','',"onkeyup='rt_menu(1,this.value)' onclick='rt_menu(1,this.value)' onfocus='rt_menu(1,this.value)'")+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
"<div class='row'><div class='col-25'><label>eco_boundary:</label></div><div class='col-75'>"+retHtml('text','eco_boundary','eco_boundary','',"onkeyup='rt_menu(2,this.value)' onclick='rt_menu(2,this.value)' onfocus='rt_menu(2,this.value)'")+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
"<div class='row'><div class='col-25'><label>initial_historic_land_class:</label></div><div class='col-75'>"+retHtml('text','initial_historic_land_class','initial_historic_land_class','',"onkeyup='rt_menu(3,this.value)' onclick='rt_menu(3,this.value)' onfocus='rt_menu(3,this.value)'")+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
"<div class='row'><div class='col-25'><label>initial_current_land_class:</label></div><div class='col-75'>"+retHtml('text','initial_current_land_class','initial_current_land_class','',"onkeyup='rt_menu(4,this.value)' onclick='rt_menu(4,this.value)' onfocus='rt_menu(4,this.value)'")+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
"<div class='row'><div class='col-25'><label>age_class_range:</label></div><div class='col-75'>"+retHtml('text','age_class_range','age_class_range','',"onkeyup='rt_menu(5,this.value)' onclick='rt_menu(5,this.value)' onfocus='rt_menu(5,this.value)'")+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
"<div class='row'><div class='col-25'><label>age_maximum:</label></div><div class='col-75'>"+retHtml('text','age_maximum','age_maximum','',"onkeyup='rt_menu(6,this.value)' onclick='rt_menu(6,this.value)' onfocus='rt_menu(6,this.value)'")+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
"<div class='row'><div class='col-25'><label>slow_ag_to_bg_mixing_rate:</label></div><div class='col-75'>"+retHtml('text','slow_ag_to_bg_mixing_rate','slow_ag_to_bg_mixing_rate','',"onkeyup='rt_menu(7,this.value)' onclick='rt_menu(7,this.value)' onfocus='rt_menu(7,this.value)'")+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div></div><br><br>";

//adding transfoms
function add_object()
{
    for(i=0;i<document.getElementById("trno").value;i++)
    editor.innerHTML+="<div class='container'><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i>"+
   "<div class='transformdiv'><div class='container'><div class='row'><div class='col-25'><label>Name of the transform:</label></div><div class='col-75'>"+retHtml('text','inpi2','Name of the transform','','')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
   "<div class='row'><div class='col-25'><label>Type of transform:</label></div><div class='col-75'><select id='transforms"+i+"' onchange='change_transform("+i+")'><option value='selecttransform'>Select a transform!</option><option value='LocationIdxFromFlintDataTransform'>LocationIdxFromFlintDataTransform</option><option value='SQLQueryTransform'>SQLQueryTransform</option><option value='CompositeTransform'>CompositeTransform</option><option value='TransitionRuleTransform'>TransitionRuleTransform</option><option value='GrowthCurveTransform'>GrowthCurveTransform</option></select></div></div><br>"+
   "<div id='transf"+i+"'>"+
   "</div></div><br><br>"+
   "</div><br>";
   //adding event listeners to dropdown menu 
//    var ip=document.getElementById('editor').getElementsByTagName("select");
//    for(i=0;i<ip.length;i++)
//    ip[i].addEventListener('change',change_transfom);
}

//JSON generation from form
json={},variables={};

function saveFile() {
    var inps=document.getElementsByTagName("input");
    for(i=1;i<Math.max(inps.length,10);i++)
    {
        // console.log(inps[i].name+" "+inps[i].value);
        if(inps[i].name=="enable_peatland" || inps[i].name=="enable_moss")
        variables[inps[i].name]=inps[i].checked;
        else
        variables[inps[i].name]=inps[i].value;
    }
    var inps2=document.getElementsByClassName('transformdiv');
    
    if(inps.length>10)
    {
        console.log(inps2.length);
        for(i=0;i<inps2.length;i++)
        {
            // console.log(inps2[i].getElementsByTagName('input'))
            var insp=inps2[i].getElementsByTagName('input');
            var nam="",transform={},name={};

            // console.log(insp)
            for(j=0;j<insp.length;j++)
            {
                // console.log(insp[j].name+" "+insp[j].value);
                if(insp[j].name=="inpi2")
                nam=insp[j].value;
                else if(insp[j].name=="vars")
                transform[insp[j].name]=(insp[j].value).split(",",insp[j].value.length);
                else if(insp[j].name=="allow_nulls")
                transform[insp[j].name]=(insp[j].checked)
                else
                {
                    transform[insp[j].name]=insp[j].value;
                }
            }
                console.log(transform);
                name["transform"]=transform;
                // name1[nam]=name;
                console.log(JSON.stringify(name,null,2));
                variables[nam]=name;
                console.log(JSON.stringify(variables,null,2));
                // json["Variables"][nam]=name;
        }
    }
    json["Variables"]=variables;
    console.log(JSON.stringify(json, null, 2));
    writeFile("flint/variables.json");
}

function writeFile(fileName){
  fs.writeFile(fileName, JSON.stringify(json, null, 2), function (err) {
    if(err){
      alert("An error occurred creating the file " + err.message);
  }
  else{
    console.log("save");
  }
})
}

function change_transform(i)
{
    console.log(document.getElementById("transforms"+i).value);
    if(document.getElementById("transforms"+i).value=="selecttransform")
    return;
    else
    {
        if(document.getElementById("transforms"+i).value=="LocationIdxFromFlintDataTransform")
        {
            document.getElementById("transf"+i).innerHTML="<div class='row'><div class='col-25'><label>library:</label></div><div class='col-75'>"+retHtml('text','library','','internal.flint','disabled')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
            "<div class='row'><div class='col-25'><label>provider:</label></div><div class='col-75'>"+retHtml('text','provider','provider','','')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
            "<div class='row'><div class='col-25'><label>data_id:</label></div><div class='col-75'>"+retHtml('text','data_id','data_id','','')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>";
        }
        else if(document.getElementById("transforms"+i).value=="SQLQueryTransform")
        {
            document.getElementById("transf"+i).innerHTML="<div class='row'><div class='col-25'><label>queryString:</label></div><div class='col-75'>"+retHtml('text','queryString','queryString','','')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
            "<div class='row'><div class='col-25'><label>library:</label></div><div class='col-75'>"+retHtml('text','library','','internal.flint','disabled')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
            "<div class='row'><div class='col-25'><label>provider:</label></div><div class='col-75'>"+retHtml('text','provider','provider','','')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>";
        }
        else if(document.getElementById("transforms"+i).value=="CompositeTransform")
        {
            document.getElementById("transf"+i).innerHTML="<div class='row'><div class='col-25'><label>allow_nulls:</label></div><div class='col-75'><input type='checkbox' name='allow_nulls'></div></div><br>"+
            "<div class='row'><div class='col-25'><label>library:</label></div><div class='col-75'>"+retHtml('text','library','','internal.flint','disabled')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
            "<div class='row'><div class='col-25'><label>vars(enter elements of the array in comma seperated manner):</label></div><div class='col-75'>"+retHtml('text','vars','elements','','')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>";
        }
        else if(document.getElementById("transforms"+i).value=="GrowthCurveTransform")
        {
            document.getElementById("transf"+i).innerHTML="<div class='row'><div class='col-25'><label>classifier_set_var:</label></div><div class='col-75'>"+retHtml('text','classifier_set_var','classifier_set_var','','')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div></div></div><br><br>"+
            "<div class='row'><div class='col-25'><label>library:</label></div><div class='col-75'>"+retHtml('text','library','library','','')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
            "<div class='row'><div class='col-25'><label>provider:</label></div><div class='col-75'>"+retHtml('text','provider','provider','','')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>";
        }
        else if(document.getElementById("transforms"+i).value=="TransitionRuleTransform")
        {
            document.getElementById("transf"+i).innerHTML="<div class='row'><div class='col-25'><label>classifier_set_var:</label></div><div class='col-75'>"+retHtml('text','classifier_set_var','classifier_set_var','','')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div></div></div><br><br>"+
            "<div class='row'><div class='col-25'><label>library:</label></div><div class='col-75'>"+retHtml('text','library','library','','')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>"+
            "<div class='row'><div class='col-25'><label>provider:</label></div><div class='col-75'>"+retHtml('text','provider','provider','','')+"</div><i class='fa fa-copy' style='font-size:24px'></i>  <i class='fa fa-paste' style='font-size:24px'></i></div><br>";
        }
    }
}
document.getElementById("object").addEventListener('click',add_object);
document.getElementById('btnSaveFile').addEventListener('click', saveFile);

var id1,val1;

function rt_menu(id,val)
{
    id1=id;val1=val;
    console.log(id1+" "+val1);
}

function retHtml(type,name,placeholder,value,fx)
{
{return ("<div class='mdc-text-field mdc-text-field--outlined'>"+
    "<input class='mdc-text-field__input' id='inp' name='"+name+"' type='"+type+"' value='"+value+"' "+fx+" onmouseover='reinit()'>"+
    "<div class='mdc-notched-outline'><div class='mdc-notched-outline__leading'></div><div class='mdc-notched-outline__notch'>"+
        "<label for='inp' class='mdc-floating-label'>"+placeholder+"</label>"+
      "</div><div class='mdc-notched-outline__trailing'></div></div></div>");}
    //   finally{
    //       console.log("ssss");
    //       reinit();
    //   }
}

function reinit()
{
    const cl=document.getElementsByClassName('mdc-text-field');
    console.log(cl.length);
    for(i=0;i<cl.length;i++){
    const textField = new MDCTextField(cl[i]);}
}

const { remote } = require('electron')
const { Menu, MenuItem } = remote

const menu = new Menu()
menu.append(new MenuItem({ label: 'Copy', click() {console.log(val1); clipboard.writeText(val1); } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Paste', click() {console.log(clipboard.readText());document.getElementsByTagName("input")[id1+2].value=clipboard.readText();} }))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup({ window: remote.getCurrentWindow() })
}, false)



