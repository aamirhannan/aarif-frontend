"use client";
import ChartCard from '../ChartCard';

const FollowUpsTable = ({ data, isLoading = false }) => {
    const isEmpty = !data || data.length === 0;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <ChartCard
            title="Upcoming Follow-ups"
            isLoading={isLoading}
            isEmpty={isEmpty}
            emptyMessage="No follow-ups pending"
            height="auto"
        >
            <div className="follow-ups-table">
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Last Mail Date</th>
                            <th>Follow-up Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.company}</td>
                                <td>{formatDate(item.lastMailDate)}</td>
                                <td>{formatDate(item.followUpDue)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ChartCard>
    );
};

export default FollowUpsTable; 