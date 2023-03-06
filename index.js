const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    console.log('A user said: ' + msg)
    io.emit('chat message', msg);
  });
});
io.on('connection', (socket) => {
  console.log('A user connected!');
  io.emit('chat message', 'A user connected!')
  socket.on('disconnect', () => {
    console.log('User disconnected :(');
    io.emit('chat message', 'User disconnected :(')
  });
});
http.listen(port, () => {
  console.log(`Chat is running at localhost:${port}`);
});
