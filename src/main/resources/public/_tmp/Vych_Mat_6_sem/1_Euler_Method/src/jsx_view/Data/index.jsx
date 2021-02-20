import React from "react";

export class Data extends React.Component {
    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
    }

    render() {
        let tableValues = this.state.table.map(({x, y}, i) =>
            <tr key={"t-tb-tr-" + i}>
                <td>{x.toFixed(3)}</td>
                <td>{y.toFixed(3)}</td>
            </tr>
        )
        return (
            <div className={this.constructor.name}>
                <table>
                    <thead>
                    <tr>
                        <th>x</th>
                        <th>y</th>
                    </tr>
                    </thead>
                    <tbody>
                        {tableValues}
                    </tbody>
                </table>

            </div>
        );
    }
}