var firebase = require('firebase');
const fs = require('fs');
const {ipcRenderer} = require('electron');

var firebaseConfig = {
  apiKey: "AIzaSyBUjMzOu_Iglvck6og2fxTmd3iucia5ln4",
  authDomain: "barcode-72afe.firebaseapp.com",
  databaseURL: "https://barcode-72afe.firebaseio.com",
  projectId: "barcode-72afe",
  storageBucket: "barcode-72afe.appspot.com",
  messagingSenderId: "835674293275",
  appId: "1:835674293275:web:d0d8856baa5456e524a4be"
};
  firebase.initializeApp(firebaseConfig);

function toggle()
{
    if(document.getElementById("toggle").innerText=="SignUp")
    {
      document.getElementById("login").style.display="none";
      document.getElementById("signup").style.display="block";
      document.getElementById("toggle").innerText="Login"
    }
    else
    {
      document.getElementById("login").style.display="block";
      document.getElementById("signup").style.display="none";
      document.getElementById("toggle").innerText="SignUp"
    }
}

function signup()
{
  document.getElementById("sign").innerText="Signing Up!";
  var email=document.getElementById("email1").value;
  var pass1=document.getElementById("pass1").value;
  var pass2=document.getElementById("pass2").value;
  if(pass1!=pass2)
  {
    alert("Passwords doesn't match!");
    return;
  }
  firebase.auth().createUserWithEmailAndPassword(email, pass1).then(()=>{alert("success!");document.getElementById("toggle").click();}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  alert("There was a glitch!");
  document.getElementById("log").innerText="SignUp";
});
}

function login()
{
  document.getElementById("log").innerText="Logging in!";
  var email=document.getElementById("email").value;
  var pass=document.getElementById("pass").value;
  firebase.auth().signInWithEmailAndPassword(email, pass).then(()=>{
    var user=firebase.auth().currentUser;
    if(user)
    {userid=user.uid;console.log(userid);}
  alert("success!");
  document.getElementsByClassName("imgcontainer")[0].style.display="none";
  document.getElementsByClassName("container")[0].style.display="none";
  document.getElementById("display").style.display="block";
  list();
}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  alert("There was a glitch!");
  document.getElementById("log").innerText="LogIn";
  });
}

bucketName="barcode-72afe.appspot.com";

function upload(name,file_name)
{
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
filename=name;
console.log(filename);
const uuid = userid;
async function uploadFile() {
  await storage.bucket(bucketName).upload(filename, {
    gzip: true,
    destination: `${uuid}/${file_name}`,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  console.log(`${filename} uploaded to ${bucketName}.`);
  list();
}
  uploadFile().catch(console.error);
}

function up_read(url)
{
  fs.readdir(url+"/",(err,files)=>{
    for(i=0;i<files.length;i++)
    {
      upload(url+"/"+files[i],files[i]);
    }
    console.log(files);
})
}

function list()
{
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();

  async function listFiles() {
    const options = {
      prefix: userid+"/",
      delimiter: "/"
    };
    document.getElementById("disp").innerHTML="";
    // Lists files in the bucket
    const [files] = await storage.bucket(bucketName).getFiles(options);
    for(i=0;i<files.length;i++)
    {
      document.getElementById("disp").innerHTML+="<table id='custom'><tr><td>"+files[i].name.replace(/^.*[\\\/]/, '')+"</td><td><button onClick=del('"+files[i].name.replace(/^.*[\\\/]/, '')+"',this)>Delete</button></td><td><button onClick=download('"+files[i].name.replace(/^.*[\\\/]/, '')+"',this)>Download</button></td></tr></table>";
      console.log(files[i].name.replace(/^.*[\\\/]/, ''));
    }
}

listFiles().catch(console.error);
}

function download(name,obj)
{
  console.log(obj);
  obj.innerText="Downloading...";
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();

  async function downloadFile() {
    const options = {
      destination: "flint/"+name,
    };

    // Downloads the file
    await storage
      .bucket(bucketName)
      .file(userid+"/"+name)
      .download(options);
    
    obj.innerText="Download";
    console.log(
      `gs://${bucketName}.`
    );
  }

  downloadFile().catch(console.error);
}

function del(name,obj)
{
  obj.innerText="Deleting..."
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function deleteFile() {
    // Deletes the file from the bucket
    await storage
      .bucket(bucketName)
      .file(userid+"/"+name)
      .delete();
    // list();
    console.log(`gs://${bucketName} deleted.`);
  }

  deleteFile().catch(console.error);
}

function upload1()
{
  ipcRenderer.send('open-file')
    ipcRenderer.on('selected', (event, path) => {
        upload(`${path}`,`${path}`.replace(/^.*[\\\/]/, ''));
      })
    // list();
}

function upload2()
{
  ipcRenderer.send('open-file-dialog')
    ipcRenderer.on('selected-directory', (event, path) => {
        up_read(`${path}`);
        console.log(`You selected: ${path}`);
      })
  list();
}

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User logged in already or has just logged in.
    
//     // userid=user.id;
//     console.log(userid);
//   } else {
//     // User not logged in or has just logged out.
//   }
// });

function signout()
{
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("done");
    document.getElementById("u3").innerText="Signing Out!";
    location.reload();
  }).catch(function(error) {
    // An error happened.
  });
}

document.getElementById("toggle").addEventListener("click",toggle);
document.getElementById("log").addEventListener("click",login);
document.getElementById("sign").addEventListener("click",signup);
document.getElementById("u1").addEventListener("click",upload1);
document.getElementById("u2").addEventListener("click",upload2);
document.getElementById("u3").addEventListener("click",signout);
document.getElementById("u4").addEventListener("click",list);

var user=firebase.auth().currentUser;
if(user)
{
  document.getElementsByClassName("imgcontainer")[0].style.display="none";
  document.getElementsByClassName("container")[0].style.display="none";
  document.getElementById("display").style.display="block";  
}

