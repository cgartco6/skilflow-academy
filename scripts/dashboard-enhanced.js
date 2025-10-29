// Enhanced Dashboard with Addictive Course Metrics
class EnhancedDashboard {
    constructor() {
        this.businessData = JSON.parse(localStorage.getItem('businessData')) || {
            totalRevenue: 0,
            totalSales: 0,
            monthlyRevenue: 0,
            monthlySales: 0,
            target: 1000000,
            currency: 'ZAR',
            salesHistory: [],
            addictiveMetrics: {
                averageCompletionRate: 84,
                averageAddictiveScore: 90,
                knowledgeRetention: 87,
                studentSatisfaction: 95
            }
        };
    }

    initializeEnhancedDashboard() {
        this.loadEnhancedDashboardData();
        this.renderAddictiveMetrics();
        this.renderCoursePerformance();
        this.startRealTimeEnhancements();
    }

    renderAddictiveMetrics() {
        const metricsContainer = document.getElementById('addictiveMetrics');
        if (!metricsContainer) return;

        metricsContainer.innerHTML = `
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-value">${this.businessData.addictiveMetrics.averageCompletionRate}%</div>
                    <div class="metric-label">Average Completion</div>
                    <div class="metric-trend up">+8% from industry avg</div>
                </div>
                <div class="metric-card success">
                    <div class="metric-value">${this.businessData.addictiveMetrics.averageAddictiveScore}/100</div>
                    <div class="metric-label">Addictive Score</div>
                    <div class="metric-trend up">+15% engagement</div>
                </div>
                <div class="metric-card warning">
                    <div class="metric-value">${this.businessData.addictiveMetrics.knowledgeRetention}%</div>
                    <div class="metric-label">Knowledge Retention</div>
                    <div class="metric-trend up">+12% retention</div>
                </div>
                <div class="metric-card accent">
                    <div class="metric-value">${this.businessData.addictiveMetrics.studentSatisfaction}%</div>
                    <div class="metric-label">Student Satisfaction</div>
                    <div class="metric-trend up">+10% satisfaction</div>
                </div>
            </div>
        `;
    }

    renderCoursePerformance() {
        const performanceContainer = document.getElementById('coursePerformance');
        if (!performanceContainer) return;

        performanceContainer.innerHTML = `
            <h3>🎯 Course Performance Metrics</h3>
            <div class="performance-grid">
                <div class="performance-card">
                    <h4>Algorithm Mastery Course</h4>
                    <div class="performance-stats">
                        <span>Addictive Score: 96/100</span>
                        <span>Completion: 90%</span>
                        <span>Revenue: R189,900</span>
                    </div>
                </div>
                <div class="performance-card">
                    <h4>YouTube Shorts Course</h4>
                    <div class="performance-stats">
                        <span>Addictive Score: 94/100</span>
                        <span>Completion: 87%</span>
                        <span>Revenue: R156,800</span>
                    </div>
                </div>
                <div class="performance-card">
                    <h4>AI Prompt Engineering</h4>
                    <div class="performance-stats">
                        <span>Addictive Score: 95/100</span>
                        <span>Completion: 88%</span>
                        <span>Revenue: R142,600</span>
                    </div>
                </div>
            </div>
        `;
    }

    startRealTimeEnhancements() {
        // Simulate improving metrics over time
        setInterval(() => {
            this.businessData.addictiveMetrics.averageCompletionRate += Math.random() > 0.7 ? 1 : 0;
            this.businessData.addictiveMetrics.averageAddictiveScore += Math.random() > 0.8 ? 1 : 0;
            this.businessData.addictiveMetrics.knowledgeRetention += Math.random() > 0.75 ? 1 : 0;
            this.businessData.addictiveMetrics.studentSatisfaction += Math.random() > 0.85 ? 1 : 0;

            // Cap at 100%
            Object.keys(this.businessData.addictiveMetrics).forEach(key => {
                if (this.businessData.addictiveMetrics[key] > 100) {
                    this.businessData.addictiveMetrics[key] = 100;
                }
            });

            this.renderAddictiveMetrics();
        }, 30000);
    }
}

// Enhanced dashboard CSS
const enhancedDashboardCSS = `
    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }
    
    .metric-card {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        text-align: center;
        border-left: 4px solid #2563eb;
    }
    
    .metric-card.success {
        border-left-color: #10b981;
    }
    
    .metric-card.warning {
        border-left-color: #f59e0b;
    }
    
    .metric-card.accent {
        border-left-color: #06d6a0;
    }
    
    .metric-value {
        font-size: 2.2rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
        color: #1e293b;
    }
    
    .metric-label {
        color: #64748b;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
    
    .metric-trend {
        font-size: 0.8rem;
        font-weight: 600;
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        display: inline-block;
    }
    
    .metric-trend.up {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
    }
    
    .performance-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
    }
    
    .performance-card {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        border-left: 4px solid #7c3aed;
    }
    
    .performance-card h4 {
        margin-bottom: 1rem;
        color: #1e293b;
        font-weight: 600;
    }
    
    .performance-stats {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .performance-stats span {
        background: #f8fafc;
        padding: 0.5rem;
        border-radius: 8px;
        font-size: 0.9rem;
        color: #475569;
    }
`;

// Add enhanced dashboard styles
const dashboardStyleSheet = document.createElement('style');
dashboardStyleSheet.textContent = enhancedDashboardCSS;
document.head.appendChild(dashboardStyleSheet);

// Initialize enhanced dashboard
document.addEventListener('DOMContentLoaded', function() {
    const enhancedDashboard = new EnhancedDashboard();
    enhancedDashboard.initializeEnhancedDashboard();
});
