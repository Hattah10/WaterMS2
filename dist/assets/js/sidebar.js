window.onload = function() {
  const sidebar = document.querySelector(".sidebar");
  const closeBtn = document.querySelector("#btn");
  const main = document.querySelector(".main");
  const newhomeBtn = document.getElementById("homebtn");
  const newclosebtn = document.getElementById("closeBtn");


  closeBtn.addEventListener("click", function() {
    sidebar.classList.toggle("close");
    main.classList.toggle("active");
    menuBtnChange();
  });

  function menuBtnChange() {
    if (sidebar.classList.contains("close")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }

  // newhomeBtn.addEventListener("click", function() {
  //   sidebar.classList.toggle("close");
  // main.classList.toggle("active");
  //   newButton.style.display = "none";
  // });
  
  // Responsive sidebar
  function checkWindowSize() {
    if (window.innerWidth <= 600) {
      // sidebar.classList.add("close");
      // main.classList.add("active");
      newhomeBtn.style.display = "block";
      sidebar.style.display = "none";

      newhomeBtn.addEventListener("click", function() {
        sidebar.style.display = "block";
        sidebar.classList.toggle("close");
        // main.classList.toggle("active");
        newhomeBtn.style.display = "none";
        newclosebtn.style.display = "block";
        // closeBtn.classList.remove("bx-menu", "bx-menu-alt-right");
        closeBtn.style.display = "none";
      });
      
      newclosebtn.addEventListener("click", function() {
        // sidebar.classList.add("close");
        // main.classList.add("active");
        newhomeBtn.style.display = "block";
        sidebar.style.display = "none";
       
       
      });
      
    } else {
      sidebar.classList.remove("close");
      main.classList.remove("active");
      newhomeBtn.style.display = "none";
      sidebar.style.display = "block";
        }
  }

  newhomeBtn.addEventListener("click", function() {
    sidebar.style.display = "block";
    sidebar.classList.add("close");
    // main.classList.toggle("active");
    newhomeBtn.style.display = "none";
    newclosebtn.style.display = "block";
    // closeBtn.classList.remove("bx-menu", "bx-menu-alt-right");
    closeBtn.style.display = "none";
  });
  
  newclosebtn.addEventListener("click", function() {
    // sidebar.classList.add("close");
    // main.classList.add("active");
    newhomeBtn.style.display = "block";
    sidebar.style.display = "none";
  });
   
  // Check window size on page load and resize
  window.addEventListener("resize", checkWindowSize);
  checkWindowSize();
};


// notification icon
const notificationIcon = document.querySelector('.notif');
const notificationBox = document.getElementById('notification-box');

notificationIcon.addEventListener('click', function() {
  notificationBox.style.display = 'block';
});

// Example code to hide the notification box when clicked outside
document.addEventListener('click', function(event) {
  if (!notificationIcon.contains(event.target) && !notificationBox.contains(event.target)) {
    notificationBox.style.display = 'none';
  }
});

// card as a navigator to next page
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');

card1.addEventListener('click', () => {
  window.location.href = 'volume.html'; // Navigate to page1.html
});

// card2.addEventListener('click', () => {
//   window.location.href = 'temperature.html'; // Navigate to page2.html
// });

  // Responsive sidebar
  function checkWindowSize() {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("close");
      main.classList.remove("active");
    } 
  }

  // Check window size on page load and resize
  window.addEventListener("resize", checkWindowSize);
  checkWindowSize();