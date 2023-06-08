import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPk6sIYpsnmXYfHq41DsQjuM8Vooa7UYo",
  authDomain: "waterms-dea9e.firebaseapp.com",
  projectId: "waterms-dea9e",
  storageBucket: "waterms-dea9e.appspot.com",
  messagingSenderId: "930575343377",
  appId: "1:930575343377:web:ec03e89912ec79724ef6b0",
  measurementId: "G-FR8G04ZYS5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider(app);
const Fbprovider = new FacebookAuthProvider();

//----- New Registration code start
document
  .getElementById("register")
  .addEventListener("click", async function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      Swal.fire(
        "Registration successfully!",
        "Your account has been created.",
        "success"
      )
        .then(() => {
          // Store user information in Firestore
          return addDoc(collection(db, "users"), {
            uid: user.uid,
            email: user.email,
          });
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          window.location = "./dashboard.html";
        });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      Swal.fire("Error!", errorMessage, "error");
    }
  });
//----- End

//----- Login code start
document.getElementById("login").addEventListener("click", function () {
  var email = document.getElementById("login_email").value;
  var password = document.getElementById("login_password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      Swal.fire(
        "Login successfully!",
        "You have been logged in.",
        "success"
      ).then(() => {
        window.location = "dashboard.html";
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      Swal.fire("Error!", errorMessage, "error");
    });
});

//----- login with google
document
  .getElementById("signInWithGoogle")
  .addEventListener("click", function () {
    // sign in with popup tab
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        Swal.fire(
          "Login successfully!",
          user.displayName + " has logged in.",
          "success"
        ).then(() => {
          window.location = "dashboard.html";
        });
        // alert(user.displayName);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        Swal.fire("Error!", errorMessage, "error");
      });
  });
// //----- End

//----- Signup with Google
document
  .getElementById("signUpWithGoogle")
  .addEventListener("click", function () {
    // sign in with popup tab
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        Swal.fire(
          "Sign Up successfully!",
          user.displayName + " has signed up.",
          "success"
        ).then(() => {
          window.location = "./home.html";
        });
        // alert(user.displayName);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        Swal.fire("Error!", errorMessage, "error");
      });
  });
// //----- End

//----- login with Facebook
document
  .getElementById("signInWithFacebook")
  .addEventListener("click", function () {
    // sign in with popup tab
    signInWithPopup(auth, Fbprovider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        Swal.fire(
          "Login successfully!",
          user.displayName + " has logged in.",
          "success"
        ).then(() => {
          window.location = "./home.html";
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);

        Swal.fire("Error!", errorMessage, "error");
      });
  });

//----- Sign Up with Facebook
document
  .getElementById("signUpWithFacebook")
  .addEventListener("click", function () {
    // sign up with popup tab
    signInWithPopup(auth, Fbprovider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        Swal.fire(
          "Sign Up successfully!",
          user.displayName + " has signed up.",
          "success"
        ).then(() => {
          window.location = "./home.html";
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);

        Swal.fire("Error!", errorMessage, "error");
      });
  });
