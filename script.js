var socket = io();
var side = 20;

var weatherclient = "Summer";

socket.on("exanak", function (w) {
    weatherclient = w;
});

function setup() {
    createCanvas(20 * side, 20 * side);
    background('blue');
}


function drawWeather(w) {
    var p = document.getElementById("seasons");
    var weather = w;
    console.log(weather);


    if (weather == "Summer") {
        p.innerText = "Summer";
    } else if (weather == "Winter") {
        p.innerText = "Winter"
    } else if (weather == "Autumn") {
        p.innerText = "Autumn";
    } else if (weather == "Spring") {
        p.innerText = "Spring";
    }
}

function drawMatrix(matrix) {
    background('grey');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("grey");
            }
            else if (matrix[y][x] == 1) {
                if (weatherclient == "Summer") {
                    fill("green");
                } else if (weatherclient != "Summer") {
                    fill("#7CFC00");
                }
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                if (weatherclient == "Winter") {
                    fill("red");
                } else if (weatherclient != "Winter") {
                    fill("#B22222");
                }
            }
            else if (matrix[y][x] == 4) {
                fill("lightblue");
            }
            rect(x * side, y * side, side, side);
        }
    }
}


socket.on("matrix", drawMatrix);
socket.on("exanak", drawWeather);
