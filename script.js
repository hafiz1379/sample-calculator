let displayValue = "";

function appendNumber(number) {
  displayValue += number;
  document.getElementById("display").value = displayValue;
}

function performOperation(operator) {
  displayValue += operator;
  document.getElementById("display").value = displayValue;
}

function clearDisplay() {
  displayValue = "";
  document.getElementById("display").value = displayValue;
}

function calculateResult() {
  try {
    const result = eval(displayValue);
    displayValue = result.toString();
    document.getElementById("display").value = displayValue;
  } catch (error) {
    displayValue = "";
    document.getElementById("display").value = "Error";
  }
}
