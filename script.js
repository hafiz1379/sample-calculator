let displayValue = '';
let isResultShown = false;

function updateDisplay() {
  document.getElementById('display').value = displayValue;
}

function appendNumber(number) {
  if (isResultShown) {
    displayValue = '';
    isResultShown = false;
  }
  displayValue += number;
  updateDisplay();
}

function appendDecimal() {
  if (isResultShown) {
    displayValue = '0.';
    isResultShown = false;
  } else if (!displayValue.includes('.')) {
    displayValue += '.';
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
  displayValue = '';
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
    displayValue = '';
    document.getElementById('display').value = 'Error';
  }
}

function calculate(numbers, operators) {
  // Perform multiplication and division operations first
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '*' || operators[i] === '/') {
      const result = operators[i] === '*' ? numbers[i] * numbers[i + 1] : numbers[i] / numbers[i + 1];
      numbers.splice(i, 2, result);
      operators.splice(i, 1);
      i--; // Decrement the index to account for the removed operator
    }
  }

  // Perform addition and subtraction operations
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNumber = numbers[i + 1];

    switch (operator) {
      case '+':
        result += nextNumber;
        break;
      case '-':
        result -= nextNumber;
        break;
      default:
        throw new Error('Invalid operator');
    }
  }

  return result;
}

document.addEventListener('keydown', (event) => {
  const { key } = event;

  if (/\d/.test(key)) {
    appendNumber(key);
  } else if (key === '.' && !isResultShown && canAppendDecimal()) {
    appendDecimal();
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    performOperation(key);
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Backspace') {
    deleteDigit();
  }
});

function canAppendDecimal() {
  const operands = displayValue.split(/[+\-*/]/);
  const currentOperand = operands[operands.length - 1];
  return !currentOperand.includes('.');
}
