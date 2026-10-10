
class ImageSlider {
  constructor(slider) {
    this.slider = slider;
    this.track = slider.querySelector("#sliderTrack");
    this.prevBtn = slider.querySelector("#prevBtn");
    this.nextBtn = slider.querySelector("#nextBtn");
    this.dotsContainer = slider.querySelector("#sliderDots");
    this.status = slider.querySelector("#slideStatus");

    this.originalSlides = Array.from(
      this.track.querySelectorAll(".slide")
    );

    this.total = this.originalSlides.length;
    this.index = 1;
    this.isAnimating = false;
    this.duration = 450;

    if (this.total === 0) return;

    this.initialize();
  }

  initialize() {
    // Add copies of the last and first slides.
    const firstClone = this.originalSlides[0].cloneNode(true);
    const lastClone =
      this.originalSlides[this.total - 1].cloneNode(true);

    firstClone.setAttribute("aria-hidden", "true");
    lastClone.setAttribute("aria-hidden", "true");

    this.track.prepend(lastClone);
    this.track.append(firstClone);

    this.slides = Array.from(
      this.track.querySelectorAll(".slide")
    );

    this.createDots();
    this.moveTo(this.index, false);
    this.updateUI();

    this.nextBtn.addEventListener("click", () => {
      this.goTo(this.index + 1);
    });

    this.prevBtn.addEventListener("click", () => {
      this.goTo(this.index - 1);
    });

    this.dotsContainer.addEventListener("click", (event) => {
      const dot = event.target.closest("button[data-index]");

      if (!dot || !this.dotsContainer.contains(dot)) return;

      // Convert the original image index to the track index.
      this.goTo(Number(dot.dataset.index) + 1);
    });

    this.track.addEventListener("transitionend", (event) => {
      if (
        event.target !== this.track ||
        event.propertyName !== "transform"
      ) {
        return;
      }

      // Silently return from a cloned slide to its original.
      if (this.index === 0) {
        this.moveTo(this.total, false);
      } else if (this.index === this.total + 1) {
        this.moveTo(1, false);
      }

      this.index = this.normalizeTrackIndex(this.index);
      this.isAnimating = false;
      this.updateUI();
    });

    // Recalculate position when the viewport changes size.
    window.addEventListener("resize", () => {
      this.moveTo(this.index, false);
    });
  }

  createDots() {
    this.dotsContainer.replaceChildren();

    for (let i = 0; i < this.total; i++) {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.dataset.index = i;
      dot.setAttribute("aria-label", `Go to image ${i + 1}`);

      this.dotsContainer.appendChild(dot);
    }
  }

  goTo(targetIndex) {
    if (this.isAnimating || this.total < 2) return;

    this.isAnimating = true;
    this.index = targetIndex;
    this.moveTo(this.index, true);
    this.updateUI();
  }

  moveTo(index, animate = true) {
    this.track.style.transition = animate
      ? `transform ${this.duration}ms ease-in-out`
      : "none";

    const slideWidth =
      this.slider.querySelector(".slider-viewport").clientWidth;

    this.track.style.transform =
      `translateX(${-index * slideWidth}px)`;
  }

  normalizeTrackIndex(index) {
    if (index === 0) return this.total;
    if (index === this.total + 1) return 1;
    return index;
  }

  getRealIndex() {
    return (this.index - 1 + this.total) % this.total;
  }

  updateUI() {
    const realIndex = this.getRealIndex();
    const dots = this.dotsContainer.querySelectorAll("button");

    dots.forEach((dot, i) => {
      const active = i === realIndex;

      dot.classList.toggle("active", active);

      if (active) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    this.status.textContent =
      `Image ${realIndex + 1} of ${this.total}`;
  }
}

document.querySelectorAll(".slider").forEach((slider) => {
  new ImageSlider(slider);
});
