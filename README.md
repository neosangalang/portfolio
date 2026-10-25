# Neo B. Sangalang — Digital Portfolio

A complete, modern, minimalist developer portfolio website for **Neo B. Sangalang**, Bachelor of Science in Information Technology (BSIT) student at **STI College Marikina**.

Designed with a high-contrast dark aesthetic (`#080808` background, `#121215` cards), typography-driven layout, accessible semantics, responsive navigation, and zero external script bloat.

---

## 📁 Project Structure

```text
Portfolio/
├── index.html        # Main semantic HTML5 portfolio document
├── index.php         # Optional entry point for Laragon / Apache / PHP servers
├── css/
│   └── style.css     # Design system, CSS variables, dark palette, animations
├── js/
│   └── main.js       # Navigation scrollspy, modal viewer, clipboard copy, dynamic year
├── assets/
│   ├── icons/        # Custom SVG icons
│   └── images/       # Certificate scans & project media placeholders
└── README.md         # Documentation & customization guide
```

---

## 🚀 How to Run the Website

### Option 1: Via Laragon (Recommended for Local Dev)
1. Ensure this folder is located in `c:\laragon\www\Portfolio`.
2. Start Apache in **Laragon**.
3. Open your browser and navigate to:
   - `http://portfolio.test` or `http://localhost/Portfolio`

### Option 2: Via PHP Built-in Server
Open your terminal in this directory and execute:
```bash
php -S localhost:8000
```
Then visit `http://localhost:8000` in your browser.

### Option 3: Direct Browser File (Offline)
Double-click `index.html` to open it in Chrome, Edge, Firefox, or Safari. All styles and scripts work standalone with zero external dependencies.

### Option 4: Deploying to GitHub Pages (Free Hosting)
1. Initialize Git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   ```
2. Create a repository on GitHub (e.g. `portfolio` or `username.github.io`).
3. Push your repository and enable **GitHub Pages** under `Settings > Pages > Deploy from branch (main)`.

---

## ✏️ Customization Guide

### 1. Profile Photo (GitHub Style)
The profile picture is hardcoded to `assets/images/profile.jpg`.
- To set or update your photo, place your picture named `profile.jpg` into the `assets/images/` directory (`c:\laragon\www\Portfolio\assets\images\profile.jpg`).
- If no picture is found, it automatically uses `assets/images/avatar-default.svg`.

### 2. Update Contact Details
Open `index.html` and locate `<!-- SECTION 6: CONTACT -->`:
- **Email:** Update `data-copy-value="your.real.email@gmail.com"` and the display text.
- **GitHub:** Change `href="#placeholder-link"` to `href="https://github.com/your-username"`.
- **LinkedIn:** Change `href="#placeholder-link"` to `href="https://linkedin.com/in/your-profile"`.

### 3. Add New Projects
In `index.html`, locate `<!-- SECTION 4: FEATURED PROJECTS -->`. Duplicate an `<article class="project-card">` block or customize the third placeholder card. You can also edit the detailed technical breakdown in `js/main.js` inside the `projectDetails` object.

### 4. Add Certificate Images
Save your certificate screenshot or PDF image in `assets/images/` (e.g., `assets/images/oracle-java.png`). Then replace the `.cert-preview-box` in `index.html` with:
```html
<img src="assets/images/oracle-java.png" alt="Oracle Java Certificate" class="cert-image">
```

### 5. Edit Internship Availability
In `index.html`, search for `Open to IT Internship Opportunities` in the hero section and navbar to adjust your current availability status whenever needed.

---

## 🛠️ Built With
- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`), ARIA attributes, skip link.
- **Vanilla CSS**: CSS Custom Properties (Design Tokens), Flexbox, CSS Grid, clamped responsive typography, reduced-motion media query.
- **Vanilla JavaScript**: IntersectionObserver for active section highlight & scroll animations, custom modal dialog, clipboard API.
