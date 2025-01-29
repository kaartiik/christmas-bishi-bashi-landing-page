const initializeCarousel = () => {
  window.scrollTo(0, 0);

  const slider = document.querySelector(".carousel-slider");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(".carousel-button-prev");
  const nextButton = document.querySelector(".carousel-button-next");
  const createCardButton = document.querySelector(".create-card-button");

  const slideWidth = slides[0].getBoundingClientRect().width;
  let slideIndex = 0;

  document.body.style.transition = "initial";
  document.body.style.backgroundPosition = "center";

  const updateBackground = () => {
    const currentSlide = slider.querySelector(".current-slide");
    const slideImg = currentSlide.children[0].src;

    if (slideIndex !== 0) {
      document.body.style.transition = "0.3s";
    }

    document.body.style.backgroundImage = `url(${slideImg})`;
  };

  updateBackground();

  // Arrange the slides next to one another
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px";
  });

  // Move slider based on button clicked
  const moveToSlide = (currentSlide, targetSlide) => {
    slider.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
  };

  // Update buttons
  const updateButtons = () => {
    const currentSlide = slider.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const nextSlide = currentSlide.nextElementSibling;

    if (prevSlide) {
      prevButton.hidden = false;
      prevButton.textContent = `< ${prevSlide.children[0].alt}`;
    } else {
      prevButton.hidden = true;
    }

    if (nextSlide) {
      nextButton.hidden = false;
      nextButton.textContent = `${nextSlide.children[0].alt} >`;
    } else {
      nextButton.hidden = true;
    }
  };

  // When the previous button is clicked, move slider to the left
  prevButton.onclick = () => {
    const currentSlide = slider.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;

    moveToSlide(currentSlide, prevSlide);
    slideIndex--;
    updateButtons();
    updateBackground();
  };

  // When the next button is clicked, move slider to the right
  nextButton.onclick = () => {
    prevButton.disabled = false;

    const currentSlide = slider.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;

    moveToSlide(currentSlide, nextSlide);
    slideIndex++;
    updateButtons();
    updateBackground();
  };

  createCardButton.onclick = async () => {
    const currentSlide = slider.querySelector(".current-slide");
    const str = currentSlide.children[0].alt;
    formData.variant = str.toLowerCase().split(" ").join("-");

    try {
      const res = await fetch(
        "https://backend.startsomething.sg/api/v1/greetingcard/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const data = await res.json();
        showShareContainer(data.id);
      } else {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      console.log({ error });
    }
  };
};
