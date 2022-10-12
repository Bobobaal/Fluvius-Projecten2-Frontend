import ReactApexChart from 'react-apexcharts';

export default function PieChart({ data, title, height, width}) {
    
    const series = data.y
    const options = {
        chart: {
            type: 'pie',
        },
        title: {
            text: title,
            align: 'left'
        },
        labels: data.x,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    return (
        <>
            <ReactApexChart options={options} series={series} type="pie" height={height} width={width} />
        </>
    );
}
