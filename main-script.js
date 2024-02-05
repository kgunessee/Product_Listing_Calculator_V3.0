"use strict";
const vat = document.querySelector(".vat-input-box").valueAsNumber / 100 + 1;
const courierResultInput = document.querySelector(".courier-result");

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
  return total;
}

//----------CALCULATE BUTTON EVENT ON CLICK-------------//
const costPriceCalculateButton = document.querySelector(
  ".cost-price-calc-button",
);
costPriceCalculateButton.addEventListener("click", () => {
  const costPriceDisplayIncVat = document.querySelector(".cost-price-result");
  const costPrice = costPriceCalculate(morePrices(), courierResultInput);
  costPriceDisplayIncVat.innerHTML = `£${costPrice.toFixed(2)}`;
});

//----------SHOW MORE PRICES SECTION-------------//
function showMorePrices() {
  const morePricesContainer = document.querySelector(".more-prices-container");
  const showPricesButton = document.querySelector(".more-prices-button");
  showPricesButton.addEventListener("click", () => {
    morePricesContainer.classList.toggle("active");
  });
}
showMorePrices();
