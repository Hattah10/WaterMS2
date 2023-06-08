
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
  .orderBy("DateTime", "asc")
  .limit()
  .onSnapshot((querySnapshot) => {
    let weeklyData = {
      0: 0, // Sunday
      1: 0, // Monday
      2: 0, // Tuesday
      3: 0, // Wednesday
      4: 0, // Thursday
      5: 0, // Friday
      6: 0  // Saturday
    };

    let totalVolume = 0; // Variable to store the total volume
    let daysWithData = 0; // Variable to count the number of days with data

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const volume = data.volume;
      const DateTime = data.DateTime.toDate();
      const dayOfWeek = DateTime.getDay();

      // Update weekly data with the last recorded value for each day
      weeklyData[dayOfWeek] = volume;
      
      totalVolume += volume; // Accumulate the volume
      daysWithData++; // Increment the count of days with data

    });

       // Calculate the average volume
       const averageVolume = daysWithData > 0 ? totalVolume / daysWithData : 0;

       console.log(weeklyData);
       console.log("Average Volume:", averageVolume);

       const averageUsageElement = document.querySelector('.averageusage');
       averageUsageElement.textContent = `${averageVolume.toFixed(2)} L`; // Update the content of the element

    // Convert weekly data to an array
    const weeklyVolume = Object.entries(weeklyData).map(([dayOfWeek, volume]) => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return { x: days[dayOfWeek], y: volume };

    });

  // Create the weekly chart using the retrieved data
  var chart = new JSC.Chart("weekreport", {
    // Chart configuration options for weekly report
   
    type: "column",
    legend_visible: false,
    xAxis: {
      visible: true,
      orientation: 'bottom',
      defaultTick: {
        label: {
          text: '%value',
          color: '#757575',
          padding_bottom: 15,
          fontWeight: 'bold'

        }
      }
    },
    defaultSeries: {
      color: '#2a2185',
      type: 'column roundCaps',

      // pointSelection: 'multiple',
      firstPoint_legendEntry_lineAbove: true
    },
    // box: {
    //   outline: { color: '#5B9AE3', width: 2 },
    //   radius: 5,
    //   fill: ["#0093b7", "#a0c5cf", "#e6eceb", "#63cdd7", 50],
    //   opacity: 0.2
    // },
    toolbar_items_export_description: 'export menu',   //for export and printing the graph
  defaultPoint_label_autoHide:true, // Visible the value points of column
    series: [{
      points: weeklyVolume
    }
  ]
});

});

// end for water volume graph