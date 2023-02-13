import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getDatabase, ref, get, query, child, set, onValue, orderByChild, limitToLast, update} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

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
const leaderBoards = ref(db, "leaderBoards");
const players = ref(db,"players");
const playerStats = ref(db,"playerStats");
const gameLevels = ref(db, "gameLevels");
const gameCompletion = ref(db, "gameCompletion");

//Retrieve from login
var myData = sessionStorage.getItem('UUID');
console.log("this is my data in refreshpage: " + myData);

var limit = 10;
// Call the function ever 5 five seconds
function refreshData(){
  // do whatever you like here
  //console.log("execute refresh data, wait 7 seconds");
  updateData(limit);
  setTimeout(updateNotificationFunc, 5000);
  setTimeout(refreshData, 7000);
  //updateNotificationFunc();
}

function updateNotificationFunc(){
  //console.log("notification updated");
  var updateNotification = document.getElementById("updateNotification");
  //var updateNotificationContent = "Top 10 Leaderboard Ranking (Updating...)";
  setTimeout(() => {  updateNotification.innerHTML = `Top 10 Leaderboard Ranking (Updating)`; }, 0);
  setTimeout(() => {  updateNotification.innerHTML = `Top 10 Leaderboard Ranking (Updating.)`; }, 500);
  setTimeout(() => {  updateNotification.innerHTML = `Top 10 Leaderboard Ranking (Updating..)`; }, 1000);
  setTimeout(() => {  updateNotification.innerHTML = `Top 10 Leaderboard Ranking (Updating...)`; }, 1500);
  //updateNotification.innerHTML = updateNotificationContent;
}
refreshData();

function updateData(limit){
  
  //console.log("Data updated");
  const que = query(ref(db,"leaderBoards"),orderByChild("totalScore"),limitToLast(limit))
    
    //get the sorted leaderboard
    get(que).then((snapshot) => { //retrieve a snapshot of the data using a callback
      if (snapshot.exists()) {
        //if the data exist
        var lbList= [];
        snapshot.forEach((childSnapshot) => {
           lbList.push(childSnapshot.val());                   
        });

        var leaderBoardData = document.getElementById("leaderBoardData");
        var content = "";
        var removeContent = "";
        lbList.reverse()
        //console.log(lbList);
        var updateNotification = document.getElementById("updateNotification");
        var updateNotificationContent = "Top 10 Leaderboard Ranking";
        removeContent = `<tr>
        <th>Ranking</th>
        <th>Name</th>
        <th>Total Score</th>
        <th>Total Star</th>
        <th>Status</th>
        </tr>`
        updateNotificationContent = `Top 10 Leaderboard Ranking`

        var i = 1;
        lbList.forEach((item) => {
          //console.log(`username of players found: ${item.noOfMoneyEarned}`);
          var status = "Offline";
          var username = "Unable to retrieved player name";
          var totalScore = "0";
          var totalStar = "0";

          if(item.status == true){
            status = '<td style="color:#00664B; font-weight: bold; ">Online</td>'
          }
          else{
            status = '<td style="color:#B10E0E; font-weight: bold; ">Offline</td>'
          }

          if(item.userName == null){
            username = "Unable to retrieved player name";
          }
          else{
            username = item.userName;
          }

          if(item.totalScore == null){
            totalScore = "0";
          }
          else{
            totalScore = item.totalScore;
          }

          if(item.totalStar == null){
            totalStar = "0";
          }
          else{
            totalStar = item.totalStar;
            //console.log("What the total star :" + totalStar);
          }

          content += `
          
          <tr>
          <td>${i++}</td>
          <td>${username}</td>
          <td>${totalScore}</td>
          <td>${totalStar}</td>
          ${status}
          </tr>
          `
          
        });
        
        leaderBoardData.innerHTML = removeContent;
        leaderBoardData.innerHTML += content;
        updateNotification.innerHTML = updateNotificationContent;
        //setTimeout(() => {  updateNotification.innerHTML = `Top 10 Leaderboard Ranking (Updating...)`; }, 5);
      }
      else {
      }
    });

get(leaderBoards).then((snapshot) => { //retrieve a snapshot of the data using a callback
  if (snapshot.exists()) {
    //if the data exist
    var dashBoardList= [];
    snapshot.forEach((childSnapshot) => {
        dashBoardList.push(childSnapshot.val());                   
    });

    var overAllScore = document.getElementById("overAllScore");
    var overAllScoreContent = "";
    var overAllStar = document.getElementById("overAllStar");
    var overAllStarContent = "";
    dashBoardList.reverse()
    //console.log(dashBoardList);

    var totalStar = 0;
    var totalScore = 0;

    dashBoardList.forEach((item) => {
      //console.log(`username of players found: ${item.noOfMoneyEarned}`);
      if (item.totalStar == null)
      {
        totalStar += 0;
      }
      else
      {
        totalStar += item.totalStar;
      }

      if (item.totalScore == null)
      {
        totalScore += 0;
      }
      else
      {
        totalScore += item.totalScore;
      }
        //totalRegisteredUser = dashBoardList.length;
        
        overAllStarContent = `
        <p class="my-text-font3">${totalStar}</p>
        `
        overAllScoreContent = `
        <p class="my-text-font3">${totalScore}</p>
        `
    });
    overAllStar.innerHTML = overAllStarContent;
    overAllScore.innerHTML = overAllScoreContent;
  }
  else {
    //@TODO what if no data ?
  }
});
}
