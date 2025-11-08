// Cosmic Background Animation
const canvas = document.getElementById('cosmic-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create stars
const stars = [];
for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random(),
    });
}

function animateStars() {
    ctx.fillStyle = 'rgba(11, 14, 26, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }

        star.opacity = Math.sin(Date.now() * 0.001 + star.x) * 0.5 + 0.5;

        ctx.fillStyle = `rgba(0, 217, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}

animateStars();

// Typewriter Effect
const typewriterText = "I don't follow trends. I launch them.";
let typewriterIndex = 0;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    if (typewriterIndex < typewriterText.length) {
        typewriterElement.textContent = typewriterText.slice(0, typewriterIndex + 1) + '|';
        typewriterIndex++;
        setTimeout(typeWriter, 50);
    } else {
        typewriterElement.textContent = typewriterText;
    }
}

setTimeout(typeWriter, 500);

// Smooth Scroll
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Sidebar Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (!this.classList.contains('dropdown')) {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Dropdown Toggle
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = this.closest('.dropdown');
        const isActive = dropdown.classList.contains('active');
        
        // Close all dropdowns
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        
        // Toggle current
        if (!isActive) {
            dropdown.classList.add('active');
        }
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }
});

// Flip Cards
function flipCard(card) {
    card.classList.toggle('flipped');
}


//Project section bars
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress-bar span");

  // Detect when the project section is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const target = bar.getAttribute("data-percent");
          let width = 0;
          const animate = setInterval(() => {
            if (width >= target) {
              clearInterval(animate);
            } else {
              width++;
              bar.style.width = width + "%";
            }
          }, 15); // speed of animation
        });
        observer.disconnect(); // run only once
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.querySelector(".projects-section"));
});

// Blog Filters
function filterBlog(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.blog-card');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

//Testimonials
const testimonials = [
  {
    quote: "Allamano transformed our entire digital presence. The UI/UX redesign resulted in a 340% increase in user engagement. Absolutely phenomenal work.",
    name: "Ashlene Chumilah",
    role: "CEO, TechVision Inc",
    avatar: "Ashlene.jpg",
    metric: "+340%"
  },
  {
    quote: "Working with Allamano was a game-changer. The React framework he built cut our development time in half while improving code quality.",
    name: "Marcellas Indeje",
    role: "CTO, CloudScale",
    avatar: "Dan.jpg",
    metric: "50% faster"
  },
  {
    quote: "Allamano's 3D work is nothing short of extraordinary. He brought our vision to life in ways we never imagined possible.",
    name: "Joseph Gitari",
    role: "Creative Director, Pixel Studios",
    avatar: "jose.jpg",
    metric: "2M+ views"
  },
  {
    quote: "From concept to launch in record time. Allamano understood our vision and delivered beyond expectations. A true professional.",
    name: "Kyle Bradley",
    role: "AI Manager",
    avatar: "Kyle.jpg",
    metric: "3 weeks"
  }
];

function showTestimonial(index) {
  const t = testimonials[index];

  // Update main testimonial data
  document.getElementById('activeQuote').textContent = t.quote;
  document.getElementById('authorName').textContent = t.name;
  document.getElementById('authorRole').textContent = t.role;
  document.getElementById('metricValue').textContent = t.metric;

  // ✅ Correct way to update avatar image
  document.getElementById('activeAvatar').setAttribute('src', t.avatar);
  document.getElementById('activeAvatar').setAttribute('alt', t.name);

  // Toggle active state
  document.querySelectorAll('.testimonial-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

// Initialize first testimonial
showTestimonial(0);


// Contact Form
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  
  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    alert('✅ Message Sent To Allamano Successfully! Have a nice day');
    form.reset();
  } else {
    alert('❌ There was an error sending your message. Please try again.');
  }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Active Section Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-item[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

console.log('🚀 Allamano Kinyahwe Portfolio Loaded - Built with cosmic energy ✨');

