import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  imageLightbox: document.querySelector(".lightbox__image"),
  closeLightboxButton: document.querySelector(".lightbox__button"),
  overlayLightbox: document.querySelector(".lightbox__overlay"),
};
const listImages = galleryItems
  .map(
    (image) => `
<li class="gallery__item">
  <a
    class="gallery__link"
    href="${image.original}"
  >
    <img
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>
</li>
`
  )
  .join("");
refs.gallery.insertAdjacentHTML("beforeend", listImages);

refs.gallery.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.tagName !== "IMG") return;
  refs.lightbox.classList.add("is-open");
  refs.imageLightbox.src = event.target.dataset.source;
  refs.imageLightbox.alt = event.target.alt;
});

refs.closeLightboxButton.addEventListener("click", (event) => {
  refs.lightbox.classList.remove("is-open");
  refs.imageLightbox.src = "";
  refs.imageLightbox.alt = "";
});

refs.overlayLightbox.addEventListener("click", (event) => {
  refs.lightbox.classList.remove("is-open");
  refs.imageLightbox.src = "";
  refs.imageLightbox.alt = "";
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    refs.lightbox.classList.remove("is-open");
    refs.imageLightbox.src = "";
    refs.imageLightbox.alt = "";
  }
});
