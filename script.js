document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
 // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For now, we'll just log it and show an alert
            console.log({ name, email, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Add animation on scroll
    const animateOnScroll = function() {
const elements = document.querySelectorAll('.experience-item, .project-card, .education-item, .skills-category');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.experience-item, .project-card, .education-item, .skills-category').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});
// Communication Channels Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Track channel clicks for analytics (optional)
    const channelCards = document.querySelectorAll('.channel-card');
    
    channelCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Get the channel type
            const channelType = this.querySelector('h3').textContent;
            console.log(Channel clicked: ${channelType});
            
            // You can add analytics tracking here
            // Example: sendToGoogleAnalytics(Channel-${channelType});
        });
    });
    // Copy contact info to clipboard
    const contactItems = document.querySelectorAll('.channel-card p');
    
    contactItems.forEach(item => {
        // Only make clickable if it's a phone/email (not the LinkedIn description)
        if(item.textContent.includes('@') || item.textContent.includes('+')) {
            item.style.cursor = 'pointer';
            item.title = 'Click to copy';
            
            item.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering the card click
                copyToClipboard(this.textContent);
                
                // Visual feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = '#25D366'; // WhatsApp green for success
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            });
        }
    });

    // Clipboard function
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    // Time-based greeting suggestion
    const whatsappCard = document.querySelector('.whatsapp').closest('.channel-card');
    const now = new Date();
    const hours = now.getHours();
    
    let suggestion = '';
    if(hours < 12) {
        suggestion = 'Morning hours recommended';
    } else if(hours < 17) {
        suggestion = 'Quick response expected';
    } else {
        suggestion = 'Evening hours - may respond later';
    }
    
    const suggestionElement = document.createElement('p');
    suggestionElement.className = 'time-suggestion';
    suggestionElement.textContent = suggestion;
    suggestionElement.style.fontSize = '0.8rem';
    suggestionElement.style.marginTop = '8px';
    suggestionElement.style.color = '#666';
    whatsappCard.appendChild(suggestionElement);
});
// AI Chatbot with Auto-Reply (Add to your script.js)
document.addEventListener('DOMContentLoaded', function() {
    // Chatbot Elements
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotTrigger = document.getElementById('chatbot-trigger');
    const closeChatbot = document.getElementById('close-chatbot');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Chatbot State
    let isChatbotOpen = false;

    // Professional Knowledge Base (Customize with your info)
    const knowledgeBase = {
        greetings: ["Hi there!", "Hello!", "How can I help you today?"],
  services: [
            "I offer: 1) Data Analysis 2) Power BI Dashboards 3) Content Moderation QA",
            "My services include data visualization, reporting, and quality analysis"
        ],
        experience: [
            "Current: Quality Analyst at TaskUs (since May 2024)",
            "Previous: Customer Care Executive at Teleperformance (2020-2021)"
        ],
        skills: [
            "Technical: Power BI, Data Science fundamentals, AI basics",
            "Professional: Quality Analysis, Data Reporting, Teamwork"
        ],
        contact: [
            "Call: ‪+91 6379557862‬ or ‪+91 8870859460‬",
            "Email: karthikba1998@gmail.com",
            "Address: 3-52 East Street, Sengattampatti, Dindigul - 624708"
        ],
        projects: [
            "Power BI: Created sales trend dashboards",
            "AI: Tested text classification workflows"
        ],
        default: [
            "I'm Karthik's AI assistant. I can tell you about his: services, experience, skills, projects, or contact info",
            "Try asking about my professional background or skills"
        ]
    };
 // Toggle Chatbot
    chatbotTrigger.addEventListener('click', () => {
        isChatbotOpen = !isChatbotOpen;
        chatbotContainer.classList.toggle('chatbot-visible');
        if(isChatbotOpen) {
            addBotMessage(knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)]);
        }
    });

    closeChatbot.addEventListener('click', () => {
        isChatbotOpen = false;
        chatbotContainer.classList.remove('chatbot-visible');
    });

    // Send Message Function
    function sendMessage() {
        const message = userInput.value.trim();
        if(message) {
            addUserMessage(message);
            userInput.value = '';
            setTimeout(() => generateAIResponse(message), 800);
        }
    }

    // Input Event Listeners
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendMessage();
    });

    // Message Display Functions
  function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // AI Response Generator
    function generateAIResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        let response = "";
        
        // Simple NLP for intent detection
        if(lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
            response = knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
   } 
        else if(lowerMsg.includes('service') || lowerMsg.includes('offer')) {
            response = knowledgeBase.services.join('\n');
        }
        else if(lowerMsg.includes('experience') || lowerMsg.includes('job')) {
            response = knowledgeBase.experience.join('\n');
        }
        else if(lowerMsg.includes('skill') || lowerMsg.includes('expert')) {
            response = knowledgeBase.skills.join('\n');
        }
        else if(lowerMsg.includes('contact') || lowerMsg.includes('reach')) {
            response = knowledgeBase.contact.join('\n');
        }
        else if(lowerMsg.includes('project') || lowerMsg.includes('work')) {
            response = knowledgeBase.projects.join('\n');
        }
        else {
            response = knowledgeBase.default[Math.floor(Math.random() * knowledgeBase.default.length)];
        }

        // Simulate typing effect
        let i = 0;
  const typingInterval = setInterval(() => {
            if(i < response.length) {
                const currentText = response.substring(0, i+1);
                const lastMessage = chatbotMessages.lastChild;
                if(lastMessage.classList.contains('bot-message')) {
                    lastMessage.textContent = currentText;
                    scrollToBottom();
                } else {
                    addBotMessage(currentText);
                }
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 20);
    }

    // Initial greeting when page loads
    setTimeout(() => {
        chatbotTrigger.classList.add('pulse');
    }, 5000);

    // Add pulse animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .pulse {
            animation: pulse 1.5s infinite;
        }
;
    document.head.appendChild(style);
});