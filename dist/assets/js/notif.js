 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
 import { getFirestore, getDocs, collection,onSnapshot, doc, deleteDoc,updateDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

 const firebaseConfig = {
  apiKey: "AIzaSyA4nTLgW_F2ABAw2QcP9tMq7b96uwaUrts",
  authDomain: "iot-project-cbf3b.firebaseapp.com",
  databaseURL: "https://iot-project-cbf3b-default-rtdb.firebaseio.com",
  projectId: "iot-project-cbf3b",
  storageBucket: "iot-project-cbf3b.appspot.com",
  messagingSenderId: "506826994093",
  appId: "1:506826994093:web:8c27d387bbf305f5c67124",
  measurementId: "G-8HFRNK8VSY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const db2 = firebase.firestore();  // Function for Database Firestore 

const notifElement = document.getElementById('notification-box');

//get data from Activity log
db2.collection("activity-logs")
.orderBy("timeCreated",  "desc")
 .onSnapshot(
   (querySnapshot) => {
    let activitylogs = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const message = data.message;
      const timeCreated = data.timeCreated;

      // Calculate the time elapsed
      const currentTime = new Date();
      const timeElapsed = getTimeElapsed(currentTime, timeCreated.toDate());


      activitylogs.push({ ...data, id: doc.id });
      console.log(" successfuly get the data" );
      notifElement.innerHTML += `
      <div class="notif-content">

      <div class="notif-icon"><i class='bx bxs-bell'></i></div>
      <div class="notif-message"> 
        <span>${message} </span><br>
          <span class="notif-date">${timeElapsed} ago </span>
      </div> 
      </div>
    `
    ;
    });
});


// Helper function to calculate the time elapsed
function getTimeElapsed(currentTime, previousTime) {
    const elapsed = currentTime - previousTime;
    const seconds = Math.floor(elapsed / 1000);
  
    if (seconds < 60) {
      return `${seconds} seconds`;
    }
  
    const minutes = Math.floor(seconds / 60);
  
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
  
    const hours = Math.floor(minutes / 60);
  
    if (hours < 24) {
      return `${hours} hours`;
    }
  
    const days = Math.floor(hours / 24);
    return `${days} days`;
  }