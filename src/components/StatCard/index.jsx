"use client";
import { ClipLoader } from "react-spinners";
import './stat-card.scss';

const StatCard = ({ title, value, icon, isLoading = false, color = "#2563eb" }) => {
    return (
        <div className="stat-card">
            <div className="stat-card-icon" style={{ backgroundColor: `${color}20` }}>
                {icon}
            </div>
            <div className="stat-card-content">
                <h4>{title}</h4>
                {isLoading ? (
                    <div className="stat-loading">
                        <ClipLoader color="#622ac2" loading={true} size={24} />
                    </div>
                ) : (
                    <div className="stat-value">{value}</div>
                )}
            </div>
        </div>
    );
};

export default StatCard; 