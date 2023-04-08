

/* firebase cloud funcs */




  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
async function getFireKeys(){
  await fetch('https://70p9pad4b9.execute-api.us-east-1.amazonaws.com/default/getFire_Info', {
    method:"POST",
  }).then(response => response.json()).then(data => {

  

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: data[0],
    authDomain: data[1],
    projectId: data[2],
    storageBucket: data[3],
    messagingSenderId: data[4],
    appId: data[5],
    measurementId: data[6]
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  })
}

getFireKeys()