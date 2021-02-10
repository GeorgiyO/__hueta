let xyDistance = (d1, d2) => {
    return {x: d2.x - d1.x, y: d2.y - d1.y};
}
let borders = {
    lb: 0,
    tr: 1
}

class DotsEntry {

    dots;

    power = 1 / 100000;
    ACCURACY_LEVEL = 1;

    constructor() {
        this.power /= Math.pow(this.ACCURACY_LEVEL, 2.0);
        let this_moveDots = this.moveDots;
        this.moveDots = () => {
            for (let i = 0; i < this.ACCURACY_LEVEL; i++) {
                this_moveDots();
            }
        }
    }

    setDots = (array) => {
        this.dots = array.map((dot) => {
            dot.speed = {
                x: 0,
                y: 0
            };
            return dot;
        });
        return this;
    }

    setPower = (power) => {this.power = power; return this;}

    update = () => {
        this.moveDots();
        return this.dots;
    }
    
    moveDots = () => {
        for (let i = 0; i < this.dots.length; i++) {
            let dot = this.dots[i];
            let dsXY = this.calculateDS(i);
            dot.speed.x += dsXY.x;
            dot.speed.y += dsXY.y;
            dot.x += dot.speed.x;
            dot.y += dot.speed.y;
            this.collide(dot);
        }
    }

    calculateDS = (_i) => {
        let this_dot = this.dots[_i];
        let ds = {x: 0, y: 0};

        for (let i = 0; i < this.dots.length; i++) {

            if (_i === i) continue;

            let dot = this.dots[i];
            let dXY = xyDistance(this_dot, dot);

            let d = Math.hypot(dXY.x, dXY.y);

            d = Math.pow(d, 2.0);

            if (d > 0.05) {
                let a = this.power / (d + 0.00001);
                let aXY = {
                    x: a * dXY.x,
                    y: a * dXY.y
                };
                ds.x += aXY.x;
                ds.y += aXY.y;
            }
        }

        return ds;
    }

    collide = (dot) => {

        if (dot.x < borders.lb) {
            dot.speed.x = 0;
            dot.x = borders.lb;
        } else if (dot.x > borders.tr) {
            dot.speed.x = 0;
            dot.x = borders.tr;
        }

        if (dot.y < borders.lb) {
            dot.speed.y = 0;
            dot.y = borders.lb;
        } else if (dot.y > borders.tr) {
            dot.speed.y = 0;
            dot.y = borders.tr;
        }
    }
}

export const dotsEntry = new DotsEntry();