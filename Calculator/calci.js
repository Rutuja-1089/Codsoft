const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const toggleBtn = document.getElementById('toggle-theme');

let currentInput = '';
let displayAnimation; // used to control typing animation interval

// Animate display with typing effect
function animateDisplay(text) {
  clearInterval(displayAnimation); // stop previous animations
  display.value = '';
  let index = 0;
  displayAnimation = setInterval(() => {
    if (index < text.length) {
      display.value += text[index];
      index++;
    } else {
      clearInterval(displayAnimation);
    }
  }, 30); // Typing speed (ms per character)
}

// Evaluate expression safely
function calculate() {
  try {
    const result = Function(`"use strict"; return (${currentInput})`)();
    currentInput = String(result);
  } catch {
    currentInput = 'Error';
  }
  animateDisplay(currentInput);
}

// Handle button clicks
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-value');

    if (val === 'clear') {
      currentInput = '';
    } else if (val === 'backspace') {
      currentInput = currentInput.slice(0, -1);
    } else if (val === 'equals') {
      calculate();
      return;
    } else {
      currentInput += val;
    }

    animateDisplay(currentInput || '0');
  });
});

// Keyboard support for input
window.addEventListener('keydown', e => {
  const allowedKeys = '0123456789+-*/().';

  if (allowedKeys.includes(e.key)) {
    currentInput += e.key;
    animateDisplay(currentInput || '0');
  } else if (e.key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    currentInput = currentInput.slice(0, -1);
    animateDisplay(currentInput || '0');
  } else if (e.key === 'Escape') {
    e.preventDefault();
    currentInput = '';
    animateDisplay('0');
  }
});

// Dark mode toggle handler
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    toggleBtn.textContent = '☀️ Light Mode';
  } else {
    toggleBtn.textContent = '🌙 Dark Mode';
  }
});
const light = document.getElementById('mouse-light');

window.addEventListener('mousemove', (e) => {
  light.style.left = `${e.clientX - 100}px`;
  light.style.top = `${e.clientY - 100}px`;
});

window.addEventListener('mouseleave', () => light.style.opacity = 0);
window.addEventListener('mouseenter', () => light.style.opacity = 1);
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const circle = document.createElement('span');
    circle.classList.add('ripple');
    this.appendChild(circle);
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = size + 'px';
    circle.style.left = e.clientX - rect.left - size/2 + 'px';
    circle.style.top = e.clientY - rect.top - size/2 + 'px';
    
    circle.addEventListener('animationend', () => {
      circle.remove();
    });
  });
});
