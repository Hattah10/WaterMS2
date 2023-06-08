import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, addDoc, getDocs, collection,onSnapshot, doc, deleteDoc,updateDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

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



// modal slider
// ###################################
const slideValue = document.getElementById("slidevalue");
const slideValueright = document.getElementById("rightvalue");
const inputSlider = document.getElementById("rangevalue");

inputSlider.oninput = (()=>{
  let value = inputSlider.value;
  slideValueright.textContent = value + "%";
  slideValue.textContent = value;
  slideValue.style.left = (value) + "%";
  slideValue.classList.add("show");
});
inputSlider.onblur = (()=>{
  slideValue.classList.remove("show");
});

// end of modal slider

// modal card
// ###################################
const goalCard = document.getElementById('goalCard');
const progressContainer = document.getElementById('progressContainer');
const openModalBtn = document.getElementById('openModalBtn');
const circularProgress = document.querySelector('.circular-progress');
const card3 = document.getElementById('card3');


// modal operation
const modal = document.getElementById('myModal');
const closeBtn = modal.querySelector('.close');
const closeBtns = document.getElementById('closeBtn');

closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

closeBtns.addEventListener('click', function() {
    modal.style.display = 'none';
  });
// Show the modal when the "Set goals" button is clicked
openModalBtn.addEventListener('click', () => {
  // Show the modal here or perform any other action you need
  modal.style.display = 'block';
});

card3.addEventListener('click', () => {
  // Show the modal here or perform any other action you need
  modal.style.display = 'block';
});
window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // let goalAmount;
  // let progressPercentage;
// Save the goal and update the style to show the circular progress
const saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', () => {
  const rangeValue = document.getElementById('rangevalue');
  const amountInput = document.getElementById('Amount');
  const goalAmount = parseInt(amountInput.value, 10); //get the value on the input
  const goalRange = parseInt(rangeValue.value, 10);


    // Check if goalAmount is 0 or no input
    if (goalAmount === 0 || isNaN(goalAmount)) {
      alert('Please enter a valid goal amount.');
      return; // Exit the function
    }
  
  // Hide the goal card
  goalCard.style.display = 'none';

  // Show the circular progress container
  progressContainer.style.display = 'block';

  // Update the circular progress as needed
  const volumeRef = db2.collection('waterVolume').orderBy('DateTime', 'desc').limit(1);

  volumeRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const currentVolume = data.volume;

      // Calculate the progress percentage
      const progressPercentage = (currentVolume / goalAmount) * 100;

      // Update the circular progress values
      const progressValue = document.querySelector('.progress-value');
      const progressValueSub = document.querySelector('.progress-value-sub');

      progressValue.textContent = `${progressPercentage.toFixed(2)}%`;
      progressValueSub.textContent = `of ${goalAmount} L`;
      circularProgress.style.background = `conic-gradient(#2a2185 ${progressPercentage * 3.6}deg, #ededed 0deg)`

         // Store the goal amount and current volume in localStorage
         localStorage.setItem('goalAmount', goalAmount);
         localStorage.setItem('currentVolume', currentVolume);
          // Enable the checkbox
          toggleBtn.checked = true;

         // Check if the progress exceeds the range value

         if (progressPercentage >= goalRange && goalRange !== 0) {
          // Send a notification or perform any desired action
          alert('Progress has reached or exceeded the specified Goal value!');
          const currenttime = new Date();
          const message = `The water consumption today has reached ${goalRange}% of the set water usage goal of ${goalAmount} L.`;
        
          console.log(currenttime, message);
        
          db2.collection('activity-logs').add({
            timeCreated: currenttime,
            message: message
          })
            .then(() => {
              console.log('Activity logged successfully');
            })
            .catch((error) => {
              console.error('Error logging activity:', error);
            });
        }
    });

    modal.style.display = 'none';
    // location.reload();

  }).catch((error) => {
    console.log('Error getting current volume from Firestore: ', error);
  });
});

// Check if there is a stored goal amount and current volume in localStorage
const storedGoalAmount = localStorage.getItem('goalAmount');
const storedCurrentVolume = localStorage.getItem('currentVolume');

if (storedGoalAmount && storedCurrentVolume) {

const toggleBtn = document.getElementById("toggleBtn");

  // Hide the goal card
  goalCard.style.display = 'none';

  // Show the circular progress container
  progressContainer.style.display = 'block';

  const goalAmount = parseInt(storedGoalAmount, 10);
  const currentVolume = parseInt(storedCurrentVolume, 10);

  // Calculate the progress percentage
  const progressPercentage = (currentVolume / goalAmount) * 100;

  // Update the circular progress values
  const progressValue = document.querySelector('.progress-value');
  const progressValueSub = document.querySelector('.progress-value-sub');

  progressValue.textContent = `${progressPercentage.toFixed(2)}%`;
  progressValueSub.textContent = `of ${goalAmount} L`;
  circularProgress.style.background = `conic-gradient(#2a2185 ${progressPercentage * 3.6}deg, #ededed 0deg)`

  toggleBtn.checked = true; 

}

