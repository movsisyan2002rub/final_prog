var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("port is runninng")

});

Grass = require("./module/grass.js");
GrassEater = require("./module/grasseter.js");
Gel = require("./module/gel.js");
Pat = require("./module/pat.js");


grassArr = [];
grassEaterArr = [];
gelArr = [];
patArr = [];

Weather = "Summer";
Wheatherinit = 1;
Grassinit = 0;
GrassEaterinit = 0;
Gelinit = 0;
Patinit = 0;

var w = 50;
var h = 60;


function draw_wheater() {
    Wheatherinit++;
    if (Wheatherinit == 5) {
        Wheatherinit = 1;
    }
    if (Wheatherinit == 4) {
        Weather = "Autumn";
    }
    if (Wheatherinit == 4) {
        Weather = "Winter";
    }
    if (Wheatherinit == 4) {
        Weather = "Spiring";
    }
    if (Wheatherinit == 4) {
        Weather = "Summer";
    }
}

io.sockets.emit("exanak", Weather);

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 95);
            if (r < 20) r = 0;
            else if (r < 10) r = 1;
            else if (r < 55) r = 2;
            else if (r < 75) r = 3;
            else if (r < 95) r = 4;
            // else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

matrix = genMatrix(w, h);

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y, 1));
        }
        else if (matrix[y][x] == 2) {
            grassEaterArr.push(new GrassEater(x, y, 2));
        }
        else if (matrix[y][x] == 3) {
            gelArr.push(new Gel(x, y, 3));
        }
        else if (matrix[y][x] == 4) {
            patArr.push(new Pat(x, y, 4));
        }
    }
}


function drawServerer() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in gelArr) {
        gelArr[i].eat();
    }
    for (var i in patArr) {
        patArr[i].xotavelacnel();
    }


    io.sockets.emit("matrix", matrix);
}

setInterval(drawServerer, 2000);
setInterval(draw_wheater, 5000);
