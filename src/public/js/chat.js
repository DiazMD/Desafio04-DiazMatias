const socketClient = io()
const h3Name = document.getElementById("name")
const form = document.getElementById("chatForm")
const inputMessage = document.getElementById("message")
const divChat = document.getElementById("chat")

let user;

Swal.fire({
    title: 'Welcome!',
    text: 'What is your name?',
    input: "text",
    inputValidator: (value) => {
        if (!value) {
            return "Name is required";
        }
    },
    confirmButtonText: 'Enter'
  })

  .then(input => {
    user = input.value;
    h3Name.innerText = user;
    socketClient.emit("newUser", user)
  });

  socketClient.on("userConnected", user => {
    Toastify({
        text: `${user} connected`,
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        duration: 5000,
      }).showToast();
  })

  form.onsubmit = (e) => {
    e.preventDefault();
    const infoMessage = {
        name: user,
        message: inputMessage.value,
    };
    inputMessage.innerText = "";
    socketClient.emit("message", infoMessage)
  }

  socketClient.on("chat", (messages) => {
    const chat = messages.map(m => {
        return `<p>${m.name}: ${m.message}</p>`;
    })
    .join(" ")
    divChat.innerHTML = chat;
  })

