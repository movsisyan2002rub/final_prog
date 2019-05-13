var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

grassArr = [];
grassEaterArr = [];
gelArr = [];
patArr = [];

// xot_avelacav = 0;
// xotaker_cnvav = 0;
// gel_avelcav = 0;
// pat_stexcvav = 0;

var Grass = require("./modules/grass.js");
var GrassEater = require("./modules/grasseter.js");
var Gel = require("./modules/gel.js");
var Pat = require("./modules/pat.js");

let matrix = []; // Մատրիցի ստեղծում
let rows = 100; // Տողերի քանակ
let columns = 100; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
    matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 20) {
            matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
        }
        if (a >= 20 && a < 40) {
            matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
        }
        else if (a >= 40 && a < 50) {
            matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
        }
        else if (a >= 50 && a < 70) {
            matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
        }
        else if (a >= 70 && a < 90) {
            matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
        }
        else if (a >= 90 && a < 100) {
            matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
        }
    }
}

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
setInterval(drawServerery, 3000)
function drawServerery() {
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
