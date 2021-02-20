import React from "react";

export class InputPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
    }

    render() {
        let {foo, realFoo, x0, y0, h, iterations, autoUpdate} = this.state;
        let _ = this.props._;
        return (
            <div className={this.constructor.name}>
                <p>dy = f(x, y):</p>
                <input type="text" value={foo} onChange={_.onFooChange}/>

                <p>y = f(x):</p>
                <input type="text" value={realFoo} onChange={_.onRealFooChange}/>

                <p>x<sub>0</sub>:</p>
                <input type="text" value={x0} onChange={_.onX0Change}/>

                <p>y<sub>0</sub>:</p>
                <input type="text" value={y0} onChange={_.onY0Change}/>

                <p>Шаг итерации:</p>
                <input type="text" value={h} onChange={_.onHChange}/>

                <p>Количество итераций:</p>
                <input type="text" value={iterations} onChange={_.onIterationsChange}/>

                <br/>

                <span>Автоматическое обновление таблицы и графиков при изменении:</span>
                <input type="checkbox" checked={autoUpdate} onChange={_.onAutoUpdateChange}/>

                <br/><hr/>

                <button onClick={_.updateTable}>
                    Обновить таблицу
                </button>

            </div>
        );
    }
}