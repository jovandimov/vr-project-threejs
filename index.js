var http = require("http");
var express = require("express");
var app = express();

//serve static files from the build folder
app.use(express.static("build"));
var server = http.createServer(app);

/*app.use(cors({
    origin: '*',
}));*/

const now = new Date()

server.listen(4000, function () {
	console.log("** Server is listening on localhost:4000, open your browser on http://localhost:4000/ **");
});

const sockets = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

sockets.on("connection", socket => {
    console.log("New connection: " + socket.id);

    socket.on('disconnect', function() {
        console.log('Disconnected: '+ socket.id);
    });
});

