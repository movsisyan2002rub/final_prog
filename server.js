var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


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




Weather = "Winter";
Wheatherinit = 1;
Grassinit = 0;
GrassEaterinit = 0;
gelInit = 0;

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
    if (Wheatherinit == 3) {
        Weather = "Winter";
    }
    if (Wheatherinit == 2) {
        Weather = "Spiring";
    }
    if (Wheatherinit == 1) {
        Weather = "Summer";
    }
    io.sockets.emit("exanak", Weather);
}



function genMatrix(w, h) {
    matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 90);
            if (r < 40) r = 0;
            else if (r < 60) r = 1;
            else if (r < 80) r = 2;
            else if (r < 85) r = 3;
            else if (r < 90) r = 4;
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
        Grassinit++;
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
        grassEaterArr[i].move();
        grassEaterArr[i].mul();
        GrassEaterinit++
    }
    for (var i in gelArr) {
        gelArr[i].eat();
        gelInit++;
    }
    for (var i in patArr) {
        patArr[i].xotavelacnel();
    }

    io.sockets.emit("matrix", matrix);
}

io.on('connection', function (socket) {

    socket.on("pat", function () {
        var e = 20;
        var b = 20;

        for (var y = 0; y < e; y++) {
            matrix[y] = [];
            for (var x = 0; x < b; x++) {
                if (x == 9 || x == 10 || y == 10 || y == 11) {
                    matrix[y][x] = 4;
                }
                else {
                    matrix[y][x] = Math.floor(Math.random() * 2);
                }
            }
        }
        io.sockets.emit("matrix", matrix);
    });


});

var obj = { "info": [] };
function main() {
    var file = "Statistics.json";
    obj.info.push({ "cnvac xoter@": Grassinit, "cnvac xotakerner@": GrassEaterinit, "cnvac geler@": gelInit });
    fs.writeFileSync(file, JSON.stringify(obj, null, 5));
}



setInterval(drawServerer, 1000);
setInterval(draw_wheater, 3000);
setInterval(main, 3000);