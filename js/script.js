// DATA

// querySelector
const container = document.querySelector(".container");
const items = document.querySelector(".items");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const thumbsContainer = document.querySelector(".thumbs");

// autoplay flag
let autoplay = false;

createDivImg();
createPreview();
setInterval(sliderInterval, 3000);

// image index
let currentIndex = 0;

const imageItem = document.querySelectorAll(".item");
imageItem[currentIndex].classList.add("active");


// addEventListener
prevBtn.addEventListener("click", prevHandle);
nextBtn.addEventListener("click", nextHandle);

container.addEventListener("mouseover", function () {
  autoplay = false;
});

container.addEventListener("mouseout", function () {
  autoplay = true;
});

// FUNCTIONS

// funzione per creare il div che contiene l'immagine
function createDivImg() {
  images.forEach((curImage) => {
    let image = document.createElement("div");
    image.classList.add("item");
    items.appendChild(image);
    image.innerHTML = drawImage(curImage);
  });
}

// funzione per creare la struttura html dell'immagine e i titles
function drawImage(curImage) {
  return `
            <img src="img/${curImage.image}"/>
            <div class="absolute">
                <h3>${curImage.title}</h3>
                <p>${curImage.text}</p>
            </div>
        `;
}

// funzione del prevBtn
function prevHandle() {
  imageItem[currentIndex].classList.remove("active");
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = imageItem.length - 1;
  }
  imageItem[currentIndex].classList.add("active");
}

// funzione del nextBtn
function nextHandle() {
  imageItem[currentIndex].classList.remove("active");
  currentIndex++;
  if (currentIndex >= imageItem.length) {
    currentIndex = 0;
  }
  imageItem[currentIndex].classList.add("active");
}

// funzione dello slider automatico
function sliderInterval() {
  if (autoplay) {
    imageItem[currentIndex].classList.remove("active");
    previewItems[currentIndex].classList.remove("active");
    currentIndex++;
    if (currentIndex >= imageItem.length) {
      currentIndex = 0;
    }
    imageItem[currentIndex].classList.add("active");
    previewItems[currentIndex].classList.add("active");
  }
}

// funzione per creare la parte delle preview
function createPreview() {
  let previewDiv = "";
  images.forEach((image) => {
    previewDiv += `<div class="thumb"><img src="img/${image.image}" alt=""></div>`;
  });
  document.querySelector(".thumbs").innerHTML = previewDiv;
  thumbsContainer.remove();
  items.appendChild(thumbsContainer);
  return previewDiv;
}

const previewItems = document.querySelectorAll(".thumb");
previewItems[currentIndex].classList.add("active");
attachClickHandlers(previewItems);

// funzione per gestire il click sulle preview
function attachClickHandlers(previewItems) {
  for (let i = 0; i < previewItems.length; i++) {
    const preview = previewItems[i];

    preview.addEventListener("click", function () {
      previewItems.forEach((item) => {
        item.classList.remove("active");
      });
      preview.classList.add("active");

      currentIndex = i;
      updateMainImage();
    });
  }
}

// funzione per aggiornare l'immagine principale dopo il click sulla preview
function updateMainImage() {
  document.querySelector(".item.active").classList.remove("active");
  imageItem[currentIndex].classList.add("active");
}
