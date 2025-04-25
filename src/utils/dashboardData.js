// Dummy data for dashboard charts

export const generateDummyData = () => {
    const currentDate = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(currentDate.getDate() - (29 - i));
        return date.toISOString().split('T')[0];
    });

    // Mail Status Overview data
    const mailStatusData = {
        labels: ['Sent', 'Saved', 'Applied', 'Uploaded'],
        datasets: [
            {
                data: [65, 25, 15, 40],
                backgroundColor: ['#2563eb', '#10b981', '#6366f1', '#f59e0b'],
                borderWidth: 0,
            },
        ],
    };

    // Mail Activity Over Time data
    const mailActivityData = {
        labels: last30Days,
        datasets: [
            {
                label: 'Sent',
                data: last30Days.map(() => Math.floor(Math.random() * 10)),
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Saved',
                data: last30Days.map(() => Math.floor(Math.random() * 5)),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Applied',
                data: last30Days.map(() => Math.floor(Math.random() * 3)),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                tension: 0.4,
            },
        ],
    };

    // Top Companies data
    const topCompaniesData = {
        labels: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'],
        datasets: [
            {
                label: 'Emails Sent',
                data: [12, 10, 8, 7, 5],
                backgroundColor: 'rgba(37, 99, 235, 0.7)',
                borderRadius: 5,
            },
        ],
    };

    // Success Rate data
    const successRateData = {
        labels: ['Success', 'Pending'],
        datasets: [
            {
                data: [18, 82],
                backgroundColor: ['#10b981', '#e5e7eb'],
                borderWidth: 0,
                cutout: '80%',
            },
        ],
    };

    // Upcoming Follow-ups data
    const followUpsData = [
        { company: 'Google', lastMailDate: '2023-10-01', followUpDue: '2023-10-15' },
        { company: 'Microsoft', lastMailDate: '2023-10-02', followUpDue: '2023-10-16' },
        { company: 'Amazon', lastMailDate: '2023-10-03', followUpDue: '2023-10-17' },
        { company: 'Apple', lastMailDate: '2023-10-05', followUpDue: '2023-10-19' },
        { company: 'Meta', lastMailDate: '2023-10-08', followUpDue: '2023-10-22' },
    ];

    // Mail Category data
    const categoryData = {
        labels: ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Mobile'],
        datasets: [
            {
                data: [30, 25, 20, 15, 10],
                backgroundColor: ['#2563eb', '#10b981', '#6366f1', '#f59e0b', '#ec4899'],
                borderWidth: 0,
            },
        ],
    };

    // Heatmap data (simplified for initial implementation)
    const heatmapData = {
        labels: Array.from({ length: 31 }, (_, i) => i + 1), // Days of month
        datasets: [
            {
                label: 'Activity',
                data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
                backgroundColor: (context) => {
                    const value = context.dataset.data[context.dataIndex];
                    const alpha = value / 10;
                    return `rgba(37, 99, 235, ${alpha})`;
                },
                borderWidth: 1,
                borderColor: '#fff',
            },
        ],
    };

    return {
        mailStatusData,
        mailActivityData,
        topCompaniesData,
        successRateData,
        followUpsData,
        categoryData,
        heatmapData,
    };
}; 