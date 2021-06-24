const server = require("http").createServer((req, res) => {});
const io = require("socket.io")(server);
const chalk = require("chalk")

const PORT = 3000;
const userObj = {};
let numUsers = 0;

io.on("connection", socket => {
    socket.on("joined", user => {
        ++numUsers;
        userObj[user] = socket.id;
        userObj["count"] = numUsers;
        console.log(user+" has joined the server")
        console.log(userObj)
        socket.broadcast.emit('broadcast',userObj, user);
    })
})

server.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`)
})