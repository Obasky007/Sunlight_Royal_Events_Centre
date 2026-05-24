
lucide.createIcons();

const galleryVideos = document.querySelectorAll('.gallery-video-item');
galleryVideos.forEach((item) => {
    const video = item.querySelector('video');
    if (!video) return;

    item.addEventListener('mouseenter', () => {
        video.play().catch(() => { });
    });

    item.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
    lastScroll = currentScroll;
});

const menuBtn = document.getElementById('menuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});


const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightboxVideo');

function openLightbox(el) {
    const video = el.querySelector('video');
    if (video) {
        const src = video.currentSrc || video.src;
        lightboxVideo.src = src;
        lightboxVideo.load();
        lightboxVideo.play().catch(() => { });
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox(e) {
    if (e.target === lightbox || e.currentTarget.tagName === 'BUTTON') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.currentTime = 0;
            lightboxVideo.src = '';
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-dark-600 border-gold-400/30' : 'bg-red-900/80 border-red-400/30';
    toast.className = `toast-in pointer-events-auto ${bgColor} border rounded-xl px-6 py-3 text-sm text-white font-medium shadow-2xl backdrop-blur-xl flex items-center gap-2`;
    const icon = type === 'success' ? '✓' : '✕';
    toast.innerHTML = `<span class="text-gold-400 font-bold">${icon}</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('toast-in');
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}


const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const eventType = document.getElementById('formEventType').value;
    const date = document.getElementById('formDate').value;

    if (!name || !phone || !eventType || !date) {
        showToast('Please fill in all fields.', 'error');
        return;
    }

    const dateObj = new Date(date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-NG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const message = `Hello Sunlight Royal Event Centre!\n\n` +
        `I'd like to enquire about booking your venue:\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Event Type: ${eventType}\n` +
        `Date: ${formattedDate}\n\n` +
        `Please let me know if this date is available. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const waURL = `https://wa.me/2349031122882?text=${encodedMessage}`;

    showToast('Opening WhatsApp with your enquiry...', 'success');

    setTimeout(() => {
        window.open(waURL, '_blank');
    }, 800);

    bookingForm.reset();
});


const dateInput = document.getElementById('formDate');
const today = new Date();
const minDate = today.toISOString().split('T')[0];
dateInput.setAttribute('min', minDate);

const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        const offset = window.scrollY * 0.3;
        heroBg.style.transform = `translateY(${offset}px)`;
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

