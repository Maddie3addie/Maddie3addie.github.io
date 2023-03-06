"use strict";

window.addEventListener("load", setupGallery);

function setupGallery() {
    let imageCount = imgFiles.length;
    let galleryBox = document.getElementById("lightbox");
    let currentSlide = 1;
    let runShow = true;
    let showRunning;

    let galleryTitle = document.createElement("h1");
    galleryTitle.id = "galleryTitle";
    galleryTitle.textContent = lightboxTitle;
    galleryBox.appendChild(galleryTitle);

    let slideCounter = document.createElement("div");
    slideCounter.id = "slideCounter";
    slideCounter.textContent = currentSlide + "/" + imageCount;
    galleryBox.appendChild(slideCounter);

    let leftBox = document.createElement("div");
    leftBox.id = "leftBox";
    leftBox.innerHTML = "&#9664;";
    leftBox.onclick = moveToLeft;
    galleryBox.appendChild(leftBox);

    let rightBox = document.createElement("div");
    rightBox.id = "rightBox";
    rightBox.innerHTML = "&#9654;";
    rightBox.onclick = moveToRight;
    galleryBox.appendChild(rightBox);

    let playPause = document.createElement("div");
    playPause.id = "playPause";
    playPause.innerHTML = "&#9199;";
    playPause.onclick = startStopShow;
    galleryBox.appendChild(playPause);

    let slideBox = document.createElement("div");
    slideBox.id = "slideBox";
    galleryBox.appendChild(slideBox);

    let faveImages = document.getElementById("favourite_images");

    for (let i = 0; i < imageCount; i++) {
        let image = document.createElement("img");
        image.src = imgFiles[i];
        image.alt = imgCaptions[i];
        image.onclick = createModal;
        slideBox.appendChild(image);
    }


    function moveToRight() {
        let firstImage = slideBox.firstElementChild.cloneNode("true");
        firstImage.onclick = createModal;
        slideBox.appendChild(firstImage);
        slideBox.removeChild(slideBox.firstElementChild);
        currentSlide++;
        if (currentSlide > imageCount) {
            currentSlide = 1;
        }
        slideCounter.textContent = currentSlide + " / " + imageCount;
    }

    function moveToLeft() {
        let lastImage = slideBox.lastElementChild.cloneNode("true");
        lastImage.onclick = createModal;
        slideBox.removeChild(slideBox.lastElementChild);
        slideBox.insertBefore(lastImage, slideBox.firstElementChild);
        currentSlide--;
        if (currentSlide === 0) {
            currentSlide = imageCount;
        }
        slideCounter.textContent = currentSlide + " / " + imageCount;
    }

    function startStopShow() {
        if (runShow) {
            showRunning = window.setInterval(moveToRight, 2000);
            runShow = false;
        } else {
            window.clearInterval(showRunning);
            runShow = true;
        }
    }

    function createModal() {
        let modalWindow = document.createElement("div");
        modalWindow.id = "lbOverlay";
        let figureBox = document.createElement("figure");
        modalWindow.appendChild(figureBox);

        let modalImage = this.cloneNode("true");
        figureBox.appendChild(modalImage);

        let figureCaption = document.createElement("figcaption");
        figureCaption.textContent = modalImage.alt;
        figureBox.appendChild(figureCaption);

        let favouriteButton = document.createElement("button");
        favouriteButton.id = "faveButton"
        favouriteButton.textContent = "add to favourites";

        favouriteButton.onclick = function () {
            newFavourite();
        }

        figureBox.appendChild(favouriteButton);

        let closeBox = document.createElement("div");
        closeBox.id = "lbOverlayClose";
        closeBox.innerHTML = "&times;";
        closeBox.onclick = function () {
            document.body.removeChild(modalWindow);
        }

        modalWindow.appendChild(closeBox);

        document.body.appendChild(modalWindow);

        function newFavourite() {
            let faveImageCount = faveImages.getElementsByTagName("div").length;
            let currentFaveImages = faveImages.getElementsByTagName("img");

            let newFave = document.createElement("div");

            let currentImg = modalImage.cloneNode(true);
            newFave.appendChild(currentImg);

            let removeButton = document.createElement("button");
            removeButton.id = "removeButton";
            removeButton.textContent = "remove";
            newFave.appendChild(removeButton);

            let skipImg = false;

            if (faveImageCount >= 5) {
                alert("Maximum favourites reached\n" +
                    "Please remove an image to favourite new images. :)")
                skipImg = true;
            }

            for (let i = 0; i < faveImageCount; i++) {
                if (currentImg.alt === currentFaveImages[i].alt) {
                    skipImg = true;
                }
            }

            if (skipImg === true) {
                favouriteButton.textContent = "Image already in favourites"
            } else {
                faveImages.appendChild(newFave);
                favouriteButton.textContent = "image added to favourites"
            }

            removeButton.onclick = function () {
                faveImages.removeChild(newFave)
            }

        }
    }

}
