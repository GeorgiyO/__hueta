
let doubleArraySum = (arr) => {
    let sum = 0;
    arr.forEach((a) => {
        a.forEach((e) => sum += e);
    });
    return sum;
}

const VALID_SUM_VALUE = 20;

let battleFieldChecker = {
    field: undefined,
    shipsCheckedPositions: undefined,
    shipsCount: undefined,
    init: function(field) {
        this.field = field;
        this.shipsCheckedPositions = [];
        this.shipsCount = [];
        for (let i = 0; i < 10; i++) {
            this.shipsCheckedPositions.push(new Array(10).fill(0));
        }
        for (let i = 4; i >= 1; i--) this.shipsCount.push(i);
    },
    isInvalidPoint: function(x, y) {
        if (this.field[x][y] === 0) return false;
        return this.diagonalInvalid(x, y) || this.shipInvalid(x, y);
    },
    diagonalInvalid: function(x, y) {
        if (x < 9) {
            if (y < 9) {
                if (this.field[x + 1][y + 1] === 1) return true;
            }
            if (y > 0) {
                if (this.field[x + 1][y - 1] === 1) return true;
            }
        }
        return false;
    },
    shipInvalid: function (x, y) {
        let ver = false;
        let hor = false;

        if (x < 9) hor = this.field[x + 1][y] === 1;
        if (y < 9) ver = this.field[x][y + 1] === 1;

        if (hor && ver) return true;

        if (this.shipsCheckedPositions[x][y] === 0) {
            let len = 0; // should be 1, 0 for index in array
            if (hor) {
                for (let _x = x + 1; _x < 10; _x++) {
                    if (this.field[_x][y] === 1) {
                        this.shipsCheckedPositions[_x][y] = 1;
                        len++;
                    } else break;
                }
            } else {
                for (let _y = y + 1; _y < 10; _y++) {
                    if (this.field[x][_y] === 1) {
                        this.shipsCheckedPositions[x][_y] = 1;
                        len++;
                    } else break;
                }
            }

            if (len > 3) return true;

            this.shipsCount[len]--;
            if (this.shipsCount[len] < 0) return true;
        }

        return false;
    }
}

function validateBattlefield(field) {
    if (doubleArraySum(field) !== VALID_SUM_VALUE) return false;

    battleFieldChecker.init(field);

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            if (battleFieldChecker.isInvalidPoint(x, y)) return false;
        }
    }

    return battleFieldChecker.isShipsCountValid();
}

console.log(validateBattlefield([
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]));