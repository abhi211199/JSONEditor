const fs = require('fs');
var editor=document.getElementById("editor");

editor.innerHTML="<div class='container'><div class='row'><div class='col-25'><label>enable_peatland:</label></div><div class='col-75'><input type='text' name='enable_peatland'></div></div><br>"+
"<div class='row'><div class='col-25'><label>enable_moss:</label></div><div class='col-75'><input type='text' name='enable_moss'></div></div><br>"+
"<div class='row'><div class='col-25'><label>admin_boundary:</label></div><div class='col-75'><input type='text' name='admin_boundary'></div></div><br>"+
"<div class='row'><div class='col-25'><label>eco_boundary:</label></div><div class='col-75'><input type='text' name='eco_boundary'></div></div><br>"+
"<div class='row'><div class='col-25'><label>initial_historic_land_class:</label></div><div class='col-75'><input type='text' name='initial_historic_land_class'></div></div><br>"+
"<div class='row'><div class='col-25'><label>initial_current_land_class:</label></div><div class='col-75'><input type='text' name='initial_current_land_class'></div></div><br>"+
"<div class='row'><div class='col-25'><label>age_class_range:</label></div><div class='col-75'><input type='text' name='age_class_range'></div></div><br>"+
"<div class='row'><div class='col-25'><label>age_maximum:</label></div><div class='col-75'><input type='text' name='age_maximum'></div></div><br>"+
"<div class='row'><div class='col-25'><label>slow_ag_to_bg_mixing_rate:</label></div><div class='col-75'><input type='text' name='slow_ag_to_bg_mixing_rate'></div></div></div><br><br>";

function add_object()
{
    for(i=0;i<document.getElementById("trno").value;i++)
    editor.innerHTML+=""+
   "<div class='transformdiv'><div class='container'><div class='row'><div class='col-25'><label>Name of the transform:</label></div><div class='col-75'><input type='text' name='inpi2'></div></div><br>"+
   "<div class='row'><div class='col-25'><label>Type of transform:</label></div><div class='col-75'><select id='transforms'><option value='LocationIdxFromFlintDataTransform'>LocationIdxFromFlintDataTransform</option><option value='SQLQueryTransform'>SQLQueryTransform</option><option value='CompositeTransform'>CompositeTransform</option><option value='TransitionRuleTransform'>TransitionRuleTransform</option><option value='GrowthCurveTransform'>GrowthCurveTransform</option></select></div></div><br>"+
   "<div class='row'><div class='col-25'><label>library:</label></div><div class='col-75'><input type='text' name='library'></div></div><br>"+
   "<div class='row'><div class='col-25'><label>provider:</label></div><div class='col-75'><input type='text' name='provider'></div></div><br>"+
   "<div class='row'><div class='col-25'><label>data_id:</label></div><div class='col-75'><input type='text' name='data_id'></div></div><br>"+
   "<div class='row'><div class='col-25'><label>queryString:</label></div><div class='col-75'><input type='text' name='queryString'></div></div><br>"+
   "<div class='row'><div class='col-25'><label>provider:</label></div><div class='col-75'><input type='text' name='provider'></div></div><br>"+
   "<div class='row'><div class='col-25'><label>allow_nulls:</label></div><div class='col-75'><input type='checkbox' name='allow_nulls'></div></div><br>"+
   "<div class='row'><div class='col-25'><label>type:</label></div><div class='col-75'><input type='text' name='type'></div></div><br>"+
   "<div class='row'><div class='col-25'><label>vars(enter elements of the array in comma seperated manner):</label></div><div class='col-75'><input type='text' name='vars'></div></div><br>"+
   "<div class='row'><div class='col-25'><label>classifier_set_var:</label></div><div class='col-75'><input type='text' name='classifier_set_var'></div></div></div><br><br>"+
   "</div><br>";
}

json={},variables={};
// console.log("a,v,c,d".split(",",4));
function saveFile() {
    var inps=document.getElementsByTagName("input");
    for(i=1;i<Math.max(inps.length,10);i++)
    {
        // console.log(inps[i].name+" "+inps[i].value);
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


document.getElementById("object").addEventListener('click',add_object);
document.getElementById('btnSaveFile').addEventListener('click', saveFile);

