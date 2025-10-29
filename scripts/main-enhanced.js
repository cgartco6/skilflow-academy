// Enhanced Course Data Loader with Addictive Features
let enhancedCourses = [];
let currentFreeCourse = {};
let monthlyFreeCourses = {};

// Load enhanced course data
async function loadEnhancedCourseData() {
    try {
        const response = await fetch('content/courses.json');
        const data = await response.json();
        enhancedCourses = data.courses;
        monthlyFreeCourses = data.free_courses;
        
        // Set current free course based on month
        const currentMonth = new Date().toLocaleString('en', { month: 'long' }).toLowerCase() + '_2024';
        currentFreeCourse = monthlyFreeCourses[currentMonth] || monthlyFreeCourses.january_2024;
        
        console.log('📚 Enhanced courses loaded:', enhancedCourses.length);
        console.log('🎁 Current free course:', currentFreeCourse.title);
        return true;
    } catch (error) {
        console.error('❌ Error loading enhanced courses:', error);
        loadDefaultEnhancedCourses();
        return false;
    }
}

function loadDefaultEnhancedCourses() {
    enhancedCourses = [
        {
            id: 1,
            title: "AI Prompt Engineering Mastery",
            price: 1799,
            category: "Technology",
            level: "Beginner to Advanced",
            duration: "6 hours",
            trending: true,
            addictive_score: 95,
            completion_rate: 88,
            description: "Master the art of communicating with AI systems for maximum productivity and creativity.",
            icon: "🤖"
        },
        // ... include other enhanced courses
    ];
    
    currentFreeCourse = {
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

// Enhanced course rendering with addictive features
function renderEnhancedCourses() {
    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = enhancedCourses.map(course => `
        <div class="course-card enhanced-course">
            <div class="course-image" style="background: linear-gradient(135deg, ${getCourseColor(course.id)}, ${getCourseColor(course.id + 1)})">
                ${course.icon}
                <div class="addictive-badge">Addictive Score: ${course.addictive_score || 90}/100</div>
            </div>
            ${course.trending ? '<span class="course-badge">🔥 TRENDING</span>' : ''}
            <span class="completion-badge">${course.completion_rate || 85}% Complete</span>
            
            <h3>${course.title}</h3>
            <p class="description">${course.description}</p>
            
            <div class="course-meta">
                <span><i class="fas fa-signal"></i> ${course.level}</span>
                <span><i class="fas fa-clock"></i> ${course.duration}</span>
                <span><i class="fas fa-brain"></i> ${course.completion_rate || 85}% Completion</span>
            </div>
            
            <div class="course-features">
                <div class="feature-tag">🎮 Interactive</div>
                <div class="feature-tag">🧠 High Retention</div>
                <div class="feature-tag">💡 Practical</div>
            </div>
            
            <div class="course-price">R ${course.price.toLocaleString('en-ZA')} ZAR</div>
            <button class="add-to-cart enhanced-cart-btn" onclick="addToCart(${course.id})">
                <i class="fas fa-cart-plus"></i> Add to Cart - R ${course.price.toLocaleString('en-ZA')}
            </button>
        </div>
    `).join('');
}

function renderEnhancedFreeCourse() {
    const card = document.getElementById('freeCourseCard');
    card.innerHTML = `
        <div class="course-image" style="background: linear-gradient(135deg, #06d6a0, #00b4d8)">
            ${currentFreeCourse.icon}
            <div class="free-badge">FREE THIS MONTH</div>
        </div>
        <span class="course-badge">🎁 FREE ACCESS</span>
        <h3>${currentFreeCourse.title}</h3>
        <p class="description">${currentFreeCourse.description}</p>
        
        <div class="course-meta">
            <span><i class="fas fa-signal"></i> ${currentFreeCourse.level}</span>
            <span><i class="fas fa-clock"></i> ${currentFreeCourse.duration}</span>
            <span><i class="fas fa-calendar"></i> Free until ${getNextMonth()}</span>
        </div>
        
        <div class="course-features">
            <div class="feature-tag">🎯 Beginner Friendly</div>
            <div class="feature-tag">💡 Practical Skills</div>
            <div class="feature-tag">🚀 Instant Access</div>
        </div>
        
        <div class="course-price">FREE</div>
        <button class="add-to-cart free-enroll-btn" onclick="enrollFreeCourse()">
            <i class="fas fa-gift"></i> Enroll for Free - Limited Time!
        </button>
    `;
}

function getCourseColor(courseId) {
    const colors = [
        '#667eea', '#764ba2', '#f093fb', '#f5576c',
        '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
        '#fa709a', '#fee140', '#a8edea', '#fed6e3'
    ];
    return colors[courseId % colors.length];
}

function getNextMonth() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const current = new Date().getMonth();
    return months[(current + 1) % 12];
}

// Enhanced CSS for addictive features
const enhancedStyles = `
    .enhanced-course {
        position: relative;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .enhanced-course:hover {
        transform: translateY(-12px) scale(1.03);
        box-shadow: 0 30px 70px rgba(0,0,0,0.2);
    }
    
    .addictive-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255,255,255,0.2);
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        backdrop-filter: blur(10px);
    }
    
    .completion-badge {
        background: #10b981;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        display: inline-block;
        margin: 0.5rem 0;
    }
    
    .free-badge {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: rgba(6, 214, 160, 0.9);
        color: #1e293b;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 700;
        backdrop-filter: blur(10px);
    }
    
    .course-features {
        display: flex;
        gap: 0.5rem;
        margin: 1rem 0;
        flex-wrap: wrap;
    }
    
    .feature-tag {
        background: rgba(37, 99, 235, 0.1);
        color: #2563eb;
        padding: 0.3rem 0.6rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .enhanced-cart-btn {
        background: linear-gradient(135deg, #2563eb, #7c3aed);
        position: relative;
        overflow: hidden;
    }
    
    .enhanced-cart-btn:hover {
        background: linear-gradient(135deg, #1d4ed8, #6d28d9);
        transform: translateY(-2px);
    }
    
    .free-enroll-btn {
        background: linear-gradient(135deg, #06d6a0, #00b4d8);
        position: relative;
        overflow: hidden;
    }
    
    .free-enroll-btn:hover {
        background: linear-gradient(135deg, #05c391, #0099cc);
        transform: translateY(-2px);
    }
`;

// Add enhanced styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);

// Initialize enhanced platform
document.addEventListener('DOMContentLoaded', async function() {
    await loadEnhancedCourseData();
    renderEnhancedCourses();
    renderEnhancedFreeCourse();
    updateCartUI();
    initializeEventListeners();
    
    // Start enhanced content creation
    if (typeof EnhancedContentCreationEngine !== 'undefined') {
        const enhancedEngine = new EnhancedContentCreationEngine();
        enhancedEngine.initializeEnhancedContentCreation();
    }
    
    startEnhancedMarketingEngine();
});

// Enhanced marketing engine
function startEnhancedMarketingEngine() {
    console.log('📢 ENHANCED MARKETING ENGINE: Promoting addictive courses...');
    
    const platforms = ['TikTok', 'Instagram', 'YouTube', 'Facebook', 'Twitter', 'LinkedIn'];
    setInterval(() => {
        const platform = platforms[Math.floor(Math.random() * platforms.length)];
        const messages = [
            `🎮 Just launched: AI Algorithm course with 95% addictive score!`,
            `🧠 Students reporting 87% knowledge retention with our new memory techniques`,
            `🚀 Free course this month: "${currentFreeCourse.title}" - Limited time!`,
            `💡 Our algorithm course reveals exact systems we use to generate R50k+/month`,
            `🎯 84% average course completion rate across all addictive courses`,
            `🔥 Trending: YouTube Shorts algorithm course with viral content formulas`
        ];
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        console.log(`📢 Enhanced Marketing (${platform}): ${message}`);
    }, 7000);
}
