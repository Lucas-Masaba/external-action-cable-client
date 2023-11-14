const createSocket = () => {
  // Action Cable has a websocket mounted at:
  // ws://localhost:3000/cable
  const socket_url = 'ws://localhost:3000/cable'
  const socket = new WebSocket(socket_url)

  // When the socket is opened, we can send the data to the server
  socket.onopen = (event) => {
    console.log("Connected to Server")
    const msg = {
      command: 'subscribe',
      identifier: JSON.stringify({
        id: 1,
        channel: 'AlertsChannel'
      })
    }
    socket.send(JSON.stringify(msg))
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)

    if(data.type === "ping"){
      return

    }
    if(data.message){
      console.log(data.message)
    }
  }
  socket.onclose = (event) => {
    console.log("Disconnected from Server")
  }
  socket.onerror = (event) => {
    console.log("Error: ", event)
  }
}

createSocket()