import {testArray} from "./testArray.js";

let getCN3 = (n) => {
    return (
        (n * (n - 1) * (n - 2))
      / (2 * 3)
    );
}

class TripletsResolver {

    ratio = 0;
    result = 0;

    values;
    leftBuffer;
    rightBuffer;

    solve = (ratio, values) => {
        this.result = 0;
        this.ratio = ratio;
        this.values = values;
        if (ratio === 1) {
            this.calculateForRatio1();
        } else {
            this.fillBuffers();
            this.calculateResult();
        }
        return this.result;
    }

    calculateForRatio1 = () => {
        let valueCountMap = {};
        this.values.forEach((v) => {
            if (valueCountMap[v]) {
                valueCountMap[v]++;
            } else {
                valueCountMap[v] = 1;
            }
        });
        for (let value in valueCountMap) {
            let count = valueCountMap[value];
            this.result += count < 3 ? 0 : getCN3(count);
        }
    }

    fillBuffers = () => {
        let max = -1;
        this.values.forEach((v) => {
            if (v > max) max = v;
        });

        let valueIndexMap = {};

        this.values.forEach((v, i) => {
            let arr = valueIndexMap[v];
            if (arr) {
                arr.push(i);
            } else {
                valueIndexMap[v] = [i];
            }
        });

        this.leftBuffer = new Array(this.values.length).fill(0);
        this.rightBuffer = new Array(this.values.length).fill(0);

        this.values.forEach((v, i) => {
            let indexesArr = valueIndexMap[v * this.ratio];
            if (indexesArr) {
                indexesArr.forEach((j) => {
                    if (j > i) {
                        this.leftBuffer[i]++;
                        this.rightBuffer[j]++;
                    }
                })
            }
        });
    }

    calculateResult = () => {
        let tmp = [];
        for (let i = 0; i < this.leftBuffer.length; i++) {
            tmp.push(this.leftBuffer[i] * this.rightBuffer[i]);
        }
        tmp.forEach((v) => this.result += v);
    }
}

let tripletsResolver = new TripletsResolver();

runTests();

function runTests() {

    let arg1237 = [];
    for (let i = 0; i < 100000; i++) {
        arg1237.push(1237);
    }
    let answer1237 = 166661666700000;

    let args = [
        [4, [1,4,16,64]],
        [2, [1,2,2,4]],
        [3, [1,3,9,9,27,81]],
        [1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
        [2, [2, 2, 4, 4, 4]],
        [1, [4, 4, 4, 4, 4]],
        [2, [1, 4, 8, 16, 16]],
        [testArray.r, testArray.arr],
        [1, arg1237]
    ]

    let answers = [
        2,
        2,
        6,
        161700,
        0,
        10,
        2,
        testArray.answer,
        answer1237
    ];

    let runTest = (i) => {
        let arg = args[i];
        let expected = answers[i];
        let actual = tripletsResolver.solve(...arg);

        let pass = actual === expected;

        let res = `Test ${i}:\n${arg[0]}; ${arg[1]} is `;
        res += pass ? "passed" : `not passed: expected: ${expected} ___ actual: ${actual}`;
        addText(res);
    }

    if (typeof testIndex !== "undefined")
        runTest(testIndex)
    else
    for (let i = 0; i < args.length; i++) {
        runTest(i)
    }


}

function addText(str) {
    let p = document.createElement("p");
    p.innerText = str;
    document.getElementById("res").append(p);
}



