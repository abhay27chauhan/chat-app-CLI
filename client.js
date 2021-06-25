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
    console.log(chalk.magenta(`${userObj.count} users has joined`))
    reader.prompt()
})

socket.on("msg", data => {
    console.log(chalk.green(data));
    reader.prompt()
})

socket.on("privateMsg", (data, reciever) => {
    console.log(chalk.red(data));
    reader.prompt()
})

// how to write the msg ->
//     -> if public -> write msg direclty
//     -> if private -> private usernameOfReciever msg

reader.on("line", function(data){
    const arr = data.split(" ");

    if(arr[0] === "private"){
        let reciever = arr[1];
        arr.shift();
        arr.shift();
        let msg = arr.join(" ");
        socket.emit("privateL", `@${username}: ${msg}`, reciever);
    }else{
        socket.emit("chatting", `@${username}: ${data}`)
    }

    reader.prompt();
})