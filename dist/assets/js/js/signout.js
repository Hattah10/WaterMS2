import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPk6sIYpsnmXYfHq41DsQjuM8Vooa7UYo",
  authDomain: "waterms-dea9e.firebaseapp.com",
  projectId: "waterms-dea9e",
  storageBucket: "waterms-dea9e.appspot.com",
  messagingSenderId: "930575343377",
  appId: "1:930575343377:web:ec03e89912ec79724ef6b0",
  measurementId: "G-FR8G04ZYS5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//----- Logout code start
document.getElementById("logout").addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.");
      Swal.fire({
        title: "Sign-out successful",
        icon: "success"
      }).then(() => {
        window.location = "index.html";
      });

      // document.getElementById('logout').style.display = 'none';
    })
    .catch((error) => {
      // An error happened.
      console.log("An error happened.");
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error"
      });
    });
});
//----- End
