"use client";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartCard from '../ChartCard';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CompaniesChart = ({ data, isLoading = false }) => {
    const isEmpty = !data || data.datasets[0].data.every(val => val === 0);

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    precision: 0,
                }
            },
            y: {
                grid: {
                    display: false,
                }
            }
        }
    };

    return (
        <ChartCard
            title="Top Companies Contacted"
            isLoading={isLoading}
            isEmpty={isEmpty}
            emptyMessage="Start sending mails to companies to see this chart!"
        >
            <div className="chart-container">
                <Bar data={data} options={options} />
            </div>
        </ChartCard>
    );
};

export default CompaniesChart; 