window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 500);
    }
});

window.addEventListener('scroll', function() {
    var progressBar = document.getElementById('progressBar');
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = (scrollTop / scrollHeight) * 100;
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }

    var header = document.getElementById('header');
    if (header) {
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    var current = '';
    sections.forEach(function(section) {
        var sectionTop = section.offsetTop - 150;
        var sectionHeight = section.offsetHeight;
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

var menuToggle = document.getElementById('menuToggle');
var mobileMenu = document.getElementById('mobileMenu');
var mobileOverlay = document.getElementById('mobileOverlay');
var menuClose = document.getElementById('menuClose');

function openMenu() {
    if (mobileMenu) mobileMenu.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (menuToggle) menuToggle.addEventListener('click', openMenu);
if (menuClose) menuClose.addEventListener('click', closeMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

var mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
});

var faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    question.addEventListener('click', function() {
        var isActive = item.classList.contains('active');
        faqItems.forEach(function(otherItem) {
            otherItem.classList.remove('active');
            var otherAnswer = otherItem.querySelector('.faq-answer');
            otherAnswer.style.maxHeight = null;
        });
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

var observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

var animElements = document.querySelectorAll('.service-card, .blog-card, .gallery-item, .why-card, .stat-item, .contact-card, .faq-item');
animElements.forEach(function(el) {
    el.classList.add('fade-up');
    observer.observe(el);
});

var statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(function(stat) {
                var target = parseInt(stat.getAttribute('data-target'));
                var current = 0;
                var increment = target / 60;
                var timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current).toLocaleString('ar-EG');
                }, 25);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

var statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        var target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            var offset = 80;
            var targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
