import {getAuth, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";



  // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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
  });



const provider = new GoogleAuthProvider();

const auth = getAuth();


async function signIn(){
    signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
    
        const user = result.user
    
        
    
    
    }).catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error)
    })
}

/*document.getElementById('buttonContainer').innerHTML+= `
<script src="https://accounts.google.com/gsi/client" async defer></script>

<div id="g_id_onload"
data-client_id="299160261106-afgtqs1ircc2se11amna87bqvpsjb265.apps.googleusercontent.com"
data-context="signin"
data-ux_mode="popup"
data-callback="signIn()"
data-itp_support="true">
</div>

<div class="g_id_signin"
data-type="standard"
data-shape="pill"
data-theme="filled_black"
data-text="signin_with"
data-size="large"
data-logo_alignment="left"
data-width="200">
</div>`*/
