

let evenSort = (arr) => {
    let arrCopy = [...arr];
    let tmp = {
        positions: [],
        values: [],
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 1) {
            tmp.positions.push(i);
            tmp.values.push(arr[i]);
        }
    }

    tmp.values.sort((a, b) => {
        if (a > b) return 1;
        if (a === b) return 0;
        return -1;
    });

    for (let i = 0; i < tmp.values.length; i++) {
        arrCopy[tmp.positions[i]] = tmp.values[i];
    }

    return arrCopy;
}

let arr = [100, 59, 68, 44, 58, 50, 58, 39, 76, 36, 49, 38, 69, 58, 42, 7, 23, 47, 5, 5, 59, 54, 1, 32, 60, 6, 30, 20, 4, 83, 86, 80];
addText("Массив до сортировки: " + arr);
addText("Массив после сортировки: " +evenSort(arr));

function addText(str) {
    let p = document.createElement("p");
    p.innerText = str;
    document.getElementById("res").append(p);
}