import { ManageAccount } from './firebaseconect.js';

 
document.getElementById("formulario-contactenos").addEventListener("submit", (event) => {
  event.preventDefault();
  const formulario = new ManageAccount();
  var username= document.getElementById("username").value
  var email= document.getElementById("email").value
  var comment= document.getElementById("comment").value

  formulario.formulario(username,email,comment);
  
alert("Datos Enviados  !");

document.getElementById("formulario-contactenos").reset();

})
//Close Database
console.log('Formulario Contactenos');