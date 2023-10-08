import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { 
  getDatabase,
  ref,
  set,
  push,
  onChildAdded,
  update,
  remove, } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBSLIyauKhPNkLxDLWHZvz3rPnWcPhYgPw",
  authDomain: "todo-g-cadaf.firebaseapp.com",
  projectId: "todo-g-cadaf",
  storageBucket: "todo-g-cadaf.appspot.com",
  messagingSenderId: "947445854034",
  appId: "1:947445854034:web:2fc5bdf2943ad79e69948b"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var database = getDatabase(app)

var inp = document.getElementById("inp");
var list = document.getElementById("list");

var todelist = [];

window.AddTodo = function () {
  var input = {
    input: inp.value,
  };

  var referkey = ref(database);
  var randomId = push(referkey).key;
  input.id = randomId;

  var reference = ref(database, `inputValues/${input.id}`);
  set(reference, input);
  inp.value = "";
};

window.getData = function () {
  var refer = ref(database, "inputValues");
  onChildAdded(refer, function (data) {
    render(data.val());
    // console.log(data.val());
  });
};

getData();

var list = document.getElementById("list");

window.render = function (data) {
  if (data) {
    todelist.push(data);
  }

  list.innerHTML = "";
  for (var i = 0; i < todelist.length; i++) {
    list.innerHTML += `<li class="txt-aqua">${todelist[i].input}
        <button onclick="editTodo(${i},'${todelist[i].id}')" class ="btn position-absolute end-0"><i class="fa-solid fa-pencil fa-beat" style="color: #2cc93e;"></i></button>
        <button onclick="deleteTodo(${i},'${todelist[i].id})" class ="pose"><i class="fa-solid fa-trash-can fa-beat-fade" style="color: #26c965;"></i></button>
      </li>`;
  }
};


window.editTodo = function (index, id) {
  var newText = prompt("Enter updated data", todelist[index].input);
  if (newText !== null) {
    todelist[index].input = newText;
    render();

    var refer = ref(database, "inputValues/" + id);
    update(refer, {
      input: newText,
    });
  }
};

// update(); 

// window.deleteTodo = function (index, id) {
//   // Remove the todo item from the local array
//   todelist.splice(index, 1);

//   // Remove the todo item from the Firebase database
//   var refer = ref(database, `inputValues/${id}`);
//   remove(refer, database);

//   // Update the UI to reflect the deletion
//   render();
// };
// deleteTodo();
window.deleteTodo = function (index, id) {
  // Remove the todo item from the local array
  todelist.splice(index, 1);

  // Remove the todo item from the Firebase database
  var refer = ref(database, `inputValues/${id}`);
  remove(refer, database);

  // Update the UI to reflect the deletion
  render();
};
