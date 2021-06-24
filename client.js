const io = require("socket.io-client");
const socket = io("http://localhost:3000")
const readline = require("readline");
const chalk = require("chalk");

let username = "";

let reader = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
    prompt:">>"
})

reader.question('What is your name? ', (answer) => {
    username = answer
    console.log(`Hi ${username}`);
    socket.emit("joined",username)
    reader.prompt()
});

socket.on("broadcast", (userObj, user) => {
    console.log(chalk.yellow(`${user} has joined`))
    console.log(chalk.red(`${userObj.count} users has joined`))
    reader.prompt()
})