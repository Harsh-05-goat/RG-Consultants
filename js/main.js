/* ==========================================================================
   RG CONSULTANTS — SHARED SITE BEHAVIOUR
   Included on every page after data.js. Builds the navbar + footer from
   companyInfo so business details only ever need to change in one place,
   plus the small interactions used across pages (scroll reveal, mobile
   menu, navbar shrink, accordions, hours toggle).
========================================================================== */

const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About" },
  { href: "services.html", label: "Services" },
  { href: "resources.html", label: "Resources" },
  { href: "careers.html", label: "Careers" },
  { href: "contact.html", label: "Contact" },
];

function currentPage() {
  const p = location.pathname.split("/").pop() || "index.html";
  return p;
}

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const here = currentPage();
  const links = NAV_LINKS.map(l =>
    `<a href="${l.href}" class="${here === l.href ? "active" : ""}" ${here === l.href ? 'aria-current="page"' : ""}>${l.label}</a>`
  ).join("");

  mount.innerHTML = `
    <div class="nav">
      <a href="index.html" class="brand">
        <span class="brand-mark">RGC</span>
        <span class="brand-text">
          <span class="brand-name" style="display:block;">${companyInfo.displayName}</span>
          <span class="brand-sub">${companyInfo.category}</span>
        </span>
      </a>
      <nav class="links" id="navLinks">
        ${links}
        <a href="book-consultation.html" class="btn btn-outline nav-cta-mobile">Book a Consultation</a>
      </nav>
      <a href="book-consultation.html" class="btn btn-primary nav-cta-desktop">Book a Consultation</a>
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>`;

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
  });
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  const header = document.getElementById("site-header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("shrink", window.scrollY > 40);
  }, { passive: true });
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const serviceLinks = services.map(s => `<li><a href="service-detail.html?service=${s.slug}">${s.title}</a></li>`).join("");
  mount.innerHTML = `
    <div class="wrap">
      <div class="footer-top">
        <div>
          <span class="brand-name" style="font-size:19px;font-weight:600;">${companyInfo.displayName}</span>
          <span style="display:block;font-family:'Fraunces',serif;font-style:italic;font-size:13px;color:var(--on-dark-soft);margin-top:3px;">Rachit Kumar Garg</span>
          <span style="display:block;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--on-dark-soft);margin-top:6px;letter-spacing:0.03em;">${companyInfo.legalNameEn} · <span lang="hi">${companyInfo.legalNameHi}</span></span>
          <p style="margin-top:14px;">${companyInfo.description}</p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>${serviceLinks}</ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href="resources.html?cat=GST">GST Updates</a></li>
            <li><a href="resources.html?cat=Income Tax">Tax Updates</a></li>
            <li><a href="resources.html#calendar">Compliance Calendar</a></li>
            <li><a href="resources.html">Articles &amp; Guides</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="year"></span> ${companyInfo.displayName}. All rights reserved.</span>
        <div class="legal-links">
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms</a>
          <a href="disclaimer.html">Disclaimer</a>
        </div>
      </div>
    </div>`;
  document.getElementById("year").textContent = new Date().getFullYear();
}

function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* Generic accordion: toggles [aria-expanded] on the trigger and .open on
   the panel that follows it (used for FAQs, hours, service detail lists). */
function initAccordions(triggerSelector) {
  document.querySelectorAll(triggerSelector).forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const isOpen = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen);
      const icon = btn.querySelector(".toggle-icon");
      if (icon) icon.textContent = isOpen ? "−" : "+";
    });
  });
}

function initHoursWidget(toggleId, summaryId, iconId) {
  const toggle = document.getElementById(toggleId);
  if (!toggle) return;
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const today = new Date().getDay();
  const todayHours = companyInfo.hours[today];
  document.getElementById(summaryId).textContent = todayHours
    ? `Today (${dayNames[today]}) · ${todayHours}`
    : `Closed today (${dayNames[today]})`;
  toggle.addEventListener("click", () => {
    const panel = toggle.nextElementSibling;
    const isOpen = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
    document.getElementById(iconId).textContent = isOpen ? "−" : "+";
  });
}

function buildHoursGridHTML() {
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return dayNames.map((d, i) => {
    const h = companyInfo.hours[i];
    return `<span>${d}</span><span class="${h ? "" : "closed"}">${h || "Closed"}</span>`;
  }).join("");
}

/* Client-side required-field validation shared by all forms.
   Marks invalid fields, focuses the first one, and returns true/false. */
function validateForm(form) {
  let firstInvalid = null;
  let valid = true;
  form.querySelectorAll("[required]").forEach(input => {
    const fieldWrap = input.closest(".field");
    const isEmpty = input.type === "checkbox" ? !input.checked : !input.value.trim();
    const isBadEmail = input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    const invalid = isEmpty || isBadEmail;
    if (fieldWrap) fieldWrap.classList.toggle("invalid", invalid);
    if (invalid) {
      valid = false;
      if (!firstInvalid) firstInvalid = input;
    }
  });
  if (firstInvalid) firstInvalid.focus();
  return valid;
}

/* Submits a form via fetch to its `action` (Formspree-compatible),
   shows an inline status message, and resets on success. */
function wireFormSubmit(formId, statusId, successMessage) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;
    const status = document.getElementById(statusId);
    const submitBtn = form.querySelector('[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then(res => {
        if (res.ok) {
          if (status) {
            status.textContent = successMessage;
            status.classList.remove("error");
            status.classList.add("ok");
          }
          form.reset();
          form.dispatchEvent(new CustomEvent("rg:submitted"));
        } else {
          throw new Error("Submission failed");
        }
      })
      .catch(() => {
        if (status) {
          status.textContent = "Something went wrong sending your request — please call or email us directly.";
          status.classList.add("ok", "error");
        }
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
  });
}

function renderPersistentCTA() {
  if (document.body.classList.contains("no-sticky-cta")) return;
  const bar = document.createElement("a");
  bar.href = "book-consultation.html";
  bar.id = "stickyCta";
  bar.className = "sticky-cta";
  bar.textContent = "Book a Consultation →";
  document.body.appendChild(bar);

  const reveal = () => bar.classList.toggle("visible", window.scrollY > 500);
  window.addEventListener("scroll", reveal, { passive: true });
  reveal();
}

function qs(name) {
  return new URLSearchParams(location.search).get(name);
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  initReveal();
  renderPersistentCTA();
});
