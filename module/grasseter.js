var LivingCreature = require("./harevaniMart.js")

module.exports = class GrassEater extends LivingCreature {
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

    move() {
        var emptyCells = this.chooseCells(0);
        var datarkvandak = Random(emptyCells);
        if (datarkvandak) {
            var newx = datarkvandak[0];
            var newy = datarkvandak[1];


            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = 2;

            this.y = newy;
            this.x = newx;

            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }

        }

    }

    eat() {
        var grass1 = this.chooseCells(1);
        var grass2 = Random(grass1);
        if (grass2) {

            var newX = grass2[0];
            var newY = grass2[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.y = newY;
            this.x = newX;
            this.energy++;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 10) {
                this.mul();
                this.energy = 5
            }
        }
        else {
            this.move();
        }
    }
    mul() {
        var emptyCells = this.chooseCells(0);
        var newCell = Random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            var newGrassEater = new GrassEater(newX, newY, this.index);
            grassEaterArr.push(newGrassEater);
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);

                break;
            }
        }
    }
}

