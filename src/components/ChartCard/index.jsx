"use client";
import { ClipLoader } from "react-spinners";
import './chart-card.scss';

const ChartCard = ({
    title,
    children,
    isLoading = false,
    isEmpty = false,
    emptyMessage = "No data available",
    height = "300px"
}) => {
    return (
        <div className="chart-card">
            <div className="chart-card-header">
                <h3>{title}</h3>
            </div>
            <div className="chart-card-body" style={{ height }}>
                {isLoading ? (
                    <div className="chart-loading-state">
                        <ClipLoader color="#622ac2" loading={true} size={40} />
                        <p>Loading {title}...</p>
                    </div>
                ) : isEmpty ? (
                    <div className="chart-zero-state">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L3 3M3.5 21.5H21V8M3 14V3H9.5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p>{emptyMessage}</p>
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    );
};

export default ChartCard; 