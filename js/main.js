/**
 * Neo B. Sangalang - Portfolio JavaScript
 * Modern, Minimalist, Accessible, Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('is-open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // 3. Active Navigation Section Observer (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));
  }

  // 4. Subtle Scroll Reveal Animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.fade-in-element');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // If reduced motion is requested or IntersectionObserver not supported, reveal immediately
    document.querySelectorAll('.fade-in-element').forEach(el => el.classList.add('is-revealed'));
  }

  // 5. Toast Notification System
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  function showToast(message, duration = 3000) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('is-visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, duration);
  }

  // 6. Copy to Clipboard Utility
  const copyButtons = document.querySelectorAll('[data-copy-target]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-copy-target');
      const targetElement = document.getElementById(targetId);
      const textToCopy = targetElement ? (targetElement.getAttribute('data-copy-value') || targetElement.textContent.trim()) : '';

      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for non-https or older environments
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToast(`Copied to clipboard: ${textToCopy}`);
      } catch (err) {
        showToast('Unable to copy automatically.');
      }
    });
  });

  // 7. Interactive Project Details Modal
  const projectDetails = {
    'iep-system': {
      title: 'AI-Assisted IEP Management System',
      kicker: 'Academic Capstone Project • Web Application',
      status: 'In Development',
      role: 'Programmer / Developer',
      overview: 'An academic capstone project focused on a web-based system for managing and generating Individualized Education Plans (IEPs). Designed to assist educators by streamlining special education documentation with AI-assisted goal generation, standardized documentation, progress tracking, and parent-teacher communication.',
      confidentialityNotice: 'Notice: As an academic capstone, no confidential student data, live school credentials, or proprietary documents are published here.',
      architecture: [
        'Backend: Laravel MVC framework providing structured routing, authentication, and controllers.',
        'Frontend: Blade templating combined with Tailwind CSS for clean, responsive user interfaces.',
        'Database: Relational MySQL schema modeled for student profiles, goal rubrics, and evaluation timelines.',
        'AI Integration: Planned API pipeline for drafting curriculum-aligned IEP goals and benchmarks based on teacher input.'
      ],
      responsibilities: [
        'Developing core CRUD modules for student records and IEP document templates.',
        'Designing relational database tables ensuring data integrity and referral workflows.',
        'Implementing clean, accessible Blade views adhering to modern UI standards.'
      ],
      techStack: ['Laravel', 'PHP', 'Blade', 'Tailwind CSS', 'MySQL', 'Git']
    },
    'samurai-game': {
      title: '2D Samurai Platformer Game',
      kicker: 'Academic Project • Game Development',
      status: 'Academic Project',
      role: 'Game Developer',
      overview: 'A Unity-based 2D platformer inspired by traditional Japanese environments, samurai lore, and yokai mythology. The project centers on tight player controls, atmospheric visual pacing, enemy interaction loops, and responsive platforming physics.',
      confidentialityNotice: 'Notice: Created as part of academic coursework demonstrating game programming and physics systems.',
      architecture: [
        'Game Engine: Unity with C# component scripting for player locomotion and combat states.',
        'Physics & Movement: Custom 2D kinematic controller with ground checks, wall-slide, and jump buffers.',
        'Enemy Systems: State-machine-based AI for patrolled behaviors, vision cones, and attack triggers.',
        'Environment: Tilemap-based level layout with parallax background layers and ambient sound triggers.'
      ],
      responsibilities: [
        'Scripting player movement mechanics, jump curves, and sword strike hitboxes in C#.',
        'Designing tilemap levels, obstacle sequences, and environmental hazard triggers.',
        'Configuring sprite animation states and transitions within Unity Animator.'
      ],
      techStack: ['Unity', 'C#', '2D Physics', 'Tilemaps', 'Animation Controller']
    },
    'placeholder-project': {
      title: 'Your Next Project',
      kicker: 'Editable Project Template',
      status: 'Ready for customization',
      role: 'Your Role (e.g. Full-Stack Developer)',
      overview: 'This is an editable project card slot. When you build your next project—such as a React/Vue web application, a full-stack REST API, or an academic software solution—you can replace this placeholder with real project details, live deployment URLs, and GitHub repository links.',
      confidentialityNotice: 'Tip: Clearly state whether the project is an academic submission, a personal side project, or a production release.',
      architecture: [
        'Step 1: Open index.html in your code editor.',
        'Step 2: Locate the third project card in the #projects section.',
        'Step 3: Update the title, description, technology tags, and links.',
        'Step 4: Update the corresponding project details in js/main.js if using the modal.'
      ],
      responsibilities: [
        'Documenting architecture and database schema.',
        'Showcasing clean code practices, Git commit hygiene, and test cases.',
        'Providing a live demonstration link or video walkthrough.'
      ],
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Your Framework', 'Database']
    }
  };

  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalKicker = document.getElementById('modal-kicker');
  const modalOverview = document.getElementById('modal-overview');
  const modalNotice = document.getElementById('modal-notice');
  const modalArchList = document.getElementById('modal-architecture-list');
  const modalRespList = document.getElementById('modal-responsibilities-list');
  const modalTags = document.getElementById('modal-tags');
  let lastActiveElement = null;

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modalBackdrop) return;

    lastActiveElement = document.activeElement;

    // Populate data
    modalTitle.textContent = data.title;
    modalKicker.textContent = data.kicker;
    modalOverview.textContent = data.overview;

    if (modalNotice) {
      if (data.confidentialityNotice) {
        modalNotice.textContent = data.confidentialityNotice;
        modalNotice.style.display = 'block';
      } else {
        modalNotice.style.display = 'none';
      }
    }

    // Architecture list
    modalArchList.innerHTML = '';
    data.architecture.forEach(item => {
      const li = document.createElement('li');
      li.className = 'modal-list-item';
      li.innerHTML = `<span class="modal-list-bullet">›</span><span>${item}</span>`;
      modalArchList.appendChild(li);
    });

    // Responsibilities list
    modalRespList.innerHTML = '';
    data.responsibilities.forEach(item => {
      const li = document.createElement('li');
      li.className = 'modal-list-item';
      li.innerHTML = `<span class="modal-list-bullet">›</span><span>${item}</span>`;
      modalRespList.appendChild(li);
    });

    // Tech tags
    modalTags.innerHTML = '';
    data.techStack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tech;
      modalTags.appendChild(span);
    });

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Set focus to close button for accessibility
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  // Open modal buttons
  const detailButtons = document.querySelectorAll('[data-project-id]');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      openProjectModal(projectId);
    });
  });

  // Close modal button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  // Close modal on backdrop click
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('is-open')) {
      closeProjectModal();
    }
  });

  // 7b. Certificate Lightbox Modal
  const certModal = document.getElementById('cert-modal');
  const certModalCloseBtn = document.getElementById('cert-modal-close-btn');
  const certModalOkBtn = document.getElementById('cert-modal-ok-btn');
  const certPreviewTrigger = document.getElementById('open-cert-preview');
  const btnViewCert = document.getElementById('btn-view-cert');
  let certLastActiveElement = null;

  function openCertModal() {
    if (!certModal) return;
    certLastActiveElement = document.activeElement;
    certModal.classList.add('is-open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (certModalCloseBtn) certModalCloseBtn.focus();
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('is-open');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (certLastActiveElement) certLastActiveElement.focus();
  }

  if (certPreviewTrigger) {
    certPreviewTrigger.addEventListener('click', openCertModal);
    certPreviewTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCertModal();
      }
    });
  }

  if (btnViewCert) {
    btnViewCert.addEventListener('click', (e) => {
      e.preventDefault();
      openCertModal();
    });
  }

  if (certModalCloseBtn) {
    certModalCloseBtn.addEventListener('click', closeCertModal);
  }

  if (certModalOkBtn) {
    certModalOkBtn.addEventListener('click', closeCertModal);
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeCertModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('is-open')) {
      closeCertModal();
    }
  });

  // 8. Informative alert for placeholder links
  const placeholderLinks = document.querySelectorAll('a[href="#placeholder-link"]');
  placeholderLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Placeholder link: Replace href with your actual repository or deployment URL in index.html');
    });
  });

  // 10. Profile Photo Initialization (Hardcoded with local storage session fallback)
  const profileImg = document.getElementById('profile-img');
  if (profileImg) {
    const savedPhoto = localStorage.getItem('neo_portfolio_profile_photo');
    if (savedPhoto) {
      profileImg.src = savedPhoto;
    }
  }
});
