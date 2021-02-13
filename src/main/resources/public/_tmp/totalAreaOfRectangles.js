/*
 * rect = [x0, y0, x1, y1]
 * x0 = left
 * y0 = bottom
 * x1 = right
 * y1 = top
 */
import {assertEquals, TestUtils} from "./utils/testUtils";

let binarySearch = (arr, el, comp) => {
    let _ = Math.floor
    let curDL = _(arr.length / 2);
    let curI = curDL
    let compValue;

    let count = 100;
    do {
        if (count-- === 0) break;
        compValue = comp(el, arr[curI]);
        curDL /= 2;
        curDL = Math.max(_(curDL), 1);

        if (compValue === 1) {
            curI += curDL;
        } else if (compValue === -1) {
            curI -= curDL;
        } else break;
    } while (compValue !== 0 || curDL !== 0);

    return curI;
}

let needCutX = (rect, x) => x > rect[0] && x < rect[2];

let cutX = (rect, x) => [
    [x, rect[1], rect[2], rect[3]],
    [rect[0], rect[1], x, rect[3]]
];

let needCutY = (rect, y) => y > rect[1] && y < rect[3]

let cutY = (rect, y) => [
    [rect[0], y, rect[2], rect[3]],
    [rect[0], rect[1], rect[2], y]
];

let recsEquals = (r1, r2) =>
    r1[0] === r2[0] &&
    r1[1] === r2[1] &&
    r1[2] === r2[2] &&
    r1[3] === r2[3];

let defaultComparator = (a, b) => a > b ? 1 : a === b ? 0: -1;

let first4PrimeNumbers = [2, 3, 5, 7];
let rectHash = (r) => {
    let res = 0;
    for (let i = 0; i < 4; i++) {
        res += r[i] * first4PrimeNumbers[i];
    }
    return res;
}

function calculate(recs) {
    let result = 0;
    let xIndexes = new Set();
    let yIndexes = new Set();

    // get x,y lines, where we need to cut

    recs.forEach(([x0, y0, x1, y1]) => {
        xIndexes.add(x0).add(x1);
        yIndexes.add(y0).add(y1);
    });
    xIndexes = [...xIndexes].sort(defaultComparator);
    yIndexes = [...yIndexes].sort(defaultComparator);

    // cut with x
    console.time("cutting");
    for (let i = 0; i < recs.length; i++) {
        let x = binarySearch(xIndexes, recs[i][0], defaultComparator) + 1;
        while (needCutX(recs[i], xIndexes[x])) {
            let cuttedRecs = cutX(recs[i], xIndexes[x]);
            recs[i] = cuttedRecs[0];
            recs.push(cuttedRecs[1]);
            x++;
        }
    }

    // cut with y
    for (let i = 0; i < recs.length; i++) {
        let y = binarySearch(yIndexes, recs[i][1], defaultComparator) + 1;
        while (needCutY(recs[i], yIndexes[y])) {
            let cuttedRecs = cutY(recs[i], yIndexes[y]);
            recs[i] = cuttedRecs[0];
            recs.push(cuttedRecs[1]);
            y++;
        }
    }
    console.timeEnd("cutting");

    // remove duplicates
    console.time("removing dublicates");
    recs = recs.filter((r, i) => {
        for (let j = i + 1; j < recs.length; j++) {
            if (recsEquals(r, recs[j])) return false;
        }
        return true;
    });
    console.timeEnd("removing dublicates");

    recs.forEach((r) => {
        result += (r[2] - r[0]) * (r[3] - r[1]);
    });

    return result;
}

class Tests {

    binarySearchTest() {

        let getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        }

        let arr = new Array(10000);

        for (let i = 0; i < 10000; i++) {
            arr[i] = getRandomInt(0, 100);
        }

        arr = arr.sort((a, b) => {
            return a > b ? 1 :
                a === b ? 0 :
                    -1;
        });

        for (let i = 0; i < 10000; i+= getRandomInt(1, 2000)) {
            let _i = binarySearch(arr, arr[i], (a, b) => {
                return a > b ? 1 :
                    a === b ? 0 :
                        -1;
            });
            assertEquals(arr[i], arr[_i]);
        }
    }

    noRectangles() {
        assertEquals(0, calculate([]));
    }

    oneRectangle1() {
        assertEquals(1, calculate([[0,0,1,1]]));
    }

    oneRectangle2() {
        assertEquals(22, calculate([[0,4,11,6]]));
    }

    twoRectangles1() {
        assertEquals(2, calculate([[0,0,1,1], [1,1,2,2]]));
    }

    twoRectangles2() {
        assertEquals(4, calculate([[0,0,1,1], [0,0,2,2]]));
    }

    threeRectangles() {
        assertEquals(36, calculate([[6,3,8,9], [3,3,8,5], [11,6,14,12]]));
    }

}

TestUtils
    .setWithTestInNameOnly(false)
    .setFunctions(Tests)
    .runTests();
