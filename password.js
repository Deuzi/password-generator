const generatedPassword = document.querySelector('.generated-password');
const passwordLength = document.getElementById('password-length');
const sliderContainer = document.querySelector('.slider-container');
const sliderTrack = document.querySelector('.slider-track');
const sliderFill = document.getElementById('slider-fill');
const sliderThumb = document.getElementById('slider-thumb');

const min = 0;
const max = 20;
let currentValue = 0;
let isDragging = false;

function updateSlider() {
  const percentage = ((currentValue - min) / (max - min)) * 100;
  sliderFill.style.width = `${percentage}%`;
  const thumbMaxPercentage = 100 - (20 / sliderTrack.offsetWidth) * 100; // Adjust for thumb width
  const thumbPercentage = (percentage / 100) * thumbMaxPercentage;
  sliderThumb.style.left = `${thumbPercentage}%`;
  passwordLength.textContent = currentValue;
}

updateSlider();

function updateSliderValue(e) {
  let clientX;

  if (e.type === 'touchstart' || e.type === 'touchmove') {
    clientX = e.touches[0].clientX;
  } else if (e.type === 'touchend') {
    clientX = e.changedTouches[0].clientX;
  } else {
    clientX = e.clientX;
  }

  const rect = sliderContainer.getBoundingClientRect();
  const offsetX = clientX - rect.left;
  const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);
  currentValue = Math.round(min + percentage * (max - min));

  updateSlider();

  if (e.type === 'touchstart' || e.type === 'touchmove') {
    e.preventDefault();
  }
}

sliderThumb.addEventListener('mousedown', () => {
  isDragging = true;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    updateSliderValue(e);
    e.preventDefault();
  }
});

sliderTrack.addEventListener('click', (e) => {
  updateSliderValue(e);
});
