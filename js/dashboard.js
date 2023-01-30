import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getDatabase, ref, get, query, child, set, onValue, orderByChild, limitToLast} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Nte-TSWCBRUYXUvx2ZIP7_IMLbxshTQ",
  authDomain: "dda-wrigleystudio-y2s2-ip.firebaseapp.com",
  databaseURL: "https://dda-wrigleystudio-y2s2-ip-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dda-wrigleystudio-y2s2-ip",
  storageBucket: "dda-wrigleystudio-y2s2-ip.appspot.com",
  messagingSenderId: "1048521337977",
  appId: "1:1048521337977:web:53224d4d694c8672ea38a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

//Working with Auth
const auth = getAuth();
const user = auth.CurrentUser;
const leaderboard = ref(db, "leaderBoards");
const players = ref(db,"players")


//Retrieve from login
var myData = sessionStorage.getItem('UUID');
console.log("this is my data in dashboard: " + myData);

getDashBoard();
function getDashBoard(){
    //const leaderboard = query(ref(db,"leaderboards"))
    get(players).then((snapshot) => { //retrieve a snapshot of the data using a callback
        if (snapshot.exists()) {
          //if the data exist
          var userList= [];
          snapshot.forEach((childSnapshot) => {
            userList.push(childSnapshot.val());                   
          });
  
            var noOfActiveUser = document.getElementById("noOfActiveUser");
            var noOfActiveUserContent = "";
            var noRegisterUser = document.getElementById("noOfRegisteredUser");
            var noRegisterUserContent = "";
            
            userList.reverse()
             console.log(userList);
  
            var totalActiveUser = 0;
            var totalRegisteredUser = 0;
            totalRegisteredUser = userList.length;
            noRegisterUserContent = `
            <p>${totalRegisteredUser}</p>
            `   
            userList.forEach((item) => {
            if(item.active == true)
            {
                totalActiveUser++
                noOfActiveUserContent = `
            <p>${totalActiveUser}</p>
            `
            }
          });
          noOfActiveUser.innerHTML = noOfActiveUserContent;
          noRegisterUser.innerHTML = noRegisterUserContent;
        }
        else {
          //@TODO what if no data ?
        }
      });
  
    get(leaderboard).then((snapshot) => { //retrieve a snapshot of the data using a callback
      if (snapshot.exists()) {
        //if the data exist
        var dashBoardList= [];
        snapshot.forEach((childSnapshot) => {
            dashBoardList.push(childSnapshot.val());                   
        });

        var overAllBoxesDelivered = document.getElementById("overAllBoxesDelivered");
        var overAllBoxesDeliveredContent = "";
        var overAllMoneyEarned = document.getElementById("overAllMoneyEarned");
        var overAllMoneyEarnedContent = "";
        dashBoardList.reverse()
        console.log(dashBoardList);

        var totalBox = 0;
        var totalMoney = 0;

        dashBoardList.forEach((item) => {
          //console.log(`username of players found: ${item.noOfMoneyEarned}`);
          if (item.noOfboxDelivered == null)
          {
            totalBox += 0;
          }
          else
          {
            totalBox += item.noOfboxDelivered;
          }

          if (item.noOfMoneyEarned == null)
          {
            totalMoney += 0;
          }
          else
          {
            totalMoney += item.noOfMoneyEarned;
          }
            //totalRegisteredUser = dashBoardList.length;
            
            overAllBoxesDeliveredContent = `
            <p>${totalBox}</p>
            `
            overAllMoneyEarnedContent = `
            <p>$${totalMoney}</p>
            `
        });
        overAllBoxesDelivered.innerHTML = overAllBoxesDeliveredContent;
        overAllMoneyEarned.innerHTML = overAllMoneyEarnedContent;
      }
      else {
        //@TODO what if no data ?
      }
    });
  }