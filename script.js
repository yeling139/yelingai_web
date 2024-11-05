// 添加防抖功能
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 轮播图功能
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// 创建轮播点
const dots = document.querySelector('.slider-dots');
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dots.appendChild(dot);
});

function goToSlide(n) {
    // 移除当前活动状态
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
    document.querySelectorAll('.caption')[currentSlide].classList.remove('active');
    
    // 计算新的索引
    currentSlide = (n + slides.length) % slides.length;
    
    // 添加新的活动状态
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.dot')[currentSlide].classList.add('active');
    document.querySelectorAll('.caption')[currentSlide].classList.add('active');
}

// 添加按钮事件监听
document.querySelector('.prev').addEventListener('click', () => {
    goToSlide(currentSlide - 1);
});

document.querySelector('.next').addEventListener('click', () => {
    goToSlide(currentSlide + 1);
});

// 自动轮播
setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);

// 添加键盘控制
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
    } else if (e.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
    }
});

// 添加触摸滑动支持
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slider-container').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider-container').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
        goToSlide(currentSlide + 1);
    } else if (touchEndX - touchStartX > 50) {
        goToSlide(currentSlide - 1);
    }
});

// 添加导航栏滚动监听
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

// 监听滚动事件
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    // 更新导航栏活动状态
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// 平滑滚动实现
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// AI对话功能
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-btn');
    const messagesContainer = document.querySelector('.messages-container');
    const clearButton = document.querySelector('.clear-btn');

    // 发送消息函数
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        // 添加用户消息
        addMessage(message, 'user');
        messageInput.value = '';
        
        // 模拟AI回复
        setTimeout(() => {
            const aiResponse = `收到你的消息："${message}"。我是AI助手，正在处理你的请求...`;
            addMessage(aiResponse, 'ai');
        }, 1000);

        // 自动滚动到底部
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // 添加消息到对话框
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const time = new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        messageDiv.innerHTML = `
            <div class="avatar">${type === 'ai' ? 'AI' : '我'}</div>
            <div class="message-content">
                <p>${text}</p>
            </div>
            <span class="message-time">${time}</span>
        `;

        messagesContainer.appendChild(messageDiv);
    }

    // 发送按钮点击事件
    sendButton.addEventListener('click', sendMessage);

    // 输入框回车发送
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 清空对话按钮
    clearButton.addEventListener('click', () => {
        if (confirm('确定要清空所有对话吗？')) {
            messagesContainer.innerHTML = `
                <div class="message ai-message">
                    <div class="avatar">AI</div>
                    <div class="message-content">
                        <p>你好！我是夜灵AI助手，很高兴为你服务。请问有什么我可以帮助你的吗？</p>
                    </div>
                </div>
            `;
        }
    });

    // 自动调整输入框高度
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
    });

    // 历史记录点击事件
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.history-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            // 这里可以添加加载对应对话历史的功能
        });
    });
}); 