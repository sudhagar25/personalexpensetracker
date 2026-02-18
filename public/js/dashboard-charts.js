document.addEventListener('DOMContentLoaded', function () {
    // Check if SAFE_DATA exists
    if (typeof SAFE_DATA === 'undefined') {
        console.error('SAFE_DATA is undefined');
        return;
    }

    const income = SAFE_DATA.income;
    const expense = SAFE_DATA.expense;
    const ctx = document.getElementById("expenseChart");

    if (!ctx) return;

    // Chart.js v4 Configuration
    Chart.defaults.font.family = 'Nunito, -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.color = '#858796';

    const commonOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltip: {
                backgroundColor: "rgb(255,255,255)",
                bodyColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                padding: 15,
                displayColors: false,
                caretPadding: 10,
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += '₹' + context.parsed.toFixed(2);
                        return label;
                    }
                }
            }
        },
        cutout: '80%',
    };

    // Don't render if no data
    if (income === 0 && expense === 0) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["No Data"],
                datasets: [{
                    data: [1],
                    backgroundColor: ['#e3e6f0'],
                    hoverBackgroundColor: ['#e3e6f0'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: { enabled: false },
                    legend: { display: false }
                }
            },
        });
        return;
    }

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: [income, expense],
                backgroundColor: ['#1cc88a', '#e74a3b'],
                hoverBackgroundColor: ['#17a673', '#be2617'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: commonOptions,
    });
});
