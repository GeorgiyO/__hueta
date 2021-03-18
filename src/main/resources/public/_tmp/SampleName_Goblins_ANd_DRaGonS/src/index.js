/**
 * Вектор в двумерном пространстве с координатами и длиной
 */
class Vec2 {

    // создание вектора с аргументами длин по x,y в декартовых координатах
    static decart (xLen, yLen) {
        let v = new Vec2();
        v.xLen = xLen;
        v.yLen = yLen;
        v.length = Math.hypot(xLen, yLen);
        v.angle = Math.atan2(yLen, xLen);
        return v;
    };

    // создание вектора с аргументами длины и угла поворота в полярных координатах
    static polar (length, angle) {
        let v = new Vec2();
        v.length = length;
        v.angle = angle;
        v.xLen = length * Math.cos(angle);
        v.yLen = length * Math.sin(angle);
        return v;
    }

    /**
     * Вычисляет скаляр между двумя векторами
     * @param {Vec2} vec - вектор, с которым вычисляется скаляр
     * @returns {number} - скаляр
     */
    scalar(vec) {
        return (
            this.length *
            vec.length *
            Math.cos(vec.angle - this.angle)
        );
    }

    /**
     * Вычисляет проекцию вектора на вектор
     * @param vec
     * @returns {Vec2} - полученная проекция
     */
    projectionTo(vec) {
        let resultLength = this.scalar(vec) / vec.length;
        return Vec2.polar(resultLength, vec.angle);
    }

    /**
     * Вычисление матрицы Грема:
     * https://ru.wikipedia.org/wiki/%D0%9E%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_%D0%93%D1%80%D0%B0%D0%BC%D0%B0
     * @param {Vec2} v1 и
     * @param {Vec2} v2 вектора, для которых будет вычисляться матрица
     * @returns {{number}[][]} - матрица Грема
     */
    static gramianMatrix(v1, v2) {
        return [
            [v1.scalar(v1), v1.scalar(v2)],
            [v2.scalar(v1), v2.scalar(v2)]
        ];
    }
}

// допустимая погрешность в тестах
const ALLOWABLE_ERROR = 0.0001;

scalarTests();
grammianMatrixTests();
projectionTests();

// функция для проверки значений. Если false - появится ошибка
function assertEquals(a, b) {
    if (Math.abs(a - b) > ALLOWABLE_ERROR)
        throw new Error(`${a} !== ${b}`);
}

function scalarTests() {
    // примеры взяты отсюда
    // http://mathprofi.ru/skaljarnoe_proizvedenie_vektorov.html

    let v1 = Vec2.polar(2, 0);
    let v2 = Vec2.polar(5, Math.PI / 6);

    assertEquals(5 * Math.sqrt(3), v1.scalar(v2));

    v1.length = 3;
    v2.length = Math.sqrt(2);
    v2.angle = Math.PI * 0.75;

    assertEquals(-3, v1.scalar(v2));

    passTestLog("grammianMatrixTests");
}

function grammianMatrixTests() {
    // т.к. в интернете примеров найдено не было, результаты выполнения
    // функции сравниваются с ручным расчетом

    let v1 = Vec2.polar(2, 0);
    let v2 = Vec2.polar(5, Math.PI / 6);
    let result = Vec2.gramianMatrix(v1, v2);

    let excepted = [
        [4, 5 * Math.sqrt(3)],
        [5 * Math.sqrt(3), 25]
    ];

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            assertEquals(excepted[i][j], result[i][j]);
        }
    }

    passTestLog("grammianMatrixTests");
}

function projectionTests() {
    // примеры для тестов взяты отсюда:
    // https://ru.onlinemschool.com/math/library/vector/projection/

    let v1 = Vec2.decart(1, 2);
    let v2 = Vec2.decart(3, 4);

    let res = v1.projectionTo(v2);

    assertEquals(2.2, res.length);
    assertEquals(v2.angle, res.angle);

    passTestLog("projectionTests");
}

function passTestLog(testName) {
    console.log(`Тест ${testName} завершен без ошибок`);
}
