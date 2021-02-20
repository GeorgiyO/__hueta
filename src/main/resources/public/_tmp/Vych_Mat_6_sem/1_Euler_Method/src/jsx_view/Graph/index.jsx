import React from "react";

export class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
        this.canvasRef = React.createRef();
        this.color1 = "rgba(255, 100, 0, 0.8)";
        this.color2 = "rgba(0, 155, 255, 0.8)";
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext("2d");
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Метод Эйлера',
                    fill: false,
                    backgroundColor: this.color1,
                    borderColor: this.color1,
                }, {
                    label: 'Точные значения',
                    fill: false,
                    backgroundColor: this.color2,
                    borderColor: this.color2,
                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'x'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'y'
                        }
                    }]
                }
            }
        });
    }

    componentDidUpdate() {
        this.updateChart();
    }

    updateChart() {
        let fooTable = this.state.fooTable.map((p) => {
            return {
                x: p.x.toFixed(3),
                y: p.y.toFixed(3),
            }
        });
        let realFooTable = this.state.realFooTable.map((p) => {
            return {
                x: p.x.toFixed(3),
                y: p.y.toFixed(3),
            }
        });
        this.chart.data.labels = fooTable.map((p) => p.x);
        this.chart.data.datasets[0].data = fooTable;
        this.chart.data.datasets[1].data = realFooTable;
        this.chart.update();
    }

    render() {
        return (
            <div className={this.constructor.name}>
                <canvas ref={this.canvasRef}/>
            </div>
        );
    }
}