

// DOM elements
const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const wpmEl = document.getElementById("wpm");
const errorsEl = document.getElementById("errors");
const accuracyEl = document.getElementById("accuracy");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const resultEl = document.getElementById("result");
const finalWpmEl = document.getElementById("final-wpm");
const finalErrorsEl = document.getElementById("final-errors");
const finalAccuracyEl = document.getElementById("final-accuracy");
const restartBtn = document.getElementById("restart");

// State

let currentSentence = "";
let currentIndex = 0;
let errors = 0;
let totalTyped = 0;
let correctTyped = 0;
let time = 60;
let timer = null;
let started = false;
let completed = false;


async function getRandomSentence() {
  sentenceEl.innerHTML = '<span style="color:var(--accent2);opacity:0.7">Loading sentence...</span>';
  let sentence = "";
  let maxTries = 10;
  let tries = 0;
  try {
    while (sentence.length < 400 && tries < maxTries) {
      const res = await fetch("https://api.quotable.io/random?minLength=100&maxLength=200");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      // Add a space if needed
      if (sentence && !sentence.endsWith(" ")) sentence += " ";
      sentence += data.content;
      tries++;
    }
    // Trim to max 500 chars, end at last period if possible
    if (sentence.length > 500) {
      let lastPeriod = sentence.lastIndexOf(".", 500);
      if (lastPeriod > 400) {
        sentence = sentence.slice(0, lastPeriod + 1);
      } else {
        sentence = sentence.slice(0, 500);
      }
    }
    return sentence;
  } catch (e) {
    return "Typing fast is a valuable skill for programmers. Practice regularly to improve your speed and accuracy. Consistency and focus are key to mastering typing.";
  }
}


function renderSentence() {
  let html = "";
  for (let i = 0; i < currentSentence.length; i++) {
    let charClass = "";
    if (i < inputEl.value.length) {
      if (inputEl.value[i] === currentSentence[i]) {
        charClass = "correct";
      } else {
        charClass = "incorrect";
      }
    } else if (i === inputEl.value.length && !completed) {
      charClass = "current";
    }
    html += `<span class="${charClass}">${currentSentence[i]}</span>`;
  }
  sentenceEl.innerHTML = html;
}

function updateStats() {
  let wpm = Math.round(correctTyped / 5 / ((60 - time) / 60 || 1));
  let accuracy = totalTyped
    ? Math.max(0, Math.round((correctTyped / totalTyped) * 100))
    : 100;
  wpmEl.textContent = wpm;
  errorsEl.textContent = errors;
  accuracyEl.textContent = accuracy;
  timerEl.textContent = time;
  progressEl.style.width = (time / 60) * 100 + "%";
}


async function loadNewSentence() {
  currentSentence = await getRandomSentence();
  renderSentence();
}

async function resetTest() {
  currentIndex = 0;
  errors = 0;
  totalTyped = 0;
  correctTyped = 0;
  time = 60;
  started = false;
  completed = false;
  inputEl.value = "";
  inputEl.disabled = false;
  resultEl.classList.remove("active");
  updateStats();
  await loadNewSentence();
  inputEl.focus();
  progressEl.style.width = "100%";
}

function endTest() {
  completed = true;
  inputEl.disabled = true;
  clearInterval(timer);
  let wpm = Math.round(correctTyped / 5 / ((60 - time) / 60 || 1));
  let accuracy = totalTyped
    ? Math.max(0, Math.round((correctTyped / totalTyped) * 100))
    : 100;
  finalWpmEl.textContent = wpm;
  finalErrorsEl.textContent = errors;
  finalAccuracyEl.textContent = accuracy;
  resultEl.classList.add("active");
}


inputEl.addEventListener("input", async function () {
  if (!started) {
    started = true;
    timer = setInterval(() => {
      time--;
      updateStats();
      if (time <= 0) {
        endTest();
      }
    }, 1000);
  }
  let val = inputEl.value;
  totalTyped++;
  if (val[val.length - 1] === currentSentence[val.length - 1]) {
    correctTyped++;
  } else {
    errors++;
  }
  renderSentence();
  updateStats();
  if (val === currentSentence) {
    // End game after one sentence
    endTest();
  }
});


restartBtn.addEventListener("click", function () {
  resetTest();
});


// Initialize
window.onload = async () => {
  await resetTest();
};
