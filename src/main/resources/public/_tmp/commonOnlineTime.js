import {TestUtils, assertEquals} from "./utils/testUtils";

let commonOnlineTime = (online1, online2) => {
    let flatOnline = (arr) => {
        let res = new Int8Array(25);
        arr.forEach((v) => {
            for (let i = v[0]; i < v[1]; i++) {
                res[i] = 1;
            }
        });
        return res;
    }

    let _online1 = flatOnline(online1);
    let _online2 = flatOnline(online2);
    let commonOnline = new Int8Array(25);

    for (let i = 0; i < 25; i++) {
        commonOnline[i] = _online1[i] && _online2[i];
    }

    let result = [];
    let timePiece;
    let timePeaceOpen = false;

    commonOnline.forEach((v, i) => {
        if (v === 1) {
            if (!timePeaceOpen)  {
                timePiece = [];
                timePiece[0] = i;
                timePeaceOpen = true;
            }
        } else {
            if (timePeaceOpen) {
                timePiece[1] = i;
                timePeaceOpen = false;
                result.push(timePiece);
            } // else do nothing
        }
    });


    let str = "";
    for (let i = 0; i <= 9; i++) str += i + "  ";
    for (let i = 10; i <= 24; i++) str += i + " ";
    console.log(str);

    let logI8A = (a) => {
        str = "";
        a.forEach((v) => {
            str += v + "  ";
        });
        console.log(str);
    }

    logI8A(_online1);
    logI8A(_online2);
    logI8A(commonOnline);

    return result;
}

let testsFunctions = [
    () => {
        let arg = {
            user1: [
                [8,12],
                [14,16],
                [17,22],
            ],
            user2: [
                [6,9],
                [12,15],
                [16,18],
                [20,22],
                [23,24]
            ]
        }
        let expected = JSON.stringify([
            [8,9],
            [14,15],
            [17,18],
            [20,22]
        ]);
        let actual = JSON.stringify(commonOnlineTime(arg.user1, arg.user2));
        assertEquals(expected, actual);
    },
];

TestUtils.setFunctions(testsFunctions).runTests();