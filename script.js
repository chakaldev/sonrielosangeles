/* ── Menú móvil ── */
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ── Sombra en header al hacer scroll ── */
const header = document.getElementById("site-header");
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });
}

/* ── Nav activo por sección visible ── */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".site-menu a[href^='#']");

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const matches = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", matches);
          });
        }
      });
    },
    { threshold: 0.35 }
  );
  sections.forEach((s) => sectionObserver.observe(s));
}

/* ── Animaciones fade-in al scroll ── */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -36px 0px" }
);

document.querySelectorAll(".fade-in").forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) =>
    c.classList.contains("fade-in")
  );
  el.style.animationDelay = `${siblings.indexOf(el) * 0.08}s`;
  fadeObserver.observe(el);
});
