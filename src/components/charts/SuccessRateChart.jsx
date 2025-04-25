"use client";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import ChartCard from '../ChartCard';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip);

const SuccessRateChart = ({ data, isLoading = false }) => {
    const isEmpty = !data || data.datasets[0].data.every(val => val === 0);
    const successRate = isEmpty ? 0 : data.datasets[0].data[0];

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            }
        },
        cutout: '80%',
        rotation: -90,
        circumference: 180,
        maintainAspectRatio: false,
    };

    return (
        <ChartCard
            title="Success Rate Tracker"
            isLoading={isLoading}
            isEmpty={isEmpty}
            emptyMessage="No responses received yet"
        >
            <div className="chart-container success-rate-container">
                <Doughnut data={data} options={options} />
                {!isEmpty && (
                    <div className="success-rate-label">
                        <span className="percentage">{successRate}%</span>
                        <span className="label">Response Rate</span>
                    </div>
                )}
            </div>
        </ChartCard>
    );
};

export default SuccessRateChart; 