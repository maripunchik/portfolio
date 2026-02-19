"use strict";

import openTab from "./openTab.js";
import openMenu from "./openMenu.js";
import shrinkHeader from "./shrinkHeader.js";
import initPortfolioReveal from "./initPortfolioReveal.js";
import createWatcher from "./createWatcher.js";
import initPortfolioTapOverlay from "./initPortfolioTapOverlay.js";
import initI18n from "./lang.js";
import initContactForm from "./initContactForm.js";
import initToTop from "./toTopBtn/initToTop.js";

document.addEventListener("DOMContentLoaded", () => {
  initI18n();
  openTab();
  openMenu();
  shrinkHeader();
  initPortfolioReveal();
  initPortfolioTapOverlay();
  initContactForm();
  //  createWatcher(".portfolio");
  createWatcher(
    ".portfolio",
    (entry, section) => {
      section.classList.add("--watcher-view");
    },
    { once: true },
  );

  createWatcher(
    ".hero",
    (entry, section) => {
      section.classList.add("--visible");
    },
    { once: true },
  );

  initToTop();
});

// .then(() => {
//   setTimeout(() => {
//     openTab();
//   }, 0);
// });
