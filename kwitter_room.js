var firebaseConfig = {
      apiKey: "AIzaSyDrseIFc0qvx1znhuQMlBAQP17Lq_sYFdU",
      authDomain: "kwitter-90194.firebaseapp.com",
      databaseURL: "https://kwitter-90194-default-rtdb.firebaseio.com",
      projectId: "kwitter-90194",
      storageBucket: "kwitter-90194.appspot.com",
      messagingSenderId: "402090926668",
      appId: "1:402090926668:web:efb713d564296ea7f80ae9",
      measurementId: "${config.measurementId}"
};
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("UserName");
document.getElementById("username").innerHTML = "Welcome &nbsp;" + username + "!";

function addroom() {
      roomname = document.getElementById("input_room_name").value;
      firebase.database().ref("/").child(roomname).update({
            Purpose: "Adding Room"
      });
      localStorage.setItem("RoomName", roomname);
      window.location = "kwitter_page.html";
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}







function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("Room Name - " + Room_names);
                  row = "<div class = 'room_name' id = "+Room_names+" onclick = 'redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();

function redirectToRoomName (name) {
      console.log(name);
      localStorage.setItem("RoomName", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("UserName");
      localStorage.removeItem("RoomName")
      window.location = "index.html";
}