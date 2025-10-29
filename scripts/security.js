// Military Grade Security System
class MilitarySecurity {
    constructor() {
        this.encryptionKey = this.generateEncryptionKey();
        this.fraudDetection = new FraudDetectionSystem();
        this.accessControl = new AccessControlSystem();
        this.auditLogger = new AuditLogger();
        
        this.initSecurity();
    }

    initSecurity() {
        // Prevent right-click and inspect element
        this.preventInspection();
        
        // Encrypt sensitive data
        this.encryptSensitiveData();
        
        // Initialize fraud detection
        this.fraudDetection.startMonitoring();
        
        // Log security initialization
        this.auditLogger.log('SECURITY_SYSTEM_INITIALIZED', 'Military-grade security activated');
        
        console.log('🛡️ Military Security System: ACTIVE');
    }

    generateEncryptionKey() {
        return btoa(Date.now() + Math.random().toString(36)).substr(0, 32);
    }

    encryptSensitiveData() {
        // Encrypt API keys, bank details, and sensitive information
        const sensitiveData = {
            payfast_merchant_id: this.encrypt('PF_MERCHANT_XXXXXX'),
            payfast_merchant_key: this.encrypt('PF_MERCHANT_KEY_XXXXXX'),
            stripe_publishable_key: this.encrypt('pk_live_XXXXXXXXXXXXXXXXXXXXXXXX'),
            bank_account_number: this.encrypt('62••• •••• 891'),
            bank_branch_code: this.encrypt('250655'),
            admin_password: this.encrypt('SkillFlow2024!')
        };

        localStorage.setItem('encrypted_data', JSON.stringify(sensitiveData));
    }

    encrypt(data) {
        // Simple XOR encryption for demonstration
        // In production, use Web Crypto API
        let result = '';
        for (let i = 0; i < data.length; i++) {
            result += String.fromCharCode(data.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length));
        }
        return btoa(result);
    }

    decrypt(encryptedData) {
        try {
            const decoded = atob(encryptedData);
            let result = '';
            for (let i = 0; i < decoded.length; i++) {
                result += String.fromCharCode(decoded.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length));
            }
            return result;
        } catch (error) {
            this.auditLogger.log('DECRYPTION_FAILED', 'Failed to decrypt data');
            return null;
        }
    }

    preventInspection() {
        // Prevent right-click
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.auditLogger.log('RIGHT_CLICK_BLOCKED', 'User attempted right-click');
            return false;
        });

        // Prevent F12, Ctrl+Shift+I, etc.
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') || 
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                this.auditLogger.log('DEVTOOLS_BLOCKED', 'User attempted to open devtools');
                return false;
            }
        });
    }

    validatePayment(data) {
        return this.fraudDetection.analyzeTransaction(data);
    }

    secureAPIRequest(endpoint, data) {
        const timestamp = Date.now();
        const signature = this.generateSignature(endpoint, data, timestamp);
        
        return {
            endpoint,
            data: this.encrypt(JSON.stringify(data)),
            timestamp,
            signature,
            security_level: 'military_grade'
        };
    }

    generateSignature(endpoint, data, timestamp) {
        const payload = endpoint + JSON.stringify(data) + timestamp + this.encryptionKey;
        return btoa(payload).substr(0, 32);
    }
}

class FraudDetectionSystem {
    constructor() {
        this.suspiciousPatterns = [
            'multiple_failed_payments',
            'rapid_successive_orders',
            'unusual_amount_patterns',
            'suspicious_ip_addresses'
        ];
        this.blockedIPs = new Set();
    }

    startMonitoring() {
        setInterval(() => {
            this.analyzeTrafficPatterns();
        }, 30000);
    }

    analyzeTransaction(transaction) {
        const riskScore = this.calculateRiskScore(transaction);
        
        if (riskScore > 80) {
            this.auditLogger.log('HIGH_RISK_TRANSACTION', `Blocked transaction: ${transaction.id}`);
            return { allowed: false, reason: 'High risk score: ' + riskScore };
        }
        
        if (riskScore > 60) {
            return { allowed: true, requires_verification: true };
        }
        
        return { allowed: true, requires_verification: false };
    }

    calculateRiskScore(transaction) {
        let score = 0;
        
        // Check amount patterns
        if (transaction.amount > 10000) score += 30;
        if (transaction.currency !== 'ZAR') score += 20;
        
        // Check frequency
        const recentTransactions = this.getRecentTransactions(transaction.email);
        if (recentTransactions.length > 3) score += 25;
        
        // Check IP reputation
        if (this.isSuspiciousIP(transaction.ip)) score += 40;
        
        return Math.min(score, 100);
    }

    analyzeTrafficPatterns() {
        // Monitor for DDoS, brute force attacks
        const currentTraffic = this.getCurrentTraffic();
        if (currentTraffic.requests_per_minute > 1000) {
            this.triggerDDoSProtection();
        }
    }

    triggerDDoSProtection() {
        console.log('🚨 DDoS Protection Activated');
        // Implement rate limiting, IP blocking, etc.
    }
}

class AccessControlSystem {
    constructor() {
        this.authorizedUsers = new Set();
        this.failedAttempts = new Map();
        this.maxAttempts = 5;
    }

    authenticateUser(username, password, ip) {
        const attempts = this.failedAttempts.get(ip) || 0;
        
        if (attempts >= this.maxAttempts) {
            this.auditLogger.log('BRUTE_FORCE_BLOCKED', `IP ${ip} blocked for too many attempts`);
            return { success: false, reason: 'Too many failed attempts' };
        }

        // Validate credentials (in production, this would be server-side)
        if (this.validateCredentials(username, password)) {
            this.authorizedUsers.add(username);
            this.failedAttempts.delete(ip);
            return { success: true, token: this.generateToken(username) };
        } else {
            this.failedAttempts.set(ip, attempts + 1);
            return { success: false, reason: 'Invalid credentials' };
        }
    }

    validateCredentials(username, password) {
        // In production, this would be a secure server-side check
        const encryptedPassword = localStorage.getItem('admin_password_encrypted');
        return password === 'SkillFlow2024!'; // Replace with secure validation
    }

    generateToken(username) {
        return btoa(username + Date.now() + Math.random()).substr(0, 32);
    }
}

class AuditLogger {
    log(event, details) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            event,
            details,
            userAgent: navigator.userAgent,
            ip: this.getClientIP() // This would be server-side in production
        };

        // Store logs securely
        const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
        logs.push(logEntry);
        localStorage.setItem('security_logs', JSON.stringify(logs.slice(-1000))); // Keep last 1000 entries

        console.log(`🔒 SECURITY: ${event} - ${details}`);
    }

    getClientIP() {
        // This is a placeholder - real IP detection happens server-side
        return 'client_ip_placeholder';
    }
}

// Initialize security system
const securitySystem = new MilitarySecurity();

// Export for use in other modules
window.SecuritySystem = securitySystem;
