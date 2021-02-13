class _TestUtils {

    withTestInNameOnly = false;
    functions;

    setWithTestInNameOnly = (bool) => {
        this.withTestInNameOnly = bool;
        return this;
    }

    setFunctions = (funcs) => {
        this.functions = funcs;
        return this;
    }

    runTests = () => {
        let failedCount = 0;

        let isValid = this.withTestInNameOnly ?
            (f) => typeof f === "function" && f.name.toLowerCase().includes("test"):
            (f) => typeof f === "function";


        let runTest = (f) => {
            if (isValid(f)) {
                try {
                    f();
                    console.log(`%cTest ${f.name} passed.`, "color: #8f8");
                } catch (e) {
                    console.log(`%cTest ${f.name} failed.\nCause: ${e.message}`, "color: #f88");
                    failedCount++;
                }
            }
        }

        if (Array.isArray(this.functions)) {
            this.functions.forEach(runTest);
        } else if (typeof this.functions === "object" || typeof this.functions === "function") {
            let fp = this.functions.prototype;
            let propNames = Object.getOwnPropertyNames(fp);
            for (let i = 1; i < propNames.length; i++) {
                runTest(fp[propNames[i]]);
            }
        } else {
            throw new Error("functions are not valid argument, must be object, function (or class) or array");
        }

        failedCount === 0 ?
            console.log("%cAll tests passed!", "color: #8f8") :
            console.log(`%c${failedCount} tests failed!`, "color: #f88");
    }
}

export const TestUtils = new _TestUtils();

export function assertEquals(expected, actual) {
    if (expected !== actual) throw new AssertionError(
        `AssertionError:\nExpected:\t  ${expected}\nbut actial:\t  ${actual}`,
        "Values not matches",
    );
}

export function assert(boolean, message = "") {
    if (!boolean) throw new AssertionError(
        message,
        "Boolean assertion error",
    );
}

export class AssertionError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = "AssertionError";
    }
}