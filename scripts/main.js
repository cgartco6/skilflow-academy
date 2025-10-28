// Course Data - Load from JSON file
let courses = [];
let freeCourse = {};

// Load course data from JSON
async function loadCourseData() {
    try {
        const response = await fetch('content/courses.json');
        const data = await response.json();
        courses = data.courses;
        freeCourse = data.free_course;
        console.log('📚 Courses loaded successfully:', courses.length);
        return true;
    } catch (error) {
        console.error('❌ Error loading courses:', error);
        // Fallback to default courses
        loadDefaultCourses();
        return false;
    }
}

function loadDefaultCourses() {
    courses = [
        {
            id: 1,
            title: "AI Prompt Engineering Mastery",
            price: 1799,
            category: "Technology",
            level: "Beginner to Advanced",
            duration: "6 hours",
            trending: true,
            description: "Master the art of communicating with AI systems for maximum productivity and creativity.",
            icon: "🤖"
        },
        // ... include all 12 courses from previous implementation
    ];
    freeCourse = {
        id: 0,
        title: "Digital Productivity Fundamentals",
        price: 0,
        category: "Productivity", 
        level: "All Levels",
        duration: "2 hours",
        description: "Master proven time management techniques and tool optimization for maximum daily efficiency.",
        icon: "🚀"
    };
}

// Shopping Cart & State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedPaymentMethod = null;
let businessData = JSON.parse(localStorage.getItem('businessData')) || {
    totalRevenue: 0,
    totalSales: 0,
    monthlyRevenue: 0,
    monthlySales: 0,
    target: 1000000,
    currency: 'ZAR',
    salesHistory: []
};

// Initialize the platform
document.addEventListener('DOMContentLoaded', async function() {
    await loadCourseData();
    renderCourses();
    renderFreeCourse();
    updateCartUI();
    initializeEventListeners();
    
    // Start content creation and marketing engines
    if (typeof ContentCreationEngine !== 'undefined') {
        const contentEngine = new ContentCreationEngine();
        contentEngine.initializeContentCreation();
    }
    
    startMarketingEngine();
});

// ... rest of the existing main.js functions remain the same
// [Include all the previous main.js functions here]
