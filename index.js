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
    (image, ind) => `
<li class="gallery__item">
  <a
    class="gallery__link"
    href="${image.original}"
  >
    <img
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      data-ind="${ind}"
      alt="${image.description}"
    />
  </a>
</li>
`
  )
  .join("");
refs.gallery.insertAdjacentHTML("beforeend", listImages);

let indexImg = 0;

refs.gallery.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.tagName !== "IMG") return;
  openLightbox(event);
  indexImg = +event.target.dataset.ind;
});

refs.closeLightboxButton.addEventListener("click", closeLightbox);

refs.overlayLightbox.addEventListener("click", closeLightbox);

window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    closeLightbox(event);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    indexImg += 1;
    if (indexImg > galleryItems.length - 1) {
      indexImg = 0;
    }
  }
  if (event.code === "ArrowLeft") {
    indexImg -= 1;
    if (indexImg < 0) {
      indexImg = galleryItems.length - 1;
    }
  }
  updateImg(
    galleryItems[indexImg].original,
    galleryItems[indexImg].description
  );
});

function closeLightbox(event) {
  refs.lightbox.classList.remove("is-open");
  updateImg();
}

function updateImg(src = "", alt = "") {
  refs.imageLightbox.src = src;
  refs.imageLightbox.alt = alt;
}

function openLightbox(event) {
  refs.lightbox.classList.add("is-open");
  updateImg(event.target.dataset.source, event.target.alt);
}
