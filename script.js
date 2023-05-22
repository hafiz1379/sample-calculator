let displayValue = "";

function appendNumber(number) {
  displayValue += number;
  updateDisplay();
}

function performOperation(operator) {
  displayValue += operator;
  updateDisplay();
}

function clearDisplay() {
  displayValue = "";
  updateDisplay();
}

function deleteDigit() {
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
}

function calculateResult() {
  try {
    const result = eval(displayValue);
    displayValue = result.toString();
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
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    performOperation(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    if (displayValue.length === 0) {
      clearDisplay();
    } else {
      deleteDigit();
    }
  }
});
