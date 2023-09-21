const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const {insertMsg, checkUserExist, fetchRecentMessages} = require('./mysql');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        withCredentials: true,
    }
})

app.use(cors())
app.get('/', (req, res) => {
    res.send('hello express')
  })

io.on("connection", (socket) => {
    console.log("connected with id: " + socket.id);

    //inserts message object into database and calls a react change through websocket emit
    socket.on("sendmessage", async (data) => {
        await insertMsg(data);
        const messages = await fetchRecentMessages();
        io.emit("loadmessages", (messages));
    });

    //checks if user exists in database and creates one if non-existing
    socket.on("checkUserExist", async (data, callback) => {
        console.log('CHECKING!')
        const fetchedUser = await checkUserExist(data);
        callback({
            fetcheduserid: fetchedUser
        });
    });

    //fetches the previous messages for initial load
    socket.on("initialload", async () => {
        const messages = await fetchRecentMessages();
        socket.emit('loadmessages', (messages));
    });
  });



httpServer.listen(5000, () => {
    console.log("listening to port " + 5000)
});

