var socket = io();
var side = 20;

function setup() {
    createCanvas(20 * side, 20 * side);
    background('blue');
}

function drawMatrix(matrix) {
    background('grey');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("grey");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("lightblue");
            }
            rect(x * side, y * side, side, side);
        }
    }
}


socket.on("matrix", drawMatrix);
