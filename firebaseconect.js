import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBheo29nQ3ozZ4s2l53rQwoFkBPufbbyE0",
  authDomain: "fir-with-5abbf.firebaseapp.com",
  projectId: "fir-with-5abbf",
  storageBucket: "fir-with-5abbf.appspot.com",
  messagingSenderId: "751579906117",
  appId: "1:751579906117:web:036208f407410b3680232c",
  measurementId: "G-M8CS2BMPY6",
  databaseURL: "https://fir-with-5abbf-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export class ManageAccount {

  register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((_) => {
        window.location.href = "/login";
        // Mostrar alerta de registro exitoso
        alert("Registro exitoso. Serás redirigido a la página de inicio de sesión.");
      })
      .catch((error) => {
        console.error(error.message);
        // Mostrar alerta de error de registro
        alert("Error al registrar: " + error.message);
      });
  }

  authenticate(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((_) => {
        window.location.href = "/guardarCadena";
        // Mostrar alerta de inicio de sesión exitoso
        alert("Has iniciado sesión correctamente. Serás redirigido a tu perfil administrador.");
      })
      .catch((error) => {
        console.error(error.message);
        // Mostrar alerta de error de inicio de sesión
        alert("Error al iniciar sesión: " + error.message);
      });
  }


  formulario(username, email, comment) {

    set(ref(database, 'user/' + username),
      {
        username: username,
        email: email,
        comment: comment
      });    
      
  }
  


  signOut() {
    signOut(auth)
      .then((_) => {
        window.location.href = "/index";
      })
      .catch((error) => {
        console.error(error.message);
      });
  }




}
