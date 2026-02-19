"use strict";

import { overlayController } from "./overlayController.js";

export default function openMenu() {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("sidemenu");

  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.classList.toggle("active");
    document.body.classList.toggle("menu-open", isOpen);

    if (isOpen) {
      overlayController.open("menu");
    } else {
      overlayController.close();
    }


  });

  overlay.addEventListener("click", () => {
    if (!menu.classList.contains("open")) return;

    menu.classList.remove("open");
    burger.classList.remove("active");
    document.body.classList.remove("menu-open");

	overlayController.close()
  });
}
