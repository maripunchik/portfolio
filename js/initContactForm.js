"use strict";

import createPopup from "./createPopup.js";

export default function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const inputs = form.querySelectorAll("input[required], textarea[required]");

  const popup = createPopup({
    root: "#form-popup",
    message: ".popup__message",
    close: ".popup__close",
    activeClass: "active",
  });

  function validateInputs() {
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("error");
        input.classList.remove("success");
        isValid = false;
      } else {
        input.classList.remove("error");
        input.classList.add("success");
      }
    });

    return isValid;
  }

  async function sendForm() {
    const formData = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    return response.json();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      popup.open("Please fill in all required fields.");

      return;
    }
    status.textContent = "Sending ...";
    status.className = "contact__form-status loading";

    let result;

    try {
      result = await sendForm();
    } catch (err) {
      popup.open("Network error. Try again later.");
      setStatus();

      return;
    }

    if (result.success) {
      popup.open("Message sent successfully!");
      form.reset();
      inputs.forEach((input) => input.classList.remove("success"));
    } else {
      popup.open("Something went wrong. Try again.");
    }

    setStatus();
  });

  const baseStatusClass = "contact__form-status";

  function setStatus(text = "", state = "") {
    status.textContent = text;
    status.className = state ? `${baseStatusClass} ${state}` : baseStatusClass;
  }
}
