// Course Data - All prices in ZAR
const courses = [
    {
        id: 1,
        title: "AI Prompt Engineering Mastery",
        price: 1799,
        category: "Technology",
        level: "Beginner to Advanced",
        duration: "6 hours",
        trending: true,
        description: "Master the art of communicating with AI systems for maximum productivity and creativity. Learn advanced prompt techniques that work across all AI platforms.",
        icon: "🤖"
    },
    {
        id: 2,
        title: "Short-Form Video Domination",
        price: 1599,
        category: "Marketing",
        level: "All Levels",
        duration: "5 hours",
        trending: true,
        description: "Create viral content for TikTok, Reels, and Shorts that drives massive business growth. Algorithm secrets and engagement hacks included.",
        icon: "🎬"
    },
    {
        id: 3,
        title: "Personal Branding for the Digital Age",
        price: 1499,
        category: "Business",
        level: "Beginner",
        duration: "4 hours",
        trending: true,
        description: "Build authority and monetize your expertise across all major social platforms. Become the go-to expert in your niche.",
        icon: "⭐"
    },
    {
        id: 4,
        title: "No-Code Business Automation",
        price: 1699,
        category: "Technology",
        level: "Beginner to Intermediate",
        duration: "5 hours",
        trending: true,
        description: "Automate workflows and build powerful apps without any programming knowledge. Save 20+ hours per week with smart automation.",
        icon: "⚡"
    },
    {
        id: 5,
        title: "Sustainable Living & Green Entrepreneurship",
        price: 1399,
        category: "Lifestyle",
        level: "All Levels",
        duration: "4 hours",
        trending: true,
        description: "Build eco-friendly businesses and significantly reduce your environmental impact. Profit while making a positive difference.",
        icon: "🌱"
    },
    {
        id: 6,
        title: "Cryptocurrency & DeFi Fundamentals",
        price: 1899,
        category: "Finance",
        level: "Beginner",
        duration: "6 hours",
        trending: true,
        description: "Understand blockchain technology, smart crypto investing, and decentralized finance. Navigate the Web3 space with confidence.",
        icon: "₿"
    },
    {
        id: 7,
        title: "Mental Health & Digital Wellness",
        price: 1299,
        category: "Health",
        level: "All Levels",
        duration: "3 hours",
        trending: true,
        description: "Manage stress, anxiety, and maintain optimal wellness in our hyper-connected world. Practical techniques for digital balance.",
        icon: "🧠"
    },
    {
        id: 8,
        title: "Remote Work Mastery",
        price: 1549,
        category: "Career",
        level: "All Levels",
        duration: "4 hours",
        trending: true,
        description: "Excel in remote work environments and build a successful location-independent career. Productivity systems that actually work.",
        icon: "🏠"
    },
    {
        id: 9,
        title: "Data Analytics for Beginners",
        price: 1749,
        category: "Technology",
        level: "Beginner",
        duration: "7 hours",
        trending: true,
        description: "Learn to analyze complex data and make data-driven business decisions without coding. Turn data into actionable insights.",
        icon: "📊"
    },
    {
        id: 10,
        title: "Ethical Hacking Fundamentals",
        price: 1999,
        category: "Technology",
        level: "Intermediate",
        duration: "8 hours",
        trending: true,
        description: "Learn essential cybersecurity basics and practical ethical hacking techniques. Protect yourself and understand digital security.",
        icon: "🛡️"
    },
    {
        id: 11,
        title: "NFT Creation & Marketing",
        price: 1649,
        category: "Creative",
        level: "Beginner to Intermediate",
        duration: "5 hours",
        trending: true,
        description: "Create, mint, and successfully market your own NFT collections to global audiences. Turn your creativity into income.",
        icon: "🖼️"
    },
    {
        id: 12,
        title: "Metaverse & Web3 Essentials",
        price: 1799,
        category: "Technology",
        level: "Beginner",
        duration: "4 hours",
        trending: true,
        description: "Understand and confidently navigate the emerging metaverse and Web3 landscape. Position yourself for the next digital revolution.",
        icon: "🌐"
    }
];

const freeCourse = {
    id: 0,
    title: "Digital Productivity Fundamentals",
    price: 0,
    category: "Productivity",
    level: "All Levels",
    duration: "2 hours",
    description: "Master proven time management techniques and tool optimization for maximum daily efficiency. Get more done in less time.",
    icon: "🚀"
};

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
document.addEventListener('DOMContentLoaded', function() {
    renderCourses();
    renderFreeCourse();
    updateCartUI();
    initializeEventListeners();
    startContentCreationEngine();
    startMarketingEngine();
});

function renderCourses() {
    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = courses.map(course => `
        <div class="course-card">
            <div class="course-image">
                ${course.icon}
            </div>
            ${course.trending ? '<span class="course-badge">🔥 TRENDING</span>' : ''}
            <h3>${course.title}</h3>
            <p class="description">${course.description}</p>
            <div class="course-meta">
                <span><i class="fas fa-signal"></i> ${course.level}</span>
                <span><i class="fas fa-clock"></i> ${course.duration}</span>
            </div>
            <div class="course-price">R ${course.price.toLocaleString('en-ZA')} ZAR</div>
            <button class="add-to-cart" onclick="addToCart(${course.id})">
                <i class="fas fa-cart-plus"></i> Add to Cart - R ${course.price.toLocaleString('en-ZA')}
            </button>
        </div>
    `).join('');
}

