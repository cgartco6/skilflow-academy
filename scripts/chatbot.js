// LLM Customer Support Chatbot - Bronwyn
class BronwynChatbot {
    constructor() {
        this.name = 'Bronwyn';
        this.version = '2.0';
        this.context = [];
        this.isTyping = false;
        
        this.initChatbot();
    }

    initChatbot() {
        console.log('🤖 Bronwyn AI Support: INITIALIZED');
        this.loadContext();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('chatbotInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process message and generate response
        const response = await this.processMessage(message);
        
        // Remove typing indicator and add response
        this.hideTypingIndicator();
        this.addMessage(response, 'bot');
    }

    async processMessage(message) {
        // Analyze message intent
        const intent = this.analyzeIntent(message);
        
        // Generate response based on intent
        let response = await this.generateResponse(message, intent);
        
        // Add to context for future reference
        this.context.push({ role: 'user', content: message });
        this.context.push({ role: 'assistant', content: response });
        
        // Keep context manageable
        if (this.context.length > 20) {
            this.context = this.context.slice(-20);
        }
        
        this.saveContext();
        
        return response;
    }

    analyzeIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('course') || lowerMessage.includes('learn') || lowerMessage.includes('study')) {
            return 'course_info';
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('payment')) {
            return 'pricing';
        } else if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('problem')) {
            return 'support';
        } else if (lowerMessage.includes('refund') || lowerMessage.includes('return') || lowerMessage.includes('money')) {
            return 'refund';
        } else if (lowerMessage.includes('account') || lowerMessage.includes('login') || lowerMessage.includes('access')) {
            return 'account';
        } else if (lowerMessage.includes('technical') || lowerMessage.includes('issue') || lowerMessage.includes('error')) {
            return 'technical';
        } else {
            return 'general';
        }
    }

    async generateResponse(message, intent) {
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        const responses = {
            course_info: [
                "We have 50+ courses across AI, marketing, development, and business. Which specific area interests you?",
                "Our courses feature 92% completion rates with HD quality content. What skills do you want to master?",
                "I can help you find the perfect course! Are you interested in AI, marketing, coding, or business?",
                "We offer courses from beginner to expert level. What's your current experience level?"
            ],
            pricing: [
                "Course prices range from R1,299 to R2,799. We also have monthly free courses!",
                "We offer multiple payment options: PayFast, Stripe, and EFT. All payments are secure.",
                "Premium courses include lifetime access, HD content, and certificates. Would you like course recommendations?",
                "We provide excellent value with 92% completion rates. What's your budget range?"
            ],
            support: [
                "I'm here to help! Please describe your issue and I'll assist you immediately.",
                "Our support team responds within 2 hours. You can also email support@skillflow.co.za",
                "I can help with most issues right now. What specific problem are you experiencing?",
                "We offer 24/7 support through me and our human team. How can I assist you today?"
            ],
            refund: [
                "For refund requests, please contact support@skillflow.co.za with your order details.",
                "Refund processing takes 3-5 business days. Email us with your transaction ID.",
                "We handle refunds on a case-by-case basis. Contact support with your specific situation.",
                "Refund inquiries should be sent to support@skillflow.co.za for prompt assistance."
            ],
            account: [
                "Account issues? Try resetting your password or contact support@skillflow.co.za",
                "I can help with account access problems. What specific issue are you facing?",
                "For login problems, check your email for verification links or contact support.",
                "Account recovery is quick! Email us at support@skillflow.co.za for immediate help."
            ],
            technical: [
                "Technical issues? Try clearing your cache and refreshing the page.",
                "I'll help troubleshoot! What error message are you seeing?",
                "For technical problems, contact support@skillflow.co.za with screenshots.",
                "Let's solve this together! Describe the technical issue you're experiencing."
            ],
            general: [
                "I'm Bronwyn, your AI learning assistant! How can I help you today?",
                "Welcome to SkillFlow Academy! I'm here to assist with courses, payments, or support.",
                "Hello! I can help you find courses, answer questions, or connect you with support.",
                "Hi there! I'm Bronwyn, ready to help you with your learning journey."
            ]
        };

        const intentResponses = responses[intent] || responses.general;
        return intentResponses[Math.floor(Math.random() * intentResponses.length)];
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = content;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        this.isTyping = true;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }

    loadContext() {
        const saved = localStorage.getItem('chatbot_context');
        if (saved) {
            this.context = JSON.parse(saved);
        }
    }

    saveContext() {
        localStorage.setItem('chatbot_context', JSON.stringify(this.context));
    }

    // Advanced features
    async analyzeSentiment(message) {
        // Basic sentiment analysis
        const positiveWords = ['good', 'great', 'excellent', 'awesome', 'love', 'thanks', 'thank you'];
        const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'disappointed', 'angry', 'frustrated'];
        
        const lowerMessage = message.toLowerCase();
        let sentiment = 'neutral';
        
        if (positiveWords.some(word => lowerMessage.includes(word))) {
            sentiment = 'positive';
        } else if (negativeWords.some(word => lowerMessage.includes(word))) {
            sentiment = 'negative';
        }
        
        return sentiment;
    }

    escalateToHuman() {
        this.addMessage("I'm connecting you with our human support team. Please check your email for further assistance.", 'bot');
        // In production, this would trigger a support ticket
    }

    provideCourseRecommendations() {
        const courses = JSON.parse(localStorage.getItem('available_courses') || '[]');
        const trending = courses.filter(c => c.trending).slice(0, 3);
        
        if (trending.length > 0) {
            let response = "Based on current trends, I recommend:\n\n";
            trending.forEach(course => {
                response += `• ${course.title} (R${course.price}) - ${course.rating}⭐\n`;
            });
            response += "\nWould you like more details about any of these?";
            return response;
        }
        
        return "I recommend checking our trending courses section for the most popular options right now!";
    }
}

// Initialize Bronwyn
const Bronwyn = new BronwynChatbot();

// Global functions for HTML
function toggleChatbot() {
    const widget = document.getElementById('chatbotWidget');
    if (widget) {
        widget.style.display = widget.style.display === 'none' ? 'block' : 'none';
    }
}

function sendChatMessage() {
    Bronwyn.sendMessage();
}

// Export for global access
window.Bronwyn = Bronwyn;
window.toggleChatbot = toggleChatbot;
window.sendChatMessage = sendChatMessage;
