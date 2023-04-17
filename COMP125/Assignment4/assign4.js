let xhttp = new XMLHttpRequest();

xhttp.onload = function () {
    let text = this.responseText;

    let imageArray = JSON.parse(text)

    for (let i = 0; i < imageArray.length; i++) {

        let flexbox = document.getElementById("flexbox");

        let newCard = document.createElement("div");
        newCard.className = "card"

        let newCardImg = document.createElement("img");
        newCardImg.src = imageArray[i].src;
        newCardImg.alt = imageArray[i].alt;
        newCardImg.className = "cardImg"

        let newCardTitle = document.createElement("div");
        newCardTitle.textContent = imageArray[i].title;
        newCardTitle.className = "cardTitle"

        let newCardPrice = document.createElement("div");
        newCardPrice.textContent = `$${imageArray[i].price}`;
        newCardPrice.className = "cardPrice";

        let newCardDescription = document.createElement("div");
        newCardDescription.textContent = imageArray[i].description;
        newCardDescription.className = "cardDescription";

        newCard.append(newCardImg, newCardTitle, newCardPrice, newCardDescription);


        if (Object.hasOwn(imageArray[i], "actionLabel")) {

            let newCardButton = document.createElement("button");
            newCardButton.textContent = imageArray[i].actionLabel;
            newCardButton.className = "cardButton";
            newCard.append(newCardButton);
        }

        flexbox.append(newCard)
    }
}
xhttp.open("GET", "products.json");
xhttp.send();