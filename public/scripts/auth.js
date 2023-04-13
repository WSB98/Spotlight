import {getAuth, signInWithPopup, GoogleAuthProvider, signInWithCredential} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}


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


window.signIn = async () => {
    signInWithPopup(auth, provider).then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const displayName = user.displayName;
        const email = user.email;
        const pfp = user.photoURL;
        const uid = user.uid;

        var refreshToken = user.stsTokenManager.refreshToken;

        await localStorage.setObj('currUserObj', {displayName: displayName, email: email, pfp: pfp, uid: uid, refreshToken: refreshToken})

        await sessionStorage.setItem('sessionKey',refreshToken);

   //     console.log(user)

      
       await window.location.assign('index.html')
       


    }).catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        //const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error)
    })
}




// abandoning this method (probably) for the above one
window.goHome = async(user) => {
  // Retrieve the ID token from the client-side
  //var id_token = user.getAuthResponse().id_token;

  // Decode the ID token using jwt-decode
  //var decoded_token = jwt_decode<JwtPayload>(user || '') || null;
  var decoded_token = 'test'
  console.log(decoded_token)

  // Extract the user's unique identifier and any additional user profile information that you need
  var user_id = decoded_token.sub;
  var user_name = decoded_token.name;
  var user_email = decoded_token.email;

  // Use the user's unique identifier to check if the user already exists in your system
  // If not, create a new user profile for them using the extracted user profile information

  console.log(user_id, user_name, user_email)
}