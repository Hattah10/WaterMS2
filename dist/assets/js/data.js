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
.orderBy("DateTime", "desc")
.limit(10)
.onSnapshot(
  (querySnapshot) => {

  let watervolume = [];
    
    querySnapshot.forEach((doc) => {

          const data = doc.data();
          const volume = data.volume;
          const DateTime = data.DateTime.toDate();;
          const date = new Date(DateTime).toLocaleString(undefined, { hour: 'numeric', minute: 'numeric', second: 'numeric' });

          watervolume.push({ x: date, y: volume });
        });
  
  // Create the chart using the retrieved data
  var chart = new JSC.Chart("timegraph", {
    debug: true, // Set debug option to true to view full error messages

    type: "line",
    // legend: {
    //   template: '%icon %name'
    // },
    box_padding: '20px',
    yAxis_alternateGridFill: "none",
    legend_visible: false,
    defaultAxis: {
      line_color: 'black',
      label_color: '#0E4959',
      defaultTick: {
        line_color: 'black',
        label_color: '#0E4959',
        gridLine_color: 'none'
      }
    },
    box: {
      // outline: { color: '#5B9AE3', width: 2 },
      // radius: 5,
    //   fill: ["#0093b7", "#a0c5cf", "#e6eceb", "#63cdd7", 50],
      opacity: 0.8
    },
    defaultSeries: {
      // palette: 'white',
      type: 'area spline',
      shape_opacity: 0.2,
      defaultPoint_marker: {
        type: 'circle',
        size: 10,
        fill: 'white',
        outline: { width: 2, color: '#2a2185' }
      }
    },
    toolbar_items_export_description: 'export menu',   //for export and printing the graph
    title_label_text: 'Real-Time Report', 
    title_label_style: { 
      color: '#2a2185', 
      fontWeight: 'bold', 
      fontSize: '40px',
    },
//   yAxis: { 
//   defaultTick: { label: { color: 'white' } },
// }, 
  defaultPoint_label: {
    text: '%yValue',
    placement: 'auto',
    style: {
      color: 'Black',
      fontWeight: 'light',
      fontSize: '12px'
    }
  },
  defaultPoint_label_autoHide:false, // Visible the value points of column
  xAxis: { 
    defaultTick: { label: { rotate: -10} },

  },
    series: [
      {
        points: watervolume
      }
    ]
  
});

});
// end for water volume graph


const waterVolumeElement = document.getElementById('currentvolume');

db2.collection("waterVolume")
  .orderBy("DateTime", "desc")
  .limit(1) // Limit to only the latest entry
  .onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const volume = data.volume;
      
      // Update the water volume element in the HTML
      waterVolumeElement.textContent = volume + " Liter";
    });
  });

  const watertemperatureElement = document.getElementById('currenttemp');
  db2.collection("temperature")
  .orderBy("DateTime", "desc")
  .limit(1) // Limit to only the latest entry
  .onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const temperature = data.celsius;
      
      // Update the water volume element in the HTML
      watertemperatureElement.textContent = temperature + " °C";
    });
  });

  