"use strict";

//----------------------------------------GLOBAL----------------------------------------------//
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
//----------------------------------------COST PRICE CALCULATOR SECTION----------------------------------------------//
//-------------COST PRICE MAIN CALCULATION-------------//
function costPriceCalculate(morePrices, courier) {
  const costInput = document.querySelector("#cost-input").valueAsNumber;
  const packSizeInput = document.querySelector("#pack-size").valueAsNumber;
  const extraChargesInput =
    document.querySelector("#extra-charges").valueAsNumber;

  // const total =

  return (
    (costInput + morePrices) * vat * packSizeInput +
    extraChargesInput +
    courier.valueAsNumber
  );
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

//----------CLICK EVENT FOR COST PRICE CALCULATOR BUTTON-------------//
const costPriceCalculateButton = document.querySelector(
  ".cost-price-calc-button",
);
costPriceCalculateButton.addEventListener("click", () => {
  const costPriceDisplayIncVat = document.querySelector(".cost-price-result");
  const costPriceDisplayExVat = document.querySelector(".result-ex-vat");
  const costPrice = costPriceCalculate(morePrices(), courierResultInput);

  costPriceDisplayIncVat.innerHTML = `Total cost price = £${costPrice.toFixed(
    2,
  )}`;
  costPriceDisplayExVat.innerHTML = `£${calcExVat(costPrice).toFixed(
    2,
  )} excl. VAT`;
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

//----------------------------------------TOOLS SECTION----------------------------------------------//
//--------CALCULATE EX VAT PRICE--------//
function calcExVat(price) {
  return price / (1 + vatAsPercentage / 100);
}
//--------CALCULATE INC VAT PRICE--------//
function calcPlusVat(price) {
  return price * vat;
}

//--------CALCULATE AND DISPLAY THE PERCENTAGE CALCULATOR RESULTS--------//
function percentCalculator() {
  const priceInput = document.querySelector("#perc-price-input").valueAsNumber;
  const percentInput = document.querySelector("#perc-input").valueAsNumber;

  const plusPercent = (priceInput * percentInput) / 100 + 1;
  const minusPercent = priceInput / (percentInput / 100 + 1);
  const percentDiff = (percentInput * priceInput) / 100;

  const resultBlocks = document.querySelectorAll(
    "#percentage-calc-container .tools-result",
  );
  resultBlocks[0].innerHTML = `${percentInput}% of £${priceInput.toFixed(
    2,
  )} = £${percentDiff.toFixed(2)}`;

  resultBlocks[1].innerHTML = `£${priceInput.toFixed(
    2,
  )} + ${percentInput}% = £${plusPercent.toFixed(2)}`;

  resultBlocks[2].innerHTML = `£${priceInput.toFixed(
    2,
  )} - ${percentInput}% = £${minusPercent.toFixed(2)}`;

  resultBlocks.forEach((e) => (e.style.opacity = "1"));
}

//--------FUNCTION FOR THE CALCULATE PERCENTAGE BUTTON--------//
function calculatePercent() {
  const percentInputBox = Array.from(document.querySelectorAll(".perc-input"));

  //If there is one or no input boxes filled, do not execute function.
  const noInput = percentInputBox.some((e) => {
    return e.value == "";
  });

  if (!noInput) {
    percentCalculator();
  }
}

//--------FUNCTION FOR THE CALCULATE VAT BUTTON--------//
function calculateVat() {
  const resultBlocks = document.querySelectorAll(
    "#vat-calc-container .tools-result",
  );
  const vatInputBox = document.querySelector("#vat-price-input").valueAsNumber;

  //If there is one or no input boxes filled, do not execute function.
  if (vatInputBox) {
    resultBlocks[0].innerHTML = `Ex. VAT = £${calcExVat(vatInputBox).toFixed(
      2,
    )}`;
    resultBlocks[1].innerHTML = `Inc. VAT = £${calcPlusVat(vatInputBox).toFixed(
      2,
    )}`;
    resultBlocks.forEach((e) => (e.style.opacity = "1"));
  }
}

//--------CLICK EVENTS FOR THE TOOLS CALCULATE BUTTONS--------//
const percentCalcButton = document.querySelector(".percent-calc-button");
const vatCalcButton = document.querySelector(".vat-calc-button");
percentCalcButton.addEventListener("click", calculatePercent);
vatCalcButton.addEventListener("click", calculateVat);

//----------------------------------------THIRD PARTY CALCULATOR SECTION----------------------------------------------//

//--------FUNCTION TO CALCULATE THE THIRD PARTY FEE VALUE--------//
function thirdPartyFees(price) {
  const thirdPartyFeeInput = document.querySelector("#category-fee");

  if (!thirdPartyFeeInput.value) {
    thirdPartyFeeInput.valueAsNumber = 0;
  }
  return (price * thirdPartyFeeInput.valueAsNumber) / 100;
}
//--------FUNCTION TO CALCULATE THE PROMO FEE VALUE--------//
function promoFees(price) {
  const promoFeeInput = document.querySelector("#promo");

  if (!promoFeeInput.value) {
    promoFeeInput.valueAsNumber = 0;
  }

  return (price * promoFeeInput.valueAsNumber) / 100;
}

// --------FUNCTION TO CALCULATE THE THIRD PARTY TOTAL EARNINGS--------//
function calculateThirdPartyEarnings() {
  const thirdPartyCostInput =
    document.querySelector("#third-party-input").valueAsNumber;
  const feeVatButton = document.querySelector(".fee-vat-button");
  const trsDiscountButton = document.querySelector(".trs-discount-button");

  const thirdPartyFeeValue = thirdPartyFees(thirdPartyCostInput);
  const promoFeeValue = promoFees(thirdPartyCostInput);
  const finalValueFee =
    document.querySelector("#final-value-fee").valueAsNumber;

  const priceBreakdownBoxes = document.querySelectorAll(".price-breakdown-box");

  //--Function to return the cat fee with TRS discount--//
  function topRatedSeller(price) {
    const trsValueInput =
      document.querySelector(".trs-input-box").valueAsNumber / 100;
    const percentValue = price * trsValueInput;
    return price - percentValue;
  }
  let categoryFee = topRatedSeller(thirdPartyFeeValue);

  if (!trsDiscountButton.classList.contains("active")) {
    categoryFee = thirdPartyFeeValue;
  }

  let thirdPartyVat; // A copy of the VAT variable that can be mutated.
  if (!feeVatButton.classList.contains("active")) {
    thirdPartyVat = 1;
    priceBreakdownBoxes[0].innerHTML = categoryFee.toFixed(2);
    priceBreakdownBoxes[1].innerHTML = promoFeeValue.toFixed(2);
    priceBreakdownBoxes[2].innerHTML = finalValueFee.toFixed(2);
    priceBreakdownBoxes[3].innerHTML = (
      categoryFee +
      promoFeeValue +
      finalValueFee
    ).toFixed(2);
  } else {
    thirdPartyVat = vat;
    priceBreakdownBoxes[0].innerHTML = (categoryFee * thirdPartyVat).toFixed(2);
    priceBreakdownBoxes[1].innerHTML = (promoFeeValue * thirdPartyVat).toFixed(
      2,
    );
    priceBreakdownBoxes[2].innerHTML = (finalValueFee * thirdPartyVat).toFixed(
      2,
    );
    priceBreakdownBoxes[3].innerHTML = (
      (categoryFee + promoFeeValue + finalValueFee) *
      thirdPartyVat
    ).toFixed(2);
  }

  const totalFeesValue =
    (categoryFee + promoFeeValue + finalValueFee) * thirdPartyVat;
  const total = thirdPartyCostInput - totalFeesValue;
  const thirdPartyResultDisplay = document.querySelector(
    ".third-party-earnings-result",
  );

  thirdPartyResultDisplay.innerHTML = `Third Party Earnings = £${total.toFixed(
    2,
  )}`;

  const totalDifferenceDisplay = document.querySelector("#results-info");
  const totalDifferenceValue =
    total - costPriceCalculate(morePrices(), courierResultInput);

  if (totalDifferenceValue < 0) {
    totalDifferenceDisplay.innerHTML = `There is a negative difference of -£${totalDifferenceValue.toFixed(
      2,
    )}`;
    totalDifferenceDisplay.style.background = "rgb(218,86,86)";
    totalDifferenceDisplay.style.opacity = "1";
  } else {
    totalDifferenceDisplay.innerHTML = `There is a positive difference of £${totalDifferenceValue.toFixed(
      2,
    )}`;
    totalDifferenceDisplay.style.background = "rgb(65,208,77)";
    totalDifferenceDisplay.style.opacity = "1";
  }
  console.log(totalDifferenceValue);
  // totalDifferenceDisplay.innerHTML = totalDifferenceValue;
}

//--------TOGGLES THE THIRD PARTY OPTION BUTTONS ACTIVE OR NOT-------//
function thirdPartyOptionButton() {
  const button = document.querySelectorAll(".third-party-option-btn");
  button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.classList.toggle("active");
    });
  });
}
thirdPartyOptionButton();

