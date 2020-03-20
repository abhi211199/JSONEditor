const fs = require('fs');
var editor=document.getElementById("editor");

editor.innerHTML="enable_peatland:<input type='text' name='enable_peatland'><br>"+
"enable_moss:<input type='text' name='enable_moss'><br>"+
"admin_boundary:<input type='text' name='admin_boundary'><br>"+
"eco_boundary:<input type='text' name='eco_boundary'><br>"+
"initial_historic_land_class:<input type='text' name='initial_historic_land_class'><br>"+
"initial_current_land_class:<input type='text' name='initial_current_land_class'><br>"+
"age_class_range:<input type='text' name='age_class_range'><br>"+
"age_maximum:<input type='text' name='age_maximum'><br>"+
"slow_ag_to_bg_mixing_rate:<input type='text' name='slow_ag_to_bg_mixing_rate'><br><br>";

function add_object()
{
    editor.innerHTML+=""+
   "<div class='transformdiv'>Name of the transform:<input type='text' name='inpi2'><br>Type of transform:<select id='transforms'><option value='LocationIdxFromFlintDataTransform'>LocationIdxFromFlintDataTransform</option><option value='SQLQueryTransform'>SQLQueryTransform</option><option value='CompositeTransform'>CompositeTransform</option><option value='TransitionRuleTransform'>TransitionRuleTransform</option><option value='GrowthCurveTransform'>GrowthCurveTransform</option></select><br>"+
   "library:<input type='text' name='library'><br>"+
   "provider:<input type='text' name='provider'><br>"+
   "data_id:<input type='text' name='data_id'><br>"+
   "queryString:<input type='text' name='queryString'><br>"+
   "provider:<input type='text' name='provider'><br>"+
   "allow_nulls:<input type='checkbox' name='allow_nulls'><br>"+
   "type:<input type='text' name='type'><br>"+
   "vars(enter elements of the array in comma seperated manner):<input type='text' name='vars'><br>"+
   "classifier_set_var:<input type='text' name='classifier_set_var'><br><br>"+
   "</div><br>";
}

json={},variables={};
// console.log("a,v,c,d".split(",",4));
function saveFile() {
    var inps=document.getElementsByTagName("input");
    for(i=0;i<Math.max(inps.length,9);i++)
    {
        // console.log(inps[i].name+" "+inps[i].value);
        variables[inps[i].name]=inps[i].value;
    }
    var inps2=document.getElementsByClassName('transformdiv');
    
    if(inps.length>9)
    {
        console.log(inps2.length);
        for(i=0;i<inps2.length;i++)
        {
            // console.log(inps2[i].getElementsByTagName('input'))
            var insp=inps2[i].getElementsByTagName('input');
            var nam,transform={},name={};

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
                // json["Variables"][nam]=name;
        }
    }
    json["Variables"]=variables;
    console.log(JSON.stringify(json, null, 2));
    // writeFile("flint/variables.json");
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

