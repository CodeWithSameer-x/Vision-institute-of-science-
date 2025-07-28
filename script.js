// Theme Toggle
document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Navbar Toggle for Mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close navbar when a link is clicked (mobile)
navLinks.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Active Navbar Item
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Popup for Courses
function showPopup(course) {
    const popupText = document.getElementById('popup-text');
    if (course === 'organic') {
        popupText.innerHTML = '<h3>NEET/JEE Organic Chemistry</h3><p>Overview: This course covers advanced organic chemistry concepts, reaction mechanisms, and problem-solving techniques for NEET/JEE aspirants, led by expert faculty.</p>';
    } else if (course === 'bio') {
        popupText.innerHTML = '<h3>12/11 Chemistry & Bio Classes</h3><p>Overview: Tailored for CBSE/ICSE students, this course includes detailed chemistry and biology lessons with practical experiments and regular assessments.</p>';
    } else if (course === 'foundation') {
        popupText.innerHTML = '<h3>10/9 Foundation of Science</h3><p>Overview: A beginner-friendly course focusing on basic science principles, designed to build a strong foundation for future academic success.</p>';
    }
    document.getElementById('popup').style.display = 'block';
}

function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Set Active Page on Load
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const activeItem = document.querySelector(`.nav-item[href="${hash}"]`);
        if (activeItem) {
            navItems.forEach(i => i.classList.remove('active'));
            activeItem.classList.add('active');
        }
    } else {
        navItems[0].classList.add('active'); // Default to Home
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Message Popup
function showMessage(type) {
    const messageText = document.getElementById('message-text');
    if (type === 'disclaimer') {
        messageText.innerHTML = '<h3>Disclaimer</h3><p>This website is for educational purposes only. We are not responsible for any financial or personal losses incurred while using our services.</p>';
    } else if (type === 'privacy') {
        messageText.innerHTML = '<h3>Privacy Policy</h3><p>We collect minimal user data to improve your experience. Your information is kept secure and will not be shared with third parties without consent.</p>';
    }
    document.getElementById('message-popup').style.display = 'block';
}

function hideMessage() {
    document.getElementById('message-popup').style.display = 'none';
}

// Typing Effect
const textEl = document.getElementById('typed-text');
const fullText = "Welcome to VIS";
const colors = ['#ff0055', '#00ffaa', '#0099ff', '#ffcc00', '#ee00ff', '#00f0ff'];

let charIndex = 0;
let currentColor = colors[Math.floor(Math.random() * colors.length)];

function typeEffect() {
    if (charIndex === 0) {
        textEl.textContent = '';
        currentColor = colors[Math.floor(Math.random() * colors.length)];
        textEl.style.color = currentColor;
    }

    if (charIndex < fullText.length) {
        textEl.textContent += fullText[charIndex];
        charIndex++;
        setTimeout(typeEffect, 150);
    } else {
        setTimeout(() => {
            charIndex = 0;
            typeEffect();
        }, 2000);
    }
}

typeEffect();

// Announcement Toggle
function toggleAnnouncement() {
    const cards = document.getElementById('announcement-cards');
    if (cards.style.display === 'none' || cards.style.display === '') {
        cards.style.display = 'flex';
    } else {
        cards.style.display = 'none';
    }
}

// Image Popup
function showImage(imageSrc) {
    const popup = document.getElementById('image-popup');
    const popupImage = document.getElementById('popup-image');
    popupImage.src = imageSrc;
    popup.style.display = 'block';
}

function hideImagePopup() {
    document.getElementById('image-popup').style.display = 'none';
}