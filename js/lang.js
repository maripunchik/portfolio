"use strict";

const defaultLang = "en";

async function loadLang(lang) {
  const res = await fetch(`./locales/${lang}.json`);
  return res.json();
}

function getValue(obj, keys) {
  return keys.reduce((acc, key) => acc?.[key], obj);
}

function applyPlaceholders(text, data) {
  return text.replace(/__(\d+)__/g, (_, num) => {
    const key = "colored" + num;
    return `<span class="about__text about__text--colored">${data[key]}</span>`;
  });
}

function applyTranslations(data, fallbackData) {
  const elements = document.querySelectorAll(
    "[data-i18n], [data-i18n-placeholder], [data-i18n-href]"
  );

  elements.forEach((el) => {
    let key, value;

    if (el.dataset.i18nPlaceholder) {
      key = el.dataset.i18nPlaceholder.split(".");
      value = getValue(data, key) ?? getValue(fallbackData, key);
      el.placeholder = value || "";
      return;
    }

	 if (el.dataset.i18nHref) {
     const hrefKey = el.dataset.i18nHref.split(".");
     const hrefValue =
       getValue(data, hrefKey) ?? getValue(fallbackData, hrefKey);
     el.setAttribute("href", hrefValue);
   }

    if (el.dataset.i18n) {
      key = el.dataset.i18n.split(".");
      value = getValue(data, key) ?? getValue(fallbackData, key);

      const attr = el.dataset.i18nAttr;

      if (attr) {
        el.setAttribute(attr, value || "");
      } else if (el.dataset.i18nHtml === "true") {
        let html = value;

        if (key[0] === "about") {
          html = applyPlaceholders(value, data.about);
        }

        el.innerHTML = html;
      } else {
        el.textContent = value || "";
      }
    }
  });
}

async function changeLang(lang) {
  const data = await loadLang(lang);
  const fallbackData = await loadLang(defaultLang);

  applyTranslations(data, fallbackData);
  localStorage.setItem("lang", lang);
}

function initLangButtons() {
  const langButtons = document.querySelectorAll("[data-lang]");

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      changeLang(lang);
    });
  });
}

export default async function initI18n() {
  const savedLang = localStorage.getItem("lang") || defaultLang;

  await changeLang(savedLang);
  initLangButtons();
}
