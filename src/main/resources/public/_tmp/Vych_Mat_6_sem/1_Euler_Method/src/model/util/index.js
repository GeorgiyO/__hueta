export {strToFoo};

let strToFoo = (str) => {
    let x;
    let y;
    return (..._x) => {
        x = _x[0];
        y = _x[1];
        return eval(str);
    }
}