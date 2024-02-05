const courierPrices = {
  royalMail: {
    "Royal Mail Tracked 48 Parcel": 2.75,
    "Royal Mail Tracked 24 Parcel": 3.45,
    "Royal Mail Tracked 48 Large Letter": 1.97,
    "Royal Mail Tracked 24 Large Letter": 2.21,
    "Royal Mail Standard 48 Large Letter (0-135g)": 1,
    "Royal Mail Standard 48 Large Letter (136-250g)": 1.35,
    "Royal Mail Standard 48 Large Letter (251-500g)": 1.6,
    "Royal Mail Standard 48 Large Letter (501-700g)": 2.05,
    "Royal Mail Standard 24 Large Letter (0-135g)": 1.3,
    "Royal Mail Standard 24 Large Letter (136-250g)": 1.8,
    "Royal Mail Standard 24 Large Letter (251-500g)": 1.95,
    "Royal Mail Standard 24 Large Letter (501-700g)": 2.55,
    "Royal Mail 2nd Class Letter": 0.77,
  },

  evri: {
    "Evri 48 Package (0-2kg)": 2.35,
    "Evri 24 Package (0-2kg)": 2.65,
    "Evri 48 Parcel (2kg+)": 2.51,
    "Evri 24 Parcel (2kg+)": 3.0,
  },

  parcelforce: {
    "Parcelforce Collection Charge": 8.9,
    "Parcelforce Pre-9am": 12.72,
    "Parcelforce Pre-10am": 9.53,
    "Parcelforce Pre-12pm": 7.86,
    "Parcelforce 24": 4.53,
    "Parcelforce 48": 4.47,
    "Parcelforce Isle of Man": 13.25,
    "Parcelforce Northern Ireland": 13.25,
  },

  dpd: {
    "DPD Collection Charge": 8.8,

    //--Express Pack--//
    "DPD Express Pack Pre-10:30am": 20.55,
    "DPD Express Pack Pre-12pm": 9.21,
    "DPD Express Pack Next-Day": 6.03,
    "DPD Express Pack Saturday Pre-10:30am": 23.39,
    "DPD Express Pack Saturday Pre-12pm": 20.55,
    "DPD Express Pack Saturday": 14.18,
    "DPD Express Pack Sunday Pre-12pm": 20.55,
    "DPD Express Pack Sunday": 14.18,

    //--Parcel--//
    "DPD Pre-10:30am": 20.55, // DPD Pre-10:30am
    "DPD Pre-12pm": 9.21, // DPD Pre-12pm
    "DPD Next-Day": 6.38, // DPD Next-Day
    "DPD Two-Day": 6.38, //DPD Two-Day
    "DPD Saturday Pre-10:30am": 23.39, // DPD Saturday Pre-10:30am
    "DPD Saturday Pre-12pm": 20.55, // DPD Saturday Pre-12pm
    "DPD Saturday": 14.18, // DPD Saturday
    "DPD Sunday": 14.18, // DPD Sunday
  },

  surcharges: {
    "Royal Mail Fuel Surcharge": 1.08, // 8%
    "Royal Mail Peak Letter Surcharge": 0.05,
    "Royal Mail Peak Parcel Surcharge": 0.1,
    "Royal Mail Green Surcharge": 0.02,
    "DPD Fuel Surcharge": 1.15, // 15%
    "DPD Drive Shortage Surcharge": 0.25, // 25p surcharge for driver shortage
    "Parcelforce Fuel Surcharge": 1.15, // 15%
  },

  //Function to select courier - returns total price inc. surcharges and VAT.
  selectCourier(courierTarget) {
    //Get date & apply Royal Mail peak surcharge if within the date.
    let currentDate = new Date(); // Gets the current date
    let day = currentDate.getDate(); // Gets the current day as a number
    let month = currentDate.getMonth() + 1; // Gets the current month as a number
    let year = currentDate.getFullYear(); // Gets the current year as a number
    let currentYear = year.toString(); // Converts the current year to a string
    let nextYear = (year + 1).toString(); // Takes the current year then adds 1, then converts to a string. Used because the Peak times run from Nov - Jan.
    let startDate = currentYear + month + day; // Defines the start date
    let endDate = nextYear + month + day; // Defines the end date

    this.surcharges["Royal Mail Peak Letter Surcharge"] = 0.05
      ? currentDate >= startDate && currentDate <= endDate
      : 0;

    const rmExtraSurcharges =
      this.surcharges["Royal Mail Green Surcharge"] +
      this.surcharges["Royal Mail Peak Letter Surcharge"];

    let courierResultService = document.querySelector(
      ".courier-result-container h3",
    );
    switch (courierTarget) {
      case "Evri Package 48":
        courierResultInput.value = (
          this.evri["Evri 48 Package (0-2kg)"] * vat
        ).toFixed(2);
        courierResultService.innerHTML = "Evri 48 Package (0-2kg)";
        break;
      case "Evri Parcel 48":
        courierResultInput.value = (
          this.evri["Evri 48 Parcel (2kg+)"] * vat
        ).toFixed(2);
        courierResultService.innerHTML = "Evri 48 Parcel (2kg+)";
        break;
      case "Evri Package 24":
        courierResultInput.value = (
          this.evri["Evri 24 Package (0-2kg)"] * vat
        ).toFixed(2);
        courierResultService.innerHTML = "Evri 24 Package (0-2kg)";
        break;
      case "Evri Parcel 24":
        courierResultInput.value = (
          this.evri["Evri 24 Parcel (2kg+)"] * vat
        ).toFixed(2);
        courierResultService.innerHTML = "Evri 24 Parcel (2kg+)";
        break;

      case "Parcelforce 24":
        courierResultInput.value = (
          this.parcelforce["Parcelforce 24"] *
          this.surcharges["Parcelforce Fuel Surcharge"] *
          vat
        ).toFixed(2);
        courierResultService.innerHTML = "Parcelforce 24";
        break;
      case "Parcelforce 48":
        courierResultInput.value = (
          this.parcelforce["Parcelforce 48"] *
          this.surcharges["Parcelforce Fuel Surcharge"] *
          vat
        ).toFixed(2);
        courierResultService.innerHTML = "Parcelforce 48";
        break;

      case "STD48 (0-135g)":
        courierResultInput.value = (
          (this.royalMail["Royal Mail Standard 48 Large Letter (0-135g)"] *
            this.surcharges["Royal Mail Fuel Surcharge"] +
            rmExtraSurcharges) *
          vat
        ).toFixed(2);
        courierResultService.innerHTML =
          "Royal Mail Standard 48 Large Letter (0-135g)";
        break;
      case "STD48 (136-250g)":
        courierResultInput.value = (
          (this.royalMail["Royal Mail Standard 48 Large Letter (136-250g)"] *
            this.surcharges["Royal Mail Fuel Surcharge"] +
            rmExtraSurcharges) *
          vat
        ).toFixed(2);
        courierResultService.innerHTML =
          "Royal Mail Standard 48 Large Letter (136-250g)";
        break;
      case "STD48 (251-500g)":
        courierResultInput.value = (
          (this.royalMail["Royal Mail Standard 48 Large Letter (251-500g)"] *
            this.surcharges["Royal Mail Fuel Surcharge"] +
            rmExtraSurcharges) *
          vat
        ).toFixed(2);
        courierResultService.innerHTML =
          "Royal Mail Standard 48 Large Letter (251-500g)";
        break;
      case "STD48 (501-700g)":
        courierResultInput.value = (
          (this.royalMail["Royal Mail Standard 48 Large Letter (501-700g)"] *
            this.surcharges["Royal Mail Fuel Surcharge"] +
            rmExtraSurcharges) *
          vat
        ).toFixed(2);
        courierResultService.innerHTML =
          "Royal Mail Standard 48 Large Letter (501-700g)";
        break;

      case "STD24 (0-135g)":
        courierResultInput.value = (
          (this.royalMail["Royal Mail Standard 24 Large Letter (0-135g)"] *
            this.surcharges["Royal Mail Fuel Surcharge"] +
            rmExtraSurcharges) *
          vat
        ).toFixed(2);
        courierResultService.innerHTML =
          "Royal Mail Standard 24 Large Letter (0-135g)";
        break;
      case "STD24 (136-250g)":
        courierResultInput.value = (
          (this.royalMail["Royal Mail Standard 24 Large Letter (136-250g)"] *
            this.surcharges["Royal Mail Fuel Surcharge"] +
            rmExtraSurcharges) *
          vat
        ).toFixed(2);
        courierResultService.innerHTML =
          "Royal Mail Standard 24 Large Letter (136-250g)";
        break;
      case "STD24 (251-500g)":
        courierResultInput.value = (
          (this.royalMail["Royal Mail Standard 24 Large Letter (251-500g)"] *
            this.surcharges["Royal Mail Fuel Surcharge"] +
            rmExtraSurcharges) *
          vat
        ).toFixed(2);
        courierResultService.innerHTML =
          "Royal Mail Standard 24 Large Letter (251-500g)";
        break;
      case "STD24 (501-700g)":
        courierResultInput.value = (
          (this.royalMail["Royal Mail Standard 24 Large Letter (501-700g)"] *
            this.surcharges["Royal Mail Fuel Surcharge"] +
            rmExtraSurcharges) *
          vat
        ).toFixed(2);
        courierResultService.innerHTML =
          "Royal Mail Standard 24 Large Letter (501-700g)";
        break;
    }
    return courierResultInput.valueAsNumber;
  },
};

