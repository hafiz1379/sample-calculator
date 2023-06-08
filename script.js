let displayValue = '';
let isResultShown = false;
const history = [];

function updateDisplay() {
  document.getElementById('display').value = displayValue;
}

function updateHistory() {
  const historyElement = document.getElementById('history');
  historyElement.innerHTML = history.map((entry) => `<div>${entry}</div>`).join('');
}

function canAppendDecimal() {
  const operands = displayValue.split(/[+\-*/]/);
  const currentOperand = operands[operands.length - 1];
  return !currentOperand.includes('.');
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
  } else if (canAppendDecimal()) {
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

function calculate(numbers, operators) {
  // Perform multiplication and division operations first
  for (let i = 0; i < operators.length; i += 1) {
    if (operators[i] === '*' || operators[i] === '/') {
      const result = operators[i] === '*' ? numbers[i] * numbers[i + 1] : numbers[i] / numbers[i + 1];
      numbers.splice(i, 2, result);
      operators.splice(i, 1);
      i -= 1; // Decrement the index to for the removed operator
    }
  }

  // Perform addition and subtraction operations
  let result = numbers[0];
  for (let i = 0; i < operators.length; i += 1) {
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

function calculateResult() {
  try {
    const expression = displayValue;
    const numbers = displayValue.split(/[+\-*/]/).map(Number);
    const operators = displayValue.match(/[+\-*/]/g);
    const result = calculate(numbers, operators);
    displayValue = result.toString();
    isResultShown = true;
    updateDisplay();

    // Update history
    const historyEntry = `${expression} = ${result}`;
    history.push(historyEntry);
    updateHistory();
  } catch (error) {
    displayValue = '';
    document.getElementById('display').value = 'Error';
  }
}

function calculateUnaryOperation(value, operation) {
  const number = parseFloat(value);
  let result;

  switch (operation) {
    case 'sqrt':
      if (number < 0) {
        throw new Error('Invalid input for square root');
      }
      result = Math.sqrt(number);
      break;
    case 'log':
      if (number <= 0) {
        throw new Error('Invalid input for logarithm');
      }
      result = Math.log10(number);
      break;
    default:
      throw new Error('Invalid unary operation');
  }

  return result;
}

function performUnaryOperation(operation) {
  if (isResultShown) {
    isResultShown = false;
  }
  const numbers = displayValue.split(/[+\-*/]/).map(Number);
  const lastNumber = numbers[numbers.length - 1];
  const result = calculateUnaryOperation(lastNumber, operation);
  displayValue = displayValue.slice(0, -lastNumber.toString().length) + result.toString();
  isResultShown = true;
  updateDisplay();

  // Update history
  const historyEntry = `${operation}(${lastNumber}) = ${result}`;
  history.push(historyEntry);
  updateHistory();
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
  } else if (key === 'r' || key === 'R') {
    performUnaryOperation('sqrt');
  } else if (key === 'l' || key === 'L') {
    performUnaryOperation('log');
  }
});

