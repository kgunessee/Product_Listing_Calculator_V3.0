const courierPrices = {
  royalMail: {
    "Royal Mail Tracked 48 Parcel": 2.75, // Royal Mail Tracked 48 (Flat Fee)
    rmTracked24Parcel: 3.45, // Royal Mail Tracked 24 (Flat Fee)
    rmTracked48LL: 1.97, // Royal Mail Tracked 48 Large Letter (Flat Fee)
    rmTracked24LL: 2.21, // Royal Mail Tracked 24 Large Letter (Flat Fee)
    rm2ndClassLetter: 0.77, // Royal Mail 2nd Class Letter
    rm48LL_0_135g: 1, // Royal Mail 48 LL (0-135g)
    rm48LL_101_250g: 1.35, // Royal Mail 48 LL (146-250g)
    rm48LL_251_500g: 1.6, // Royal Mail 48 LL (251-500g)
    rm48LL_501_750g: 2.05, // Royal Mail 48 LL (501-700g)
    rm24LL_0_135g: 1, // Royal Mail 24 LL (0-135g)
    rm24LL_101_250g: 1.35, // Royal Mail 24 LL (146-250g)
    rm24LL_251_500g: 1.6, // Royal Mail 24 LL (251-500g)
    rm24LL_501_750g: 2.05, // Royal Mail 24 LL (501-750g)
  },

  evri: {
    evriPack48Cost: 2.35,
    evriPack24Cost: 2.65,
    evriPar48Cost: 2.51,
    evriPar24Cost: 3.0,
  },
  //     const royalMailFuelSurcharge = 1.08; // 8%
  //     const royalMailGreenSurcharge = 0.02;
  //     const DPDFuelSurcharge = 1.15; // 15%
  //     const DPDDriverShortageCharge = 0.25; // 25p surcharge for driver shortage
  //     const parcelforceFuelSurcharge = 1.15; // 15%
  //     const rmPeakLetterSurcharge = 0.05;
  //     const rmPeakParcelSurcharge = 0.1;

  // //--DPD--//
  //
  //     const DPDCollectionCharge = 8.8;
  //
  // //--Express Pack--//
  //     const DPDExpPackPre1030 = 20.55; // DPD ExpressPak Pre-10:30am
  //     const DPDExpPackPre12 = 9.21; // DPD ExpressPak Pre-12pm
  //     const DPDExpPackNextDay = 6.03; // DPD ExpressPak Next-Day
  //     const DPDExpPackSatPre1030 = 23.39; // DPD ExpressPak Saturday Pre-10:30am
  //     const DPDExpPackSatPre12 = 20.55; // DPD ExpressPak Saturday Pre-12pm
  //     const DPDExpPackSat = 14.18; // DPD ExpressPak Saturday
  //     const DPDExpPackSunPre12 = 20.55; // DPD ExpressPak Sunday Pre-12pm
  //     const DPDExpPackSun = 14.18; // DPD ExpressPak Sunday
  //
  // //--Parcel--//
  //     const DPDPre1030 = 20.55; // DPD Pre-10:30am
  //     const DPDPre12 = 9.21; // DPD Pre-12pm
  //     const DPDNextDay = 6.38; // DPD Next-Day
  //     const DPDTwoDay = 6.38; //DPD Two-Day
  //     const DPDSatPre1030 = 23.39; // DPD Saturday Pre-10:30am
  //     const DPDSatPre12 = 20.55; // DPD Saturday Pre-12pm
  //     const DPDSat = 14.18; // DPD Saturday
  //     const DPDSunPre12 = 20.55; // DPD Sunday Pre-12pm
  //     const DPDSun = 14.18; // DPD Sunday
  //
  // //--Parcelforce--//
  //
  //     const pf48hrCollectionCharge = 8.9;
  // //--Standard Services--//
  //     const pfPre9am = 12.72;
  //     const pfPre10am = 9.53;
  //     const pfPre12pm = 7.86;
  //     const pf24Hour = 4.53;
  //     const pf48Hour = 4.47;
  //     const pfHighlands = 7.75;
  //     const pfIoM = 13.25;
  //     const pfNI = 13.25;
};

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

const test = document.querySelector(".test");
for (const [key, value] of Object.entries(courierPrices.royalMail)) {
  // const li = document.createElement("li");
  // li.innerHTML = ;
  // test.appendChild(li);
  const para = document.createElement("li");
  para.innerText = `${key}: ${value}`;
  document.body.appendChild(para);
}
