import React from "react";
import { getContent } from "@/api/content";
import echarts from "echarts";
class ViewChart extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    state = {
        xAxis: [],
        series: [],
        chart: null
    };
    componentDidMount() {
        getContent({ type: "hot" }).then(res => {
            const data = res;
            let xAxis = [];
            let series = [];
            data.forEach(item => {
                //    this.xAxis.push(item.title);
                xAxis.push(
                    item.title.length > 7
                        ? item.title.substring(0, 7) + "..."
                        : item.title
                );
                series.push(item.view);
            });
            this.setState({ xAxis, series });
            this.initChart();
        });
    }
    componentWillUnmount() {
        let chart = this.state.chart;
        if (!chart) {
            return;
        }
        chart.dispose();
        chart = null;
    }

    initChart() {
        let chart = echarts.init(this.myRef.current, "infographic");
        // 把配置和数据放这里
        chart.setOption({
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    crossStyle: {
                        color: "#999"
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    // magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: false },
                    saveAsImage: { show: false }
                }
            },
            legend: {
                data: ["访问量"]
            },
            xAxis: [
                {
                    type: "category",
                    data: this.state.xAxis,
                    axisPointer: {
                        type: "shadow"
                    }
                }
            ],
            yAxis: [
                {
                    type: "value",
                    name: "访问量"
                }
            ],
            series: [
                {
                    name: "访问量",
                    type: "bar",
                    itemStyle: {
                        normal: {
                            color: "#40c9c6"
                        }
                    },
                    data: this.state.series
                }
            ]
        });
        this.setState({ chart });
    }
    render() {
        const { className, width, height } = this.props;
        return (
            <div
                className={className}
                style={{ height: height, width: width }}
                ref={this.myRef}
                id="viewChart"
            />
        );
    }
}
ViewChart.defaultProps = {
    className: "chart",
    width: "100%",
    height: "280px"
};
export default ViewChart;
