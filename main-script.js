"use strict";
const vat = document.querySelector(".vat-input-box").valueAsNumber / 100 + 1;

function costPriceCalculate(morePrices) {
  const costInput = document.querySelector("#cost-input").valueAsNumber;
  const packSizeInput = document.querySelector("#pack-size").valueAsNumber;
  const extraChargesInput =
    document.querySelector("#extra-charges").valueAsNumber;

  console.log(
    (costInput + morePrices) * vat * packSizeInput + extraChargesInput,
  );
  return (costInput + morePrices) * vat * packSizeInput + extraChargesInput;
}

const costPriceCalculateButton = document.querySelector(
  ".cost-price-calc-button",
);

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

costPriceCalculateButton.addEventListener("click", () => {
  const costPriceDisplayIncVat = document.querySelector(".cost-price-result");
  const costPrice = costPriceCalculate(morePrices());
  costPriceDisplayIncVat.innerHTML = `£${costPrice.toFixed(2)}`;
});
