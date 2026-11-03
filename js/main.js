// Mobile menu
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");
if (nav && toggle) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", false);
    })
  );
}

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// Custom cursor: pink arrow, grows into a VIEW diamond over project cards
const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (fine && !reduce) {
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  cursor.innerHTML = "<span>VIEW</span>";
  cursor.setAttribute("aria-hidden", "true");
  document.body.append(cursor);
  document.body.classList.add("has-cursor");
  window.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  document.querySelectorAll("[data-view]").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-view"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-view"));
  });
}
