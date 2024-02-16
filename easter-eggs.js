const graveyardOpenBtn = document.querySelector(".easter-btn");
const darkBG = document.querySelector(".darken-bg");
const pwSection = document.querySelector(".password-section");
const closeBtn = document.querySelector(".close-button");
const pwInput = document.querySelector(".pw-input");
const errorMsg = document.querySelector(".error-message");
const link = document.querySelector(".graveyard-link");
const submitBtn = document.querySelector(".access-btn");

graveyardOpenBtn.addEventListener("click", () => {
  darkBG.classList.add("active");
  pwSection.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  darkBG.classList.remove("active");
  pwSection.classList.remove("active");
  errorMsg.innerHTML = "";
  link.classList.remove("active");
  pwInput.value = "";
});

const password = "CurryNaan";
const checkPassword = (entry) => {
  if (entry === password) {
    errorMsg.innerHTML = "";
    link.classList.add("active");
  } else {
    errorMsg.innerHTML = "Wrong Password!";
  }
};
submitBtn.addEventListener("click", () => {
  checkPassword(pwInput.value);
});
