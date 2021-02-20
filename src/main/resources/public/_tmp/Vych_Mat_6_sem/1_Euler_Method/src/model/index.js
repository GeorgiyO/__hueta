import {strToFoo} from "./util";
import {eulerMethod} from "./EulerMethod";
import Chart from "chart.js";

export {props, updateTable};

const props = {
    inputPanel: {
        state: {
            foo: "x ** 2 - 2 * y",
            realFoo: "3/4 * Math.exp(-2 * x) + 1/2 * x ** 2 - 1/2 * x + 1/4",
            x0: "0",
            y0: "1",
            h: "0.1",
            iterations: "10",
            autoUpdate: true,
        },
        updateState: function () {
            this.setState(this.state);
        },
        onFooChange: getChangePropFoo("foo"),
        onRealFooChange: getChangePropFoo("realFoo"),
        onX0Change: getChangePropFoo("x0"),
        onY0Change: getChangePropFoo("y0"),
        onHChange: getChangePropFoo("h"),
        onIterationsChange: getChangePropFoo("iterations"),
        onAutoUpdateChange: () => {
            let ip = props.inputPanel;
            ip.state.autoUpdate = !ip.state.autoUpdate;
            ip.updateState();
        },
        updateTable,
    },
    data: {
        state: {
            table: [] // {n, xn, yn}
        },
        updateState: function () {
            this.setState(this.state);
        },
    },
    graph: {
        state: {
            fooTable: null,
            realFooTable: null
        },
        updateState: function () {
            this.setState(this.state);
        }
    }
};

function getChangePropFoo(par) {
    return function (e) {
        let ip = props.inputPanel;
        ip.state[par] = e.target.value;
        ip.updateState();
        if (ip.state.autoUpdate) {
            updateTable();
        }
    }
}

function updateTable() {
    let {x0, y0, h, iterations, foo} = props.inputPanel.state;
    [x0, y0, h, iterations] = [x0, y0, h, iterations].map(v => Number(v));
    foo = strToFoo(foo);
    try {
        foo(0, 1);
    } catch (e) {
        return;
    }

    props.data.state.table = eulerMethod(x0, y0, h, iterations, foo);
    props.data.updateState();

    updateGraphs();
}

function updateGraphs() {
    let fooTable = props.data.state.table;

    let realFoo = strToFoo(props.inputPanel.state.realFoo);
    try {
        realFoo(0, 1);
    } catch (e) {
        return;
    }

    let realFooTable = fooTable.map((p) => {
        return {
            x: p.x,
            y: realFoo(p.x)
        }
    })

    props.graph.state.fooTable = fooTable;
    props.graph.state.realFooTable = realFooTable;
    props.graph.updateState();
}