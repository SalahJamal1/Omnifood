"use strict";

const close = document.querySelector(".close");
const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
const nav_list = document.querySelector(".nav_list");
const section = document.querySelectorAll("section");

const closeModel = () => {
  nav.classList.remove("nav_mobile");
};
menu.addEventListener("click", () => {
  nav.classList.add("nav_mobile");
});

close.addEventListener("click", closeModel);

document.querySelector("body").addEventListener("keydown", (e) => {
  if (e.code === "Escape") closeModel();
});
const heroObserve = ([e], observe) => {
  if (e.isIntersecting) header.classList.remove("sticky");
  else header.classList.add("sticky");
};

const heroObserves = new IntersectionObserver(heroObserve, {
  root: null,
  threshold: 0.1,
});

heroObserves.observe(hero);

const sectionObserve = ([e], observe) => {
  if (!e.isIntersecting) return;
  e.target.classList.remove("section-hidden");
  observe.unobserve(e.target);
};

const sectionObserves = new IntersectionObserver(sectionObserve, {
  root: null,
  threshold: 0,
});

const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

section.forEach((el) => {
  if (el.classList.contains("hero") || el.classList.contains("featured"))
    return;
  sectionObserves.observe(el);

  el.classList.add("section-hidden");
  if (isInViewport(el)) {
    el.classList.remove("section-hidden");
    sectionObserves.unobserve(el);
  }
});

nav_list.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav_link")) {
    const id = e.target.getAttribute("href");
    const targetEl = document.querySelector(id);
    const offest =
      targetEl.getBoundingClientRect().top + window.pageYOffset + -70;
    window.scrollTo({
      top: offest,
      behavior: "smooth",
    });
  }
});
