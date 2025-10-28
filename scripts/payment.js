function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('🛒 Your cart is empty! Add some courses first.');
        return;
    }

    if (!selectedPaymentMethod) {
        showNotification('💳 Please select a payment method');
        return;
    }

    // Process payment based on selected method
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    switch(selectedPaymentMethod) {
        case 'payfast':
            processPayFastPayment(total);
            break;
        case 'stripe':
            processStripePayment(total);
            break;
        case 'eft':
            processEFTPayment(total);
            break;
    }
}

function processPayFastPayment(total) {
    showNotification('🔒 Redirecting to PayFast Secure Payment Gateway...');
    
    // Simulate PayFast integration
    setTimeout(() => {
        completePurchase('PayFast', total);
    }, 2000);
}

function processStripePayment(total) {
    showNotification('🌍 Processing with Stripe Global Payments...');
    
    // Simulate Stripe integration
    setTimeout(() => {
        completePurchase('Stripe', total);
    }, 2000);
}

function processEFTPayment(total) {
    const bankDetails = `
        💰 FNB Bank Transfer Details:
        ----------------------------
        Bank: First National Bank
        Account Name: SkillFlow Academy (Pty) Ltd
        Account Number: [62••• •••• 891]
        Branch Code: 250655
        Account Type: Business Current Account
        Reference: SF${Date.now()}
        
        💵 Amount: R ${total.toLocaleString('en-ZA')} ZAR
        
        ⏰ Please email proof of payment to:
        payments@skillflow.academy
        
        ✅ Access will be granted within 2 hours of payment confirmation.
    `;
    
    alert(`📋 EFT Payment Instructions:\n\n${bankDetails}\n\nThank you for your purchase!`);
    
    // Simulate EFT payment tracking
    setTimeout(() => {
        completePurchase('EFT', total);
    }, 1000);
}

function completePurchase(paymentMethod, total) {
    const sale = {
        id: Date.now(),
        items: [...cart],
        total: total,
        paymentMethod: paymentMethod,
        timestamp: new Date().toISOString(),
        currency: 'ZAR'
    };

    // Update business data
    businessData.totalRevenue += total;
    businessData.totalSales += cart.length;
    businessData.monthlyRevenue += total;
    businessData.monthlySales += cart.length;
    businessData.salesHistory.push(sale);
    
    localStorage.setItem('businessData', JSON.stringify(businessData));

    // Generate download links
    const downloadLinks = cart.map(course => 
        `🎯 ${course.title}\n📥 Download: https://skillflow.academy/download/${course.id}/${generateToken()}\n🔑 Access Code: SF${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    ).join('\n\n');
    
    // Show success message
    alert(`🎉 PAYMENT SUCCESSFUL!\n\nVia: ${paymentMethod}\nAmount: R ${total.toLocaleString('en-ZA')} ZAR\n\n📚 YOUR COURSES ARE READY:\n\n${downloadLinks}\n\n⭐ Links have been sent to your email\n💫 Start learning immediately!`);
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    renderCartItems();
    toggleCart();
    selectedPaymentMethod = null;
    
    // Reset payment method selection
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
    });
}
