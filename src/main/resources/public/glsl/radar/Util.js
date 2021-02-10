export class Util {

    static getCircles = (count, bounds) => {
        let arr = [];

        let rndX = () => Math.floor(Math.random() * (bounds.r - bounds.l)) + bounds.l;
        let rndY = () => Math.floor(Math.random() * (bounds.b - bounds.t)) + bounds.t;
        let rndRadius = () => Math.floor(Math.random() * (bounds.rad.max - bounds.rad.min)) + bounds.rad.min;

        for (let i = 0; i < count; i++) {
            arr.push({
                x: rndX(),
                y: rndY(),
                r: rndRadius(),
            })
        }

        return arr;
    }

}