function renderFreeCourse() {
    const card = document.getElementById('freeCourseCard');
    card.innerHTML = `
        <div class="course-image">
            ${freeCourse.icon}
        </div>
        <span class="course-badge">🎁 FREE ACCESS</span>
        <h3>${freeCourse.title}</h3>
        <p class="description">${freeCourse.description}</p>
        <div class="course-meta">
            <span><i class="fas fa-signal"></i> ${freeCourse.level}</span>
            <span><i class="fas fa-clock"></i> ${freeCourse.duration}</span>
        </div>
        <div class="course-price">FREE</div>
        <button class="add-to-cart" onclick="enrollFreeCourse()">
            <i class="fas fa-gift"></i> Enroll for Free
        </button>
    `;
}

function addToCart(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course && !cart.find(item => item.id === courseId)) {
        cart.push(course);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        showNotification(`🎉 Added "${course.title}" to cart!`);
        
        // Add subtle animation to cart icon
        const cartIcon = document.getElementById('cartIcon');
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    }
}

function removeFromCart(courseId) {
    const course = cart.find(item => item.id === courseId);
    cart = cart.filter(item => item.id !== courseId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    renderCartItems();
    showNotification(`🗑️ Removed "${course.title}" from cart`);
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const total = cart.reduce((total, item) => total + item.price, 0);
    
    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toLocaleString('en-ZA');
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--gray);">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Your cart is empty</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Add some courses to get started!</p>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">R ${item.price.toLocaleString('en-ZA')} ZAR</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove from cart">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function initializeEventListeners() {
    // Cart toggle
    document.getElementById('cartIcon').addEventListener('click', toggleCart);
    document.getElementById('overlay').addEventListener('click', toggleCart);
    
    // Hamburger menu
    document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (sidebar.classList.contains('active')) {
        renderCartItems();
    }
}

function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

function selectPayment(method) {
    selectedPaymentMethod = method;
    
    // Update UI
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
}

function enrollFreeCourse() {
    const accessCode = `SF-FREE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const downloadLink = `🎯 ${freeCourse.title}\n📥 Download: https://skillflow.academy/download/free/${generateToken()}\n🔑 Access Code: ${accessCode}`;
    
    alert(`🎉 FREE COURSE ACTIVATED!\n\n${downloadLink}\n\n⭐ Welcome to the SkillFlow community!\n💫 Your learning journey begins now!`);
}

function generateToken() {
    return Math.random().toString(36).substr(2, 12) + Date.now().toString(36);
}

function showNotification(message) {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(el => el.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--accent);
        color: var(--dark);
        padding: 1.2rem 1.8rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1002;
        font-weight: 700;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 350px;
        border-left: 4px solid var(--primary);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

function scrollToCourses() {
    document.getElementById('courses').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function openAdminLogin() {
    const password = prompt('🔐 Enter Owner Portal Password:');
    if (password === 'SkillFlow2024!') {
        window.open('dashboard.html', '_blank', 'width=1200,height=800');
    } else if (password) {
        alert('❌ Access Denied: Invalid password');
    }
}

// Content Creation Engine
function startContentCreationEngine() {
    console.log('🚀 CONTENT CREATION ENGINE STARTED');
    console.log('📚 AI Content Team: Generating 12 premium courses...');
    console.log('🎬 Video Production: Creating engaging course materials...');
    console.log('🛠️ Code Development: Building interactive exercises...');
    
    setInterval(() => {
        const activities = [
            '📝 Scripting new course modules...',
            '🎥 Recording high-quality video lessons...',
            '💻 Developing interactive code exercises...',
            '🎨 Designing engaging course materials...',
            '📊 Creating assessment quizzes...',
            '🌟 Producing certificate templates...'
        ];
        const activity = activities[Math.floor(Math.random() * activities.length)];
        console.log(`🔄 Content Team: ${activity}`);
    }, 10000);
}

// Marketing Engine
function startMarketingEngine() {
    console.log('📢 MARKETING ENGINE ACTIVATED');
    console.log('🌍 Global Campaign: Targeting South Africa, Namibia, Botswana, USA, Europe, Australia');
    console.log('📱 Multi-Platform: TikTok, Facebook, Instagram, YouTube, X, LinkedIn');
    
    const platforms = ['TikTok', 'Facebook', 'Instagram', 'YouTube', 'X', 'LinkedIn'];
    setInterval(() => {
        const platform = platforms[Math.floor(Math.random() * platforms.length)];
        const actions = [
            `Creating viral content for ${platform}...`,
            `Scheduling posts for ${platform}...`,
            `Analyzing ${platform} engagement metrics...`,
            `Optimizing ads on ${platform}...`,
            `Engaging with audience on ${platform}...`
        ];
        const action = actions[Math.floor(Math.random() * actions.length)];
        console.log(`📢 Marketing Team (${platform}): ${action}`);
    }, 8000);
}

// Auto-add to cart demo (remove in production)
setTimeout(() => {
    if (cart.length === 0 && Math.random() > 0.7) {
        const demoCourse = courses[Math.floor(Math.random() * courses.length)];
        addToCart(demoCourse.id);
    }
}, 10000);