// const toggleBtn = document.getElementById("toggleBtn");

// Handle toggle-button click event

const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("change", function() {
  if (toggleBtn.checked) {
    // Toggle button is enabled

    // Retrieve data from localStorage
    const storedGoalAmount = localStorage.getItem('goalAmount');
    const storedCurrentVolume = localStorage.getItem('currentVolume');

    if (storedGoalAmount && storedCurrentVolume) {
      // Hide the goal card
      goalCard.style.display = 'none';

      // Show the circular progress container
      progressContainer.style.display = 'block';

      // Calculate the progress percentage
      const goalAmount = parseInt(storedGoalAmount, 10);
      const currentVolume = parseInt(storedCurrentVolume, 10);
      const progressPercentage = (currentVolume / goalAmount) * 100;

      // Update the circular progress values
      const progressValue = document.querySelector('.progress-value');
      const progressValueSub = document.querySelector('.progress-value-sub');
      progressValue.textContent = `${progressPercentage.toFixed(2)}%`;
      progressValueSub.textContent = `of ${goalAmount} L`;
    }
  } else {
    // Toggle button is disabled

    // Remove data from localStorage
    localStorage.removeItem('goalAmount');
    localStorage.removeItem('currentVolume');

    // Show the goal card
    goalCard.style.display = 'block';

    // Hide the circular progress container
    progressContainer.style.display = 'none';

    // Show an alert
    Swal.fire({
      title: 'Set goal is disabled',
      icon: 'info'
    });
  }
});


function handleProgress100(p) {

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  // Show the SweetAlert notification
  Swal.fire({
            title: 'Max Volume Reached!',
            text: 'You have reached the daily maximum volume for water usage.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });

  const currenttime = new Date();
  const message = `The water consumption today has reached 100% of the set water usage goal of ${p} L.`;

  console.log(currenttime, message);

  db2.collection('activity-logs').add({
      timeCreated: currenttime,
      message: message
  })
  .then(() => {
      console.log('Activity logged successfully');
      circularProgress.style.animation = "none"; // Assuming circularProgress is the element representing the circular progress

   localStorage.setItem('lastShownDate', currentDay );

      // Store the flag in localStorage
      localStorage.setItem('alertShown', 'true');
  })
  .catch((error) => {
      console.error('Error logging activity:', error);
  });
}


// // Update the circular progress as needed

if (storedGoalAmount && storedCurrentVolume) {
db2.collection("waterVolume")
    .orderBy("DateTime", "desc")
    .limit(1)
    .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const currentVolume = data.volume;

            // Calculate the progress percentage
            const progresspercent = (currentVolume / storedGoalAmount) * 100;

            // Update the circular progress values
            const progressValue = document.querySelector('.progress-value');
            const progressValueSub = document.querySelector('.progress-value-sub');

            progressValue.textContent = `${progresspercent.toFixed(2)}%`;
            progressValueSub.textContent = `of ${storedGoalAmount} L`;
            circularProgress.style.background = `conic-gradient(#2a2185 ${progresspercent * 3.6}deg, #ededed 0deg)`

            // Store the goal amount and current volume in localStorage
            const currentv = localStorage.setItem('currentVolume', currentVolume);
            console.log("store"+ progresspercent)
            // Enable the checkbox
            // toggleBtn.checked = true;
            // let storedGoalAmount = null;
            // Check if the progress reaches 100%
            if (progresspercent >= 100) {
              const hundred = 100; 
              const overflow = currentVolume - storedGoalAmount;
              progressValue.textContent = `${overflow}L `;
              progressValueSub.textContent = `of ${storedGoalAmount} L`;
              circularProgress.style.background = `conic-gradient(#FF0000 ${hundred * 3.6}deg, #FF0000 0deg)`

              
                  // Retrieve the current date
                  const currentDate = new Date();
                  const currentDay = currentDate.getDate();
                  // currentDate.setDate(currentDate.getDate() + 1);
                  // const tomorrow = currentDate.getDate();

                // Retrieve the flag from localStorage
                const alertShown = localStorage.getItem('alertShown');
                const lastShownDate = localStorage.getItem('lastShownDate');


                // If the flag is not set, show the alert
                if (alertShown == "true") {
                  
                  console.log("good job")

                    if(lastShownDate !== currentDay.toString()){
                      handleProgress100(storedGoalAmount);
                    }
                  
                }else{
                  handleProgress100(storedGoalAmount);

                }
            }

            // Check if the currentVolume reaches or exceeds 22
            // if (currentVolume >= 22) {
            //     // Show a SweetAlert
            //     Swal.fire({
            //         title: 'Max Volume Reached!',
            //         text: 'You have reached the daily maximum volume for water usage.',
            //         icon: 'warning',
            //         confirmButtonText: 'OK'
            //     });
            // }
        });
    });
  }
