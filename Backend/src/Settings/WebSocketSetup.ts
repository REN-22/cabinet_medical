import WebSocket from 'ws'

const socket = new WebSocket('wss://toga.alwaysdata.net:' + process.env.PORT)

socket.on('open', () => {
  console.log('Connexion WebSocket établie.')
})

socket.on('message', (data) => {
  console.log('Message WebSocket reçu :', data)
})

socket.on('close', () => {
  console.log('Connexion WebSocket fermée.')
})

export default socket
