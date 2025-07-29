// Typing animation for welcome text
function typeWriter() {
    const text = "Welcome to Vision Institute";
    const speed = 100; // Typing speed in milliseconds
    let i = 0;
    const typingText = document.getElementById('typing-text');

    function type() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                typingText.textContent = "";
                i = 0;
                type();
            }, 1000); // Pause before restarting
        }
    }
    type();
}

// Show specific section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    } else {
        console.error(`Section with ID ${sectionId} not found`);
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });

    document.querySelector('.nav-menu').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show announcement section
function showAnnouncements() {
    const announcementSection = document.getElementById('announcement-section');
    announcementSection.style.display = 'block';
    announcementSection.scrollIntoView({ behavior: 'smooth' });
}

// Event delegation for section navigation
document.addEventListener('click', (event) => {
    const sectionLink = event.target.closest('[data-section]');
    if (sectionLink) {
        event.preventDefault();
        const sectionId = sectionLink.getAttribute('data-section');
        showSection(sectionId);
    }
});

// Hamburger menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Theme toggle with persistence
document.getElementById('theme-toggle').addEventListener('click', (event) => {
    event.preventDefault();
    const body = document.body;
    const icon = document.querySelector('#theme-toggle i');
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Load saved theme and start typing animation on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const icon = document.querySelector('#theme-toggle i');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    showSection('home');
    typeWriter(); // Start typing animation
});

// Modal for announcement images
function openModal(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    modalImage.src = imageSrc;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('image-modal').style.display = 'none';
}

document.querySelectorAll('.ann-card').forEach(card => {
    card.addEventListener('click', () => {
        const imageSrc = card.getAttribute('data-image');
        openModal(imageSrc);
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Ensure chapter list items are clickable
document.querySelectorAll('.chapter-list li').forEach(item => {
    item.addEventListener('click', (event) => {
        const sectionId = item.getAttribute('data-section');
        if (sectionId) {
            showSection(sectionId);
        }
    });
});

// Form validation and Formspree submission for contact form
document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const message = document.getElementById('message').value.trim();
    const form = event.target;

    if (name && email && address && message) {
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert('Thank you for contacting us! We will get back to you soon.');
                form.reset();
            } else {
                alert('There was a problem submitting the form. Please try again.');
            }
        } catch (error) {
            alert('Something went wrong. Please check your internet connection and try again.');
        }
    } else {
        alert('Please fill in all required fields.');
    }
});

// Form validation for join form
document.getElementById('join-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('join-name').value.trim();
    const email = document.getElementById('join-email').value.trim();
    const course = document.getElementById('join-course').value;

    if (name && email && course) {
        alert('Join request submitted successfully!');
        event.target.reset();
    } else {
        alert('Please fill in all required fields.');
    }
}); document.getElementById('join-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json'
        }
    });

    if (response.ok) {
        document.getElementById('join-success').style.display = 'block';
        form.reset();
    } else {
        alert('Something went wrong. Please try again later.');
    }
});