const thirdPartyCalculateButton = document.querySelector(
  ".third-party-calculate-btn",
);
thirdPartyCalculateButton.addEventListener(
  "click",
  calculateThirdPartyEarnings,
);

//----------------------------------------PRESETS SECTION----------------------------------------------//
function presets() {
  const feeVatButton = document.querySelector(".fee-vat-button");
  const trsDiscountButton = document.querySelector(".trs-discount-button");
  const finalValueFee = document.querySelector("#final-value-fee");
  const thirdPartyFeeInput = document.querySelector("#category-fee");
  const presetButtons = document.querySelectorAll("#presets button");

  presetButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.classList.contains("sw-preset")) {
        feeVatButton.classList.add("active");
        trsDiscountButton.classList.remove("active");
        finalValueFee.value = 0.05;
        thirdPartyFeeInput.value = 10.9;
      } else if (e.target.classList.contains("inta-ebay-preset")) {
        feeVatButton.classList.add("active");
        trsDiscountButton.classList.add("active");
        finalValueFee.value = 0.3;
        thirdPartyFeeInput.value = 10.9;
      } else if (e.target.classList.contains("amz-preset")) {
        feeVatButton.classList.remove("active");
        trsDiscountButton.classList.remove("active");
        finalValueFee.value = 0;
        thirdPartyFeeInput.value = 15;
      } else {
        feeVatButton.classList.remove("active");
        trsDiscountButton.classList.remove("active");
        finalValueFee.value = 0;
        thirdPartyFeeInput.value = 0;
      }
    });
  });
}
presets();
