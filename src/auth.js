var firebase = require('firebase');

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
});
}

function login()
{
  var email=document.getElementById("email").value;
  var pass=document.getElementById("pass").value;
  firebase.auth().signInWithEmailAndPassword(email, pass).then(()=>{alert("success!");}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  alert("There was a glitch!");
});
}

document.getElementById("toggle").addEventListener("click",toggle);
document.getElementById("log").addEventListener("click",login);
document.getElementById("sign").addEventListener("click",signup);