var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});


server.listen(3000, function() {
    condole.log("3000 portov bacec")
});

grassArr = [];
grassEaterArr = [];
gelArr = [];
patArr = [];

// xot_avelacav = 0;
// xotaker_cnvav = 0;
// gel_avelcav = 0;
// pat_stexcvav = 0;

Grass = require("./modules/grass.js");
GrassEater = require("./modules/grasseter.js");
Gel = require("./modules/gel.js");
Pat = require("./modules/pat.js");

var w = 50;
var h = 60;

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; h++){
        matrix[y] = [];
        for (varx = 0; x < w; x++){
            var r = Math.floor(Math.random() * 75);
            if (r < 20) r = 0;
            else if (r < 40) r = 1;
            else if (r < 42) r = 2;
            else if (r < 75) r = 3;
            // else if (r < 85) r = 4;
            // else if (r < 100) r = 5;
        }
    }
    return matrix;
}

matrix = genMatrix(w, h);

for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            var eater = new GrassEater(x, y, 2);
            grassEaterArr.push(eater);
        }
        else if (matrix[y][x] == 3) {
            var gel = new Gel(x, y, 3);
            gelArr.push(gel);
        }

        else if (matrix[y][x] == 4) {
            var pat = new Pat(x, y, 4);
            patArr.push(pat);
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

setInterval(drawServerery, 3000);
