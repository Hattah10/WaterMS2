
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
firebase.initializeApp(firebaseConfig);
const db2 = firebase.firestore();  // Function for Database Firestore 

db2.collection("waterVolume")
 .onSnapshot(
   (querySnapshot) => {
 let counter = 1; // initialize counter variable
//  let updateCount = 0; // initialize update counter 
 const table =  $('#Datatables').DataTable();
 table.clear(); // clear existing data in the table

querySnapshot.forEach((doc) => {
  const data = doc.data();
  const timestamp = data.DateTime;
  const dateTime = new Date(timestamp.toDate()); // Convert timestamp to Date object
  console.log(dateTime); // Log the dateTime value to the console for debugging

  const formattedDateTime = dateTime.toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });


    table.row.add([
    counter++,
    formattedDateTime,
    data.volume,
    // data.Municipality,
    // data.PovertyIncidence
  ]);
  table.draw(); // refresh the table with new data


});

// (error) => {
//   console.log(`Error getting documents: ${error}`);
});
