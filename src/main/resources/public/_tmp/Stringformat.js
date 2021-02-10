
String.prototype.format = function(map) {
    let res = this;
    map.forEach((v, k) => {
        let arg = "${" + k + "}";
        res = res.replaceAll(arg, v);
    });
    return res;
}

runTests();

function runTests() {
    let str = "Моего ${pet} зовут ${name}";

    let args =
        new Map()
            .set("pet", "кота")
            .set("name", "Осёл")
    ;

    let expected = "Моего кота зовут Осёл";
    let actual = str.format(args);

    let pass = actual === expected;
    let res = "Test is ";
    res += pass ? "passed" : `not passed: expected: ${expected} ___ actual: ${actual}`;
    console.log("String format: " + res);
}
