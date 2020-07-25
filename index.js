const input = document.querySelector("input");
const form = document.querySelector("form");
const button = document.querySelector("button");
const chatbox = document.querySelector("#chatbox");

let id = 0;

function handleSubmit(event) {
  event.preventDefault();
  const sender = ["Me", "Myself", "I"][Math.floor(Math.random() * 3)];
  createMessage(sender, input.value);
  form.reset();
}

form.addEventListener("submit", handleSubmit);

function getChuckNorrisJoke() {
  fetch("https://api.icndb.com/jokes/random")
    .then((response) => response.json())
    .then((json) => createMessage("Fact", json.value.joke));
}

button.addEventListener("click", getChuckNorrisJoke);

function createMessage(sender, messageText) {
  id++;
  let date = new Date();
  let hours = date.getHours();
  if (hours > 12){
      hours = hours - 12;
  }
  let minutes = date.getMinutes();
  if (minutes < 10){
      minutes = "0" + minutes;
  }
  let time = hours + ":" + minutes;
  const message = `<div class='message' id='${id}'>
                              <span>${time}</span>
                              <span class="sender">${sender}:</span>
                              <span>${messageText}</span>
                              <span class="delete" onclick='deleteMessage(${id})'>❌</span>
                            </div>`;
  chatbox.innerHTML = chatbox.innerHTML + message ;
  chatbox.scrollTop = chatbox.scrollHeight;
}

const deleteMessage = (id) => {
    const message = document.getElementById(id);
    message.parentNode.removeChild(message);
};