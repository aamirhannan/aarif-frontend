"use client";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartCard from '../ChartCard';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ data, isLoading = false }) => {
    const isEmpty = !data || data.datasets[0].data.every(val => val === 0);

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    boxWidth: 6,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        },
        maintainAspectRatio: false,
    };

    return (
        <ChartCard
            title="Mail Category Distribution"
            isLoading={isLoading}
            isEmpty={isEmpty}
            emptyMessage="You haven't added tags to any mails"
        >
            <div className="chart-container">
                <Pie data={data} options={options} />
            </div>
        </ChartCard>
    );
};

export default CategoryChart; 