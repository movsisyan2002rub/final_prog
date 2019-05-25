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
                if (weatherclient == "Summer") {
                    fill("grey");
                }
                else if (weatherclient == "Spring") {
                    fill("#8C6750")
                }
                else if (weatherclient == "Autumn") {
                    fill("#FE914C")
                }
                else if (weatherclient == "Winter") {
                    fill("#F5ECE6")
                }
            }
            else if (matrix[y][x] == 1) {
                if (weatherclient == "Summer") {
                    fill("green");
                } else if (weatherclient != "Summer") {
                    fill("#9ACD32");
                }
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
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }
}


function patButtom() {
    socket.emit("pat");
}

socket.on("matrix", drawMatrix);
socket.on("exanak", drawWeather);



