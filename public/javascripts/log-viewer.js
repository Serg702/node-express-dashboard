const connection = new WebSocket("ws://localhost:3000");

const logWindow = document.querySelector("#log-window");

connection.onopen = () => {
  connection.send("Hello from the client!");
};

connection.onmessage = (e) => {
  logWindow.innerHTML = e.data;
};
