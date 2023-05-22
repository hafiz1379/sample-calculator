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
    const numbers = displayValue.split(/[+\-*/]/).map(Number);
    const operators = displayValue.match(/[+\-*/]/g);
    const result = calculate(numbers, operators);
    displayValue = result.toString();
    isResultShown = true;
    updateDisplay();
  } catch (error) {
    displayValue = "";
    document.getElementById("display").value = "Error";
  }
}

function calculate(numbers, operators) {
  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNumber = numbers[i + 1];

    switch (operator) {
      case "+":
        result += nextNumber;
        break;
      case "-":
        result -= nextNumber;
        break;
      case "*":
        result *= nextNumber;
        break;
      case "/":
        result /= nextNumber;
        break;
      default:
        throw new Error("Invalid operator");
    }
  }

  return result;
}

function updateDisplay() {
  document.getElementById("display").value = displayValue;
}

document.addEventListener("keydown", function(event) {
  const key = event.key;

  if (/\d/.test(key)) {
    appendNumber(key);
  } else if (key === "." && !isResultShown && canAppendDecimal()) {
    appendDecimal();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    performOperation(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    deleteDigit();
  }
});

function canAppendDecimal() {
  const operands = displayValue.split(/[+\-*/]/);
  const currentOperand = operands[operands.length - 1];
  return !currentOperand.includes(".");
}
