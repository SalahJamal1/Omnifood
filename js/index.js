"use strict";

const nav = document.querySelector(".nav");
const section1 = document.querySelector(".section-1");
const section = document.querySelectorAll(".section");
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".form");
const Openform = document.querySelector(".btn-form");
const closeform = document.querySelector(".close-form");
const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const nav_list = document.querySelector(".nav_list");
const header = document.querySelector(".header");

///////////////////////
function sectionObserve([e], observe) {
  if (e.isIntersecting) header.classList.remove("lazy");
  else if (form.classList.contains("hidden")) {
    header.classList.add("lazy");
  }
  //   observe.unobserve(e.target);
}
const sectionInObserve = new IntersectionObserver(sectionObserve, {
  threshold: 0.15,
  root: null,
});

sectionInObserve.observe(section1);

function sectionsObserve(entries, observe) {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;

    e.target.classList.remove("section-hidden");
    observe.unobserve(e.target);
  });
}
const sectionsInObserve = new IntersectionObserver(sectionsObserve, {
  threshold: 0.15,
  root: null,
});

section.forEach((el) => {
  sectionsInObserve.observe(el);
  el.classList.add("section-hidden");
});

Openform.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  form.classList.remove("hidden");
});
closeform.addEventListener("click", () => {
  if (!header.classList.contains("nav_open")) {
    overlay.classList.add("hidden");
  }
  form.classList.add("hidden");
});

menu.addEventListener("click", () => {
  header.classList.add("nav_open");
  overlay.classList.remove("hidden");
});
close.addEventListener("click", () => {
  header.classList.remove("nav_open");
  overlay.classList.add("hidden");
});
