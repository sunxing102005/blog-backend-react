import React from "react";
import { getContent } from "@/api/content";
import echarts from "echarts";
class PublishChart extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    state = {
        xAxisData: [],
        seriesData: [],
        chart: null
    };
    componentDidMount() {
        getContent({ type: "archives" }).then(res => {
            let monthsData = {};
            let xAxisData = [];
            let seriesData = [];
            let max = 10;
            for (let i in res) {
                let date = new Date(res[i].create_time * 1000);
                let key =
                    date.getFullYear() +
                    "-" +
                    (date.getMonth() + 1 > 9
                        ? date.getMonth() + 1
                        : "0" + (date.getMonth() + 1));
                monthsData[key] = monthsData[key] ? monthsData[key] + 1 : 1;
                if (monthsData[key] > max) {
                    max = monthsData[key];
                }
            }
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            for (let i = 11; i >= 0; i--) {
                let key;
                if (month - i > 0) {
                    key =
                        year +
                        "-" +
                        (month - i > 9 ? month - i : "0" + (month - i));
                } else {
                    key =
                        year -
                        1 +
                        "-" +
                        (month - i + 12 > 9
                            ? month - i + 12
                            : "0" + (month - i + 12));
                }
                xAxisData.push(key);
                seriesData.push(monthsData[key] ? monthsData[key] : 0);
            }
            this.setState({ xAxisData, seriesData });
            // this.xAxisData = xAxisData;
            // this.seriesData = seriesData;
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
            color: ["#4472C5"],
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
                data: ["发布量"]
            },
            xAxis: [
                {
                    type: "category",
                    data: this.state.xAxisData,
                    axisPointer: {
                        type: "shadow"
                    }
                }
            ],
            yAxis: [
                {
                    type: "value",
                    name: "数量",
                    axisLabel: {
                        formatter: "{value} 个"
                    }
                }
            ],
            series: [
                {
                    name: "发布量",
                    type: "bar",
                    itemStyle: {
                        normal: {
                            // color:'#40c9c6'
                        }
                    },
                    data: this.state.seriesData
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
                id="publishChart"
            />
        );
    }
}
PublishChart.defaultProps = {
    className: "chart",
    width: "100%",
    height: "280px"
};
export default PublishChart;
