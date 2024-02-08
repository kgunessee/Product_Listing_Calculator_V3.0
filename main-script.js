"use strict";
const vat = document.querySelector(".vat-input-box").valueAsNumber / 100 + 1;
const vatAsPercentage = Math.ceil((vat - 1) * 100);
const courierResultInput = document.querySelector(".courier-result");

function setModuleHeight() {
  const costPriceCalcHeight = document
    .querySelector("#cost-price-calc-container")
    .getBoundingClientRect().height;

  const thirdPartyCalcContainer = document.querySelector(
    "#third-party-price-calc-container",
  );

  thirdPartyCalcContainer.style.setProperty(
    "--max-height",
    `${costPriceCalcHeight}px`,
  );

  const toolsContainer = document.querySelector("#tools-container");
  toolsContainer.style.setProperty("--max-height", `${costPriceCalcHeight}px`);
}
setModuleHeight();

//-------------COST PRICE MAIN CALCULATION-------------//
function costPriceCalculate(morePrices, courier) {
  const costInput = document.querySelector("#cost-input").valueAsNumber;
  const packSizeInput = document.querySelector("#pack-size").valueAsNumber;
  const extraChargesInput =
    document.querySelector("#extra-charges").valueAsNumber;

  const total =
    (costInput + morePrices) * vat * packSizeInput +
    extraChargesInput +
    courier.valueAsNumber;
  return total;
}

//----------SHOW MORE PRICES SECTION-------------//
function showMorePrices() {
  const morePricesContainer = document.querySelector(".more-prices-container");
  const showPricesButton = document.querySelector(".more-prices-button");
  showPricesButton.addEventListener("click", () => {
    morePricesContainer.classList.toggle("active");
    if (morePricesContainer.classList.contains("active")) {
      showPricesButton.innerHTML = "Hide Extra Prices";
    } else {
      showPricesButton.innerHTML = "Show Extra Prices";
    }
  });
}
showMorePrices();

function morePrices() {
  const morePrices = document.querySelectorAll(".price");
  const morePricesQuantity = document.querySelectorAll(".quantity");
  let total = 0;
  morePrices.forEach((price, index) => {
    if (price.value == "") {
      price.value = 0;
    }
    total += price.valueAsNumber * morePricesQuantity[index].valueAsNumber;
  });

  //----Adds border and changes background of the more prices button to indicate if there is a price in there more than 0----//
  morePrices.forEach((price) => {
    price.addEventListener("input", () => {
      //Adjusts on more price input change
      const inputList = Array.from(morePrices);
      const isMoreThanZero = inputList.some((e) => {
        return e.valueAsNumber > 0;
      });
      const showPricesButton = document.querySelector(".more-prices-button");
      if (isMoreThanZero) {
        showPricesButton.style.background = "#467599";
      } else {
        showPricesButton.style.background = "rgba(255, 255, 255, 0.1)";
      }
    });
  });
  return total;
}
morePrices();

//----------CALCULATE BUTTON EVENT ON CLICK-------------//
const costPriceCalculateButton = document.querySelector(
  ".cost-price-calc-button",
);
costPriceCalculateButton.addEventListener("click", () => {
  const costPriceDisplayIncVat = document.querySelector(".cost-price-result");
  const costPriceDisplayExVat = document.querySelector(".result-ex-vat");
  const costPrice = costPriceCalculate(morePrices(), courierResultInput);

  costPriceDisplayIncVat.innerHTML = `£${costPrice.toFixed(2)} inc.VAT`;
  costPriceDisplayExVat.innerHTML = `£${calcExVat(costPrice).toFixed(
    2,
  )} excl.VAT`;
});

//--------ADD AND REMOVE MORE PRICES--------//
function addAndRemoveMorePrices() {
  const addButton = document.querySelector(".add-extra-price-button");
  const morePricesContainer = document.querySelector(".more-prices-container");

  addButton.addEventListener("click", () => {
    const newDiv = document.createElement("div");
    newDiv.className = "more-price-block";

    const newPriceInput = document.createElement("input");
    newPriceInput.className = "price";
    newPriceInput.value = "0";
    newPriceInput.type = "number";

    const newQuantityInput = document.createElement("input");
    newQuantityInput.className = "quantity";
    newQuantityInput.value = "1";
    newQuantityInput.type = "number";

    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.innerHTML = "Delete";

    morePricesContainer.appendChild(newDiv);
    newDiv.appendChild(newPriceInput);
    newDiv.appendChild(newQuantityInput);
    newDiv.appendChild(removeButton);

    removeButton.addEventListener("click", () => {
      newDiv.remove();
    });
  });
}
addAndRemoveMorePrices();

function calcExVat(price) {
  return price / (1 + vatAsPercentage / 100);
}

function calcPlusVat(price) {
  return price * vat;
}
