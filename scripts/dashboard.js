// Business Data
let businessData = JSON.parse(localStorage.getItem('businessData')) || {
    totalRevenue: 0,
    totalSales: 0,
    monthlyRevenue: 0,
    monthlySales: 0,
    target: 1000000,
    currency: 'ZAR',
    salesHistory: []
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
    renderCharts();
    renderRecentSales();
    checkTaxStatus();
    initializeTabSystem();
    startRealTimeUpdates();
});

function loadDashboardData() {
    // Update stats
    document.getElementById('totalRevenue').textContent = 'R ' + businessData.totalRevenue.toLocaleString('en-ZA');
    document.getElementById('totalSales').textContent = businessData.totalSales.toLocaleString('en-ZA');
    document.getElementById('monthlyRevenue').textContent = 'R ' + businessData.monthlyRevenue.toLocaleString('en-ZA');
    document.getElementById('monthlySales').textContent = businessData.monthlySales.toLocaleString('en-ZA');

    // Update target progress
    const progressPercentage = (businessData.totalRevenue / businessData.target) * 100;
    
    document.getElementById('targetProgress').style.width = Math.min(progressPercentage, 100) + '%';
    document.getElementById('currentProgress').textContent = 'R ' + businessData.totalRevenue.toLocaleString('en-ZA') + ' ZAR';
    
    const percentageText = Math.min(progressPercentage, 100).toFixed(1) + '% Complete';
    const status = progressPercentage >= 100 ? '🎉 Target Achieved!' : 
                   progressPercentage >= 75 ? '🚀 On Track' : 
                   progressPercentage >= 50 ? '📈 Good Progress' : '💪 Keep Going';
    
    document.getElementById('targetPercentage').textContent = `${percentageText} • ${status}`;
    
    // Update annual revenue for tax
    document.getElementById('annualRevenue').textContent = 'R ' + businessData.totalRevenue.toLocaleString('en-ZA') + ' ZAR';
}

function renderCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueData = months.map(() => Math.floor(Math.random() * 50000) + 10000);
    
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Monthly Revenue (ZAR)',
                data: revenueData,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Revenue Growth'
                }
            }
        }
    });

    // Payment Method Chart
    const paymentCtx = document.getElementById('paymentChart').getContext('2d');
    
    const paymentData = {
        PayFast: businessData.salesHistory.filter(s => s.paymentMethod === 'PayFast').length,
        Stripe: businessData.salesHistory.filter(s => s.paymentMethod === 'Stripe').length,
        EFT: businessData.salesHistory.filter(s => s.paymentMethod === 'EFT').length
    };

    new Chart(paymentCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(paymentData),
            datasets: [{
                data: Object.values(paymentData),
                backgroundColor: [
                    '#ff6b35',
                    '#635bff',
                    '#10b981'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

function renderRecentSales() {
    const tbody = document.getElementById('salesTableBody');
    
    if (businessData.salesHistory.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--gray);">No sales recorded yet</td></tr>';
        return;
    }

    // Show last 10 sales
    const recentSales = businessData.salesHistory.slice(-10).reverse();
    
    tbody.innerHTML = recentSales.map(sale => {
        const date = new Date(sale.timestamp).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const courseNames = sale.items.map(item => item.title).join(', ');
        const paymentBadgeClass = `badge-${sale.paymentMethod.toLowerCase()}`;
        
        return `
            <tr>
                <td>${date}</td>
                <td><strong>${courseNames}</strong></td>
                <td>R ${sale.total.toLocaleString('en-ZA')}</td>
                <td>
                    <span class="payment-badge ${paymentBadgeClass}">
                        ${sale.paymentMethod}
                    </span>
                </td>
                <td>
                    <span style="color: var(--success); font-weight: 600;">
                        ✅ Completed
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

function checkTaxStatus() {
    const taxThreshold = 87300; // South African tax-free threshold
    const taxReminder = document.getElementById('taxReminder');
    
    if (businessData.totalRevenue > taxThreshold) {
        taxReminder.innerHTML = `
            <div class="compliance-card" style="border-left-color: var(--warning);">
                <h4>Current Tax Status</h4>
                <p style="color: var(--warning);">⚠️ You have exceeded the tax-free threshold</p>
                <p>💰 Annual Revenue: <strong>R ${businessData.totalRevenue.toLocaleString('en-ZA')} ZAR</strong></p>
                <p>📈 Tax-Free Threshold: R 87,300 ZAR (Individuals under 65)</p>
                <div class="compliance-alert" style="background: rgba(245, 158, 11, 0.1); color: var(--warning);">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span><strong>Action Required:</strong> Consult with a tax professional immediately</span>
                </div>
                <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--gray);">
                    💡 <strong>Tip:</strong> Keep all business expense records for potential deductions
                </div>
            </div>
        `;
    }
}

function initializeTabSystem() {
    const navLinks = document.querySelectorAll('.nav-link[data-tab]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and tabs
            navLinks.forEach(nl => nl.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked link and corresponding tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function startRealTimeUpdates() {
    // Auto-refresh data every 30 seconds
    setInterval(() => {
        loadDashboardData();
        renderRecentSales();
        checkTaxStatus();
    }, 30000);

    // Simulate real-time sales for demo
    setInterval(() => {
        if (Math.random() < 0.2) { // 20% chance every 15 seconds
            simulateNewSale();
        }
    }, 15000);
}

function simulateNewSale() {
    const courses = [
        { title: "AI Prompt Engineering Mastery", price: 1799 },
        { title: "Short-Form Video Domination", price: 1599 },
        { title: "Personal Branding for the Digital Age", price: 1499 }
    ];
    
    const randomCourse = courses[Math.floor(Math.random() * courses.length)];
    const paymentMethods = ['PayFast', 'Stripe', 'EFT'];
    const randomPayment = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

    const newSale = {
        id: Date.now(),
        items: [randomCourse],
        total: randomCourse.price,
        paymentMethod: randomPayment,
        timestamp: new Date().toISOString(),
        currency: 'ZAR'
    };

    businessData.totalRevenue += newSale.total;
    businessData.totalSales += 1;
    businessData.monthlyRevenue += newSale.total;
    businessData.monthlySales += 1;
    businessData.salesHistory.push(newSale);
    
    localStorage.setItem('businessData', JSON.stringify(businessData));
    
    // Update UI
    loadDashboardData();
    renderRecentSales();
    checkTaxStatus();
    
    // Show subtle notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 0.8rem 1.2rem;
        border-radius: 8px;
        z-index: 1000;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    notification.textContent = `🎉 New sale: ${randomCourse.title} - R ${randomCourse.price}`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.close();
    }
}

function exportSalesData() {
    const dataStr = JSON.stringify(businessData.salesHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `skillflow-sales-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

function addNewCourse() {
    alert('🎯 Course Management System\n\nThis feature allows you to:\n• Add new courses\n• Edit existing courses\n• Manage course content\n• Update pricing\n\nComing soon in the next update!');
}

function launchCampaign() {
    alert('📢 Marketing Campaign Manager\n\nThis feature allows you to:\n• Create automated campaigns\n• Schedule social media posts\n• Track campaign performance\n• Analyze customer engagement\n\nComing soon in the next update!');
}
