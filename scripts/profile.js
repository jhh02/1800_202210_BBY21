document.getElementById("cancel").addEventListener("click", myFunction);

function myFunction() {
  alert("The written personal info is deleted");
  document.getElementById("cancel").innerHTML = "CANCELED";
  document.getElementById("cancel").style.backgroundColor = "red";
}

document.getElementById("done").addEventListener("click", saveUserInfo);

function saveUserInfo(){
    alert("The personal info is saved");
    document.getElementById("done").innerHTML = "Done";
    document.getElementById("done").style.backgroundColor ="green";
}

document.getElementById("image").addEventListener("click", image);
function image(){
document.getElementById("image").innerHTML = "EDIT PIC";
document.getElementById("image").style.color ="slateblue";
}
