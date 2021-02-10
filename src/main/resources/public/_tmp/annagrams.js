let first26PrimeNumbers = [1n, 2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 53n, 59n, 61n, 67n, 71n, 73n, 79n, 83n, 89n, 97n];
let map = new Map();

for (let i = 97; i <= 122; i++) {
    let number = first26PrimeNumbers[i - 97];
    map.set(String.fromCharCode(i), number);
}

String.prototype.toPrimeNumberProduct = function() {
    let res = 1n;
    for (let i = 0; i < this.length; i++) {
        res *= map.get(this[i]);
    }
    return res;
}

class AnagramsResolver {

    str;
    result;

    setString = (str) => {this.str = str; return this;};

    solve = () => {
        this.result = 0;
        for (let i = 1; i < this.str.length; i++) {
            this.fixedLengthSolve(i);
        }
        return this.result;
    }

    fixedLengthSolve = (i) => {
        let hashes = this.getSubstringsWithSize(i).map((s) => s.toPrimeNumberProduct());
        for (let i = 0; i < hashes.length; i++) {
            for (let j = i; j < hashes.length; j++) {
                if (i === j) continue;
                if (hashes[i] === hashes[j]) this.result++;
            }
        }
    }

    getSubstringsWithSize = (size) => {
        let res = [];
        for (let i = 0; i <= this.str.length - size; i++) {
            res.push(this.str.substring(i, i + size));
        }
        return res;
    }

}
let anagramsResolver = new AnagramsResolver();


runTests();

function runTests() {
    let args = ["abba", "abcd", "mom", "ifailuhkqq"];
    let answers = [4, 0, 2, 3];

    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        let expected = answers[i];
        let actual = anagramsResolver.setString(arg).solve();

        let pass = actual === expected;

        let res = `Test ${i}:\n${arg} is `;
        res += pass ? "passed" : `not passed: expected: ${expected} ___ actual: ${actual}`;
        addText(res);
    }
}

function addText(str) {
    let p = document.createElement("p");
    p.innerText = str;
    document.getElementById("res").append(p);
}



