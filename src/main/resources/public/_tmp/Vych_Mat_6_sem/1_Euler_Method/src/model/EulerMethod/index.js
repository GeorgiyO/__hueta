export {eulerMethod};

let nextY = (x, y, h, foo) => y + h * foo(x, y);

let eulerMethod = (x0, y0, h, iterations ,foo) => {
    let result = [{
        x: x0,
        y: y0
    }];
    let xCur = x0;
    for (let i = 0; i < iterations; i++) {
        xCur += h;
        result.push({
            x: xCur,
            y: nextY(result.last().x, result.last().y, h, foo)
        });
    }
    return result;
}