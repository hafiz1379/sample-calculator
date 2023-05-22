let displayValue = "";
let isResultShown = false;

function appendNumber(number) {
  if (isResultShown) {
    displayValue = "";
    isResultShown = false;
  }
  displayValue += number;
  updateDisplay();
}

function appendDecimal() {
  if (isResultShown) {
    displayValue = "0.";
    isResultShown = false;
  } else if (!displayValue.includes(".")) {
    displayValue += ".";
  }
  updateDisplay();
}

function performOperation(operator) {
  if (isResultShown) {
    isResultShown = false;
  }
  displayValue += operator;
  updateDisplay();
}

function clearDisplay() {
  displayValue = "";
  updateDisplay();
}

function deleteDigit() {
  if (isResultShown) {
    clearDisplay();
    isResultShown = false;
  } else {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
  }
}

function calculateResult() {
  try {
    const result = eval(displayValue);
    displayValue = result.toString();
    isResultShown = true;
    updateDisplay();
  } catch (error) {
    displayValue = "";
    document.getElementById("display").value = "Error";
  }
}

function updateDisplay() {
  document.getElementById("display").value = displayValue;
}

document.addEventListener("keydown", function(event) {
  const key = event.key;

  if (/\d/.test(key)) {
    appendNumber(key);
  } else if (key === "." && !displayValue.includes(".")) {
    appendDecimal();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    performOperation(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    deleteDigit();
  }
});
