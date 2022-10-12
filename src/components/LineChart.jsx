import ReactApexChart from 'react-apexcharts';

export default function LineChart({ data, title, height, width }) {

    const series = [{
        name: data.yLabel,
        data: data.y,
    }]

    const options = {
        chart: {
            type:'line'
        }, 
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: title,
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], 
                opacity: 0.5
            },
        },
        xaxis: {
            categories: data.x,
            title: {
                text: data.xLabel
            },
        },
        yaxis: {
            title: {
                text: data.yLabel
            },
        }
    }

    return (
        <>
            <ReactApexChart options={options} series={series} type="line" height={height} width={width} />
        </>
    );
}