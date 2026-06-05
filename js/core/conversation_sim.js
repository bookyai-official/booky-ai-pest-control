/**
 * Conversation Simulation for Hero Section
 */

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = [
        { role: 'user', content: 'Hey, do you have any openings for a boiler service this Friday?' },
        { role: 'ai', content: 'Checking our schedule... Yes! We have availability at 9:00 AM and 2:30 PM. Would one of those work for you?' },
        { role: 'user', content: '9:00 AM works perfectly. How much will it cost?' },
        { role: 'ai', content: 'Great! A standard boiler service is $85. I\'ve reserved the 9:00 AM slot for you. Shall I go ahead and confirm the booking?' },
        { role: 'user', content: 'Yes please, confirm it.' },
        { role: 'ai', content: 'Done! ✅ Your booking for Friday at 9:00 AM is confirmed. You\'ll receive a confirmation email shortly. Anything else I can help with?' },
        { role: 'user', content: 'That\'s all, thank you!' }
    ];

    const messagesContainer = document.getElementById('heroChatMessages');
    const typingIndicator = document.getElementById('heroTypingIndicator');
    
    let currentMessageIndex = 0;

    function addMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}-message`;
        messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
        messagesContainer.appendChild(messageDiv);
        
        // Trigger reflow for animation
        setTimeout(() => {
            messageDiv.classList.add('visible');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);
    }

    function typeNextMessage() {
        if (currentMessageIndex >= chatMessages.length) {
            // Optional: Restart conversation after a long delay
            setTimeout(() => {
                messagesContainer.innerHTML = '';
                currentMessageIndex = 0;
                typeNextMessage();
            }, 10000);
            return;
        }

        const message = chatMessages[currentMessageIndex];
        
        // Users don't show typing indicator, usually
        if (message.role === 'ai') {
            typingIndicator.style.display = 'flex';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // AI typing delay based on content length - Faster
            const typingTime = Math.min(Math.max(message.content.length * 5, 100), 1500);
            
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                addMessage(message.role, message.content);
                currentMessageIndex++;
                
                // Delay before next message - Faster
                setTimeout(typeNextMessage, 1200);
            }, typingTime);
        } else {
            // User message delay (simulating typing/thinking) - Faster
            const thinkingTime = 800;
            
            setTimeout(() => {
                addMessage(message.role, message.content);
                currentMessageIndex++;
                
                // Delay before next AI response - Faster
                setTimeout(typeNextMessage, 500);
            }, thinkingTime);
        }
    }

    // Start simulation when the hero section is in view or after a small initial delay
    setTimeout(() => {
        // Clear initial placeholders from HTML if any (or just start adding)
        messagesContainer.innerHTML = '';
        typeNextMessage();
    }, 2000);
});
