// Store messages (like a fake database)
let messages = [];

let form = document.getElementById("contactForm");
let list = document.getElementById("messageList");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let message = document.getElementById("message").value;

  // ✅ Validation
  if (name === "" || message === "") {
    alert("Please fill all fields!");
    return;
  }

  // ✅ Simulate POST (sending data)
  let newMessage = {
    user: name,
    text: message
  };

  messages.push(newMessage);

  // ✅ Display messages (like GET request)
  displayMessages();

  // Clear inputs
  form.reset();
});

// Function to display messages
function displayMessages() {
  list.innerHTML = "";

  messages.forEach(function(msg) {
    let li = document.createElement("li");
    li.textContent = msg.user + ": " + msg.text;
    list.appendChild(li);
  });
}