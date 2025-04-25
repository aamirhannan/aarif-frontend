"use client";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import ChartCard from '../ChartCard';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const MailActivityChart = ({ data, isLoading = false }) => {
    const isEmpty = !data || data.datasets.every(dataset =>
        dataset.data.every(val => val === 0)
    );

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    maxTicksLimit: 7,
                    callback: function (value, index) {
                        const date = new Date(this.getLabelForValue(value));
                        return date.getDate() + '/' + (date.getMonth() + 1);
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    borderDash: [2],
                    color: 'rgba(0, 0, 0, 0.05)',
                },
                ticks: {
                    precision: 0,
                }
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return (
        <ChartCard
            title="Mail Activity Over Time"
            isLoading={isLoading}
            isEmpty={isEmpty}
            emptyMessage="No activity recorded in the past 30 days"
        >
            <div className="chart-container">
                <Line data={data} options={options} />
            </div>
        </ChartCard>
    );
};

export default MailActivityChart; 