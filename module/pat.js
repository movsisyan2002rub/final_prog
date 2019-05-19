var LivingCreature = require("./harevaniMart.js")

module.exports = class Pat extends LivingCreature {
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
    xotavelacnel() {
        var emptyCells = this.chooseCells(0);
        var newCell = Random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            var norxot = new Grass(newX, newY, 1);
            grassArr.push(norxot);
            matrix[newY][newX] = 1;
        }
    }
}

