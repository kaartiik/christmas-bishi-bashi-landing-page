const logo = document.querySelector(".logo");
const logoMobile = document.querySelector(".logo-mobile");
const overlay = document.querySelector(".overlay");
const buttonWrapper = document.querySelector(".button-wrapper");
const makeCardBtn = document.querySelector(".make-card-btn");
const howThisWorksBtn = document.querySelector(".how-this-works-btn");
const howThisWorks = document.querySelector(".how-this-works");
const form = document.querySelector("form");
const nameTo = document.querySelector("#nameTo");
const message = document.querySelector("#message");
const nameFrom = document.querySelector("#nameFrom");
const errorMessage = document.querySelector(".error-message");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeButton = document.querySelector(".modal-footer button");
const charsLeft = document.querySelector(".chars-left");
const carouselContainer = document.querySelector(".carousel-container");
const shareContainer = document.querySelector(".share-container");

let formData = {};

setTimeout(() => {
  overlay.style.opacity = 1;
  document.body.style.backgroundPositionY = "1%";
}, 1000);

makeCardBtn.onclick = () => {
  form.hidden = false;
  form.style.opacity = 1;
  shrinkLogo();
};

howThisWorksBtn.onclick = () => {
  howThisWorks.hidden = false;
  shrinkLogo();
  initializePageTurner();
};

const shrinkLogo = () => {
  logo.style.width = "384px";
  logo.style.height = "127px";
  logoMobile.style.width = "202px";
  logoMobile.style.height = "132px";
  buttonWrapper.style.display = "none";
  buttonWrapper.hidden = true;
};

const resetLogo = () => {
  logo.style.width = "792px";
  logo.style.height = "264px";
  logoMobile.style.width = "302px";
  logoMobile.style.height = "198px";
  buttonWrapper.style.display = "flex";
  buttonWrapper.hidden = false;
};

const initializePageTurner = () => {
  const backBtn = document.querySelector(".back-btn");
  const forwardBtn = document.querySelector(".forward-btn");
  const pageOne = document.querySelector(".page-one");
  const pageTwo = document.querySelector(".page-two");
  const pageNumber = document.querySelector(".page-number");

  let pageNum = 1;

  forwardBtn.onclick = () => {
    if (pageNum === 1) {
      pageNum += 1;
      pageOne.hidden = true;
      pageTwo.hidden = false;
      pageNumber.textContent = 2;
    } else {
      pageOne.hidden = false;
      pageTwo.hidden = true;
      pageNumber.textContent = 1;
      howThisWorks.hidden = true;
      resetLogo();
    }
  };

  backBtn.onclick = () => {
    if (pageNum === 2) {
      pageNum -= 1;
      pageOne.hidden = false;
      pageTwo.hidden = true;
      pageNumber.textContent = 1;
    } else {
      howThisWorks.hidden = true;
      resetLogo();
    }
  };
};

// Character count for message textarea
message.addEventListener("input", ({ currentTarget: target }) => {
  const maxLength = target.getAttribute("maxlength");
  const currentLength = target.value.length;

  charsLeft.textContent = maxLength - currentLength;
});

form.onsubmit = async (e) => {
  e.preventDefault();

  formData.to = DOMPurify.sanitize(nameTo.value);
  formData.from = DOMPurify.sanitize(nameFrom.value);
  formData.message = DOMPurify.sanitize(message.value);

  form.hidden = true;
  form.reset();
  carouselContainer.hidden = false;

  initializeCarousel();
};

const showShareContainer = (id) => {
  carouselContainer.hidden = true;
  shareContainer.hidden = false;

  const p = document.querySelector(".share-container p");
  const input = document.querySelector(".share-container input");
  const startOverButton = document.querySelector(".start-over-button");
  const telegramLink = document.querySelector(".telegram-link");
  const whatsappLink = document.querySelector(".whatsapp-link");

  const copyLink = `https://greetings.startsomething.sg/christmas-card?id=${id}`;

  // Update values and hrefs with updated copy link
  input.value = copyLink;
  telegramLink.href = `https://t.me/share/url?url=${copyLink}`;
  whatsappLink.href = `whatsapp://send?text=${copyLink}`;

  input.onclick = () => {
    p.textContent = "LINK COPIED!";

    // Select the text field
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(input.value);
  };

  startOverButton.onclick = () => {
    startOver();
  };
};

const startOver = () => {
  formData = {};
  shareContainer.hidden = true;
  resetLogo();
  document.body.style.backgroundImage = `url("./images/santas.jpg")`;
  document.body.style.backgroundPositionY = "1%";
};
