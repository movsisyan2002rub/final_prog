var LivingCreature = require("./harevaniMart.js")

module.exports = class Gel extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCells(character) {
        this.getNewCoordinates();
        return super.chooseCells(character);

    }
    chooseCells1(tiv1, tiv2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == tiv1 || matrix[y][x] == tiv2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var emptyCells = this.chooseCells(0);
        var datarkvandak = Random(emptyCells);
        if (datarkvandak) {
            var newx = datarkvandak[0];
            var newy = datarkvandak[1];


            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = 3;

            this.y = newy;
            this.x = newx;
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }

    }
    eat() {
        var xotaker1 = this.chooseCells1(4, 2);
        var xotaker2 = Random(xotaker1);
        if (xotaker2) {
            var newX = xotaker2[0];
            var newY = xotaker2[1];
            if (matrix[newY][newX] == 4) {
                console.log(matrix[newY][newX]);
                this.die();
                for (var i in patArr) {
                    if (newX == patArr[i].x && newY == patArr[i].y) {
                        patArr.splice(i, 1);
                        matrix[newY][newX] = 0;
                        break;
                    }
                }
            }
            else if (matrix[newY][newX] == 2) {
                matrix[newY][newX] = 3;
                matrix[this.y][this.x] = 0;
                this.y = newY;
                this.x = newX;
                this.energy++;
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }

                if (this.energy >= 20) {
                    this.mul();
                }
            }

            else {
                this.move();
            }
        }
        else {
            this.move();
        }
    }
    mul() {
        var emptyCells = this.chooseCells(1);
        var newCell = Random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var newgel = new Gel(newX, newY, this.index);
            gelArr.push(newgel);
            this.energy = 10;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

        }
    }
    die() {
        for (var i in gelArr) {
            if (this.x == gelArr[i].x && gelArr[i].y == this.y) {
                matrix[this.y][this.x] = 0;
                gelArr.splice(i, 1);
                break;
            }
        }
    }

}