function courierSelection() {
  const courierButton = document.querySelectorAll(".courier-btn");
  courierButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      courierPrices.selectCourier(e.target.innerHTML);
    });
  });
}

courierSelection();

const openStandard48Menu = () => {
  //Function to open the Royal Mail Services Container
  const standard48Button = document.querySelector(".std-48-btn");
  const standard24Button = document.querySelector(".std-24-btn");
  const rm48ServicesContainer = document.querySelector(
    ".rm48-services-container",
  );
  const rm24ServicesContainer = document.querySelector(
    ".rm24-services-container",
  );
  const indicator = document.querySelectorAll(".indicator"); // The + & - Symbols
  let rm48Indicator = indicator[0];
  let rm24Indicator = indicator[1];

  standard48Button.addEventListener("click", () => {
    rm48ServicesContainer.classList.toggle("active");
    rm24ServicesContainer.classList.remove("active");
    if (rm48Indicator.innerHTML === "+") {
      // Toggles the indicator between + and -. Sets default to other indicators.
      rm48Indicator.innerHTML = "-";
    } else {
      rm48Indicator.innerHTML = "+";
    }
    rm24Indicator.innerHTML = "+";
  });
  standard24Button.addEventListener("click", () => {
    rm24ServicesContainer.classList.toggle("active");
    rm48ServicesContainer.classList.remove("active");
    if (rm24Indicator.innerHTML === "+") {
      rm24Indicator.innerHTML = "-";
    } else {
      rm24Indicator.innerHTML = "+";
    }
    rm48Indicator.innerHTML = "+";
  });
};
openStandard48Menu(); //Call the function to open the containers on click
