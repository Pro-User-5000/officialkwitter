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
room_name = localStorage.getItem("RoomName");
document.getElementById("roomnameint").innerHTML = room_name;

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: username,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function logout() {
      localStorage.removeItem("RoomName");
      localStorage.removeItem("UserName");
      window.location = "index.html";
}
function rooms()
{
  window.location = "kwitter_room.html"
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "Purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        user_name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_tag = "<h4>"+user_name+ "<img class='user_tick' src='tick.png'></h4>";
                        message_tag = "<h4 class='message_h4'>"+message+"</h4>";
                        like_btn = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatelike(this.id)'>";
                        span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:"+like+"</span></button><hr>";
                        row = name_tag+message_tag+like_btn+span_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();

function updatelike(message_id) {
      console.log(message_id);
      newlike = document.getElementById(message_id).value;
      updatedlike = Number(newlike)+1;
      firebase.database().ref(room_name).child(message_id).update({
            like:updatedlike
      });
}
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}