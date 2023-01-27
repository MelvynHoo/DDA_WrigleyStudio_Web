import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, get, child, set, update, onValue, orderByChild } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
//import {UpdatePlayerDisplayName} from "./firebase.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeG-pYB3UMHt6nCVK05_mlpYI-ZB4XeHg",
  authDomain: "dda-assg2-packingsim.firebaseapp.com",
  databaseURL: "https://dda-assg2-packingsim-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dda-assg2-packingsim",
  storageBucket: "dda-assg2-packingsim.appspot.com",
  messagingSenderId: "226734249363",
  appId: "1:226734249363:web:ac7880918d83ac41ba8466"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

//Working with Auth
const auth = getAuth();

////SIGN IN USER
//retrieve element from form
let SignInUser = document.getElementById("frmSignInUser");

//we create a button listener to listen when someone clicks
SignInUser.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    //var displayname = document.getElementById("username").value;
    
    signInUser(email, password);
    //console.log("Sign In User: email" + email + "password" + password + "username" + displayname);
  });
  
  function signInUser(email, password){
    console.log("Sign in user...")
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    //var displayname = document.getElementById("username").value;

    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      //signedin
      const user = userCredential.user;
      const uid = user.uid;

      sessionStorage.setItem("UUID", uid);
      console.log("The user uid" + uid);
      
      console.log("logging in user ... " + JSON.stringify(userCredential));
      console.log("User is now signed in ");
      console.log("Sign In User: email" + email + "password" + password);

      console.log("login update")
  
      update(ref(db, "playerStats/" + uid),{
        active: true
      });
      update(ref(db, "leaderboards/" + uid),{
        active: true
      });

      update(ref(db, "players/" + uid),{
        active: true
      });
      setTimeout(() => {window.location.href="index.html"}, 1000);
      
      //change page
      //setTimeout(() => {window.location.href="index.html"}, 1000);

      //update display name
      //UpdatePlayerDisplayName(displayname);
      //console.log(displayname);

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
    });
  }

