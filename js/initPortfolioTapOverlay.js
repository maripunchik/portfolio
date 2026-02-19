"use strict";


export default function initPortfolioTapOverlay(){
	if(window.innerWidth >= 509) return

	const items = document.querySelectorAll(".portfolio__item")

	let activeItem=null

	items.forEach(item=>{
		item.addEventListener("click", (e) =>{
			const isTapped =item.classList.contains("--tapped")

			if(activeItem && activeItem !== item) {
				activeItem.classList.remove("--tapped")
			}

			if(!isTapped) {
				e.preventDefault()
				item.classList.add("--tapped")
				activeItem=item
			}else{
				const link = item.querySelector(".portfolio__image-link")
				if(link)window.location.href=link.href
			}
		})
	})
}