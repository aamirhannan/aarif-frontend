"use client";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
} from 'chart.js';
import ChartCard from '../ChartCard';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
);

const ActivityHeatmap = ({ data, isLoading = false }) => {
    const isEmpty = !data || data.datasets[0].data.every(val => val === 0);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    title: (context) => {
                        return `Day ${context[0].label}`;
                    },
                    label: (context) => {
                        const value = context.raw || 0;
                        return `${value} emails`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    callback: function (value, index) {
                        return (index % 5 === 0) ? this.getLabelForValue(value) : '';
                    }
                }
            },
            y: {
                display: false,
                beginAtZero: true,
                grid: {
                    display: false,
                }
            }
        }
    };

    return (
        <ChartCard
            title="Mail Activity Heatmap"
            isLoading={isLoading}
            isEmpty={isEmpty}
            emptyMessage="No emails sent this month"
        >
            <div className="chart-container">
                <Bar data={data} options={options} />
            </div>
        </ChartCard>
    );
};

export default ActivityHeatmap; 