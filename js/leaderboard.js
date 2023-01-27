import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, get, query, child, set, onValue, orderByChild, limitToLast} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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
const user = auth.CurrentUser;
//const leaderboard = ref(db, "leaderboards");


//Retrieve from login
var myData = sessionStorage.getItem('UUID');
console.log("this is my data in leaderboard: " + myData);

var limit = 10;
// get leaderboard
  getLB(limit);
  function getLB(limit = 10){
     //q = get(leaderboard).then(orderByChild("noOfMoneyEarned"));
     // Sort the leaderboard
    const que = query(ref(db,"leaderboards"),orderByChild("noOfMoneyEarned"),limitToLast(limit))
    
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
        lbList.reverse()
        console.log(lbList);

        var i = 1;
        lbList.forEach((item) => {
          //console.log(`username of players found: ${item.noOfMoneyEarned}`);
          var status = "Offline";
          var username = "Unable to retrieved player name";
          var moneyEarned = "0";
          var boxedDelivered = "0";

          if(item.active == true){
            status = '<td style="color:green;">Online</td>'
          }
          else{
            status = '<td style="color:red;">Offline</td>'
          }

          if(item.userName == null){
            username = "Unable to retrieved player name";
          }
          else{
            username = item.userName;
          }

          if(item.noOfMoneyEarned == null){
            moneyEarned = "0";
          }
          else{
            moneyEarned = item.noOfMoneyEarned;
          }

          if(item.noOfboxDelivered == null){
            boxedDelivered = "0";
          }
          else{
            boxedDelivered = item.noOfboxDelivered;
          }

          content += `
          
          <tr>
          <td>${i++}</td>
          <td>${username}</td>
          ${status}
          <td>$${moneyEarned}</td>
          <td>${boxedDelivered}</td>
          </tr>
          `
        });
        leaderBoardData.innerHTML += content;
        /*
        try {
          //let's do something about it
          var overLeaderBoard = document.getElementById("leaderBoardData");
          var content = "";
          snapshot.forEach((childSnapshot) => 
            //looping through each snapshot
            console.log(`username of players found: ${childSnapshot.child("userName").val()}`);
            content += `<tr>
            <td>${childSnapshot.child("userName").val()} </td>
            <td>${childSnapshot.child("userName").val()}</td>
            <td>${childSnapshot.child("noOfMoneyEarned").val()}</td>
            <td>${childSnapshot.child("noOfboxDelivered").val()}</td>
            </tr>`;                                
          });
          overLeaderBoard.innerHTML = content;
        } catch (error) {
          console.log("Error getPlayerData" + error);
        }
        */
      }
      else {
        //@TODO what if no data ?
      }
    });
  }
/*
  function AddAllItemsToTable(leaderboard)
  {
    leaderboard.reverse();
    console.log(leaderboard);
    var overLeaderBoard = document.getElementById("leaderBoardData");
    var content, index1, index2, index3, index4 = "";
    for (let i = 0; i++; index1 in leaderboard.i) {
      
      content += "<td>"+ leaderboard.i[index1].noOfMoneyEarned + "</td>";
    }
    console.log(content);
    overLeaderBoard.innerHTML = content;
  }
  function GetCurrentUser(){
    return user;
  }
  */