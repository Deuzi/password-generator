const generatedPassword = document.querySelector('.generated-password');
const passwordLength = document.getElementById('password-length');
const sliderContainer = document.querySelector('.slider-container');
const sliderTrack = document.querySelector('.slider-track');
const sliderFill = document.getElementById('slider-fill');
const sliderThumb = document.getElementById('slider-thumb');
const listItem = document.querySelectorAll('li');
const upperCase = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
const symbols = ['!', '@', '$', '#', '^', '&', '*', '~'];
const lowerCase = upperCase.map((word) => word.toLowerCase());
const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const generateButton = document.getElementById('generate');

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
    updateOutput();
  }
});

sliderTrack.addEventListener('click', (e) => {
  updateSliderValue(e);
});

const checkStates = Array(listItem.length).fill(false);

function generateRandom(category, length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * category.length);
    result += category[randomIndex];
  }
  return result;
}

//Mix all the category

function generateMixed(length) {
  const allChars = [...upperCase, ...lowerCase, ...symbols, ...number];
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    result += allChars[randomIndex];
  }
  return result;
}

function updateOutput() {
  const selectedCount = checkStates.filter((state) => state).length;

  if (selectedCount === listItem.length) {
    generatedPassword.textContent = generateMixed(currentValue);
  } else if (selectedCount === 1) {
    const selectedIndex = checkStates.indexOf(true);
    switch (selectedIndex) {
      case 0:
        generatedPassword.textContent = generateRandom(upperCase, currentValue);
        break;
      case 1:
        generatedPassword.textContent = generateRandom(lowerCase, currentValue);
        break;
      case 2:
        generatedPassword.textContent = generateRandom(symbols, currentValue);
        break;
      case 3:
        generatedPassword.textContent = generateRandom(number, currentValue);
        break;
    }
  } else {
    console.log('Select an option!');
  }
}

listItem.forEach((item, index) => {
  item.addEventListener('click', () => {
    checkStates[index] = !checkStates[index];
    const checkbox = item.querySelector('.checkbox');

    checkbox.style.backgroundColor = checkStates[index]
      ? 'var(--Neon-green)'
      : '';
    checkbox.style.border = checkStates[index]
      ? '0 solid var(--Neon-green)'
      : '';
    const checked = item.querySelector('.checked');
    checked.style.display = checkStates[index] ? 'block' : 'none';

    //Checking items that was selected
    updateOutput();
  });
});

generateButton.addEventListener('click', () => {
  updateOutput();
});
