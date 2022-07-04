// Selecionando os itens no HTML...
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
// Final da seleção...

// Criando uma class...
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;  
    this.clear();
  }

  // Irá formatar o numero digitado com uma ","...
  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    // essa variavel irá pegar o numero depois do '.' e transformar ele em numero...
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay;
    }
  }

  // Essa classe irá deletar o ultimo numero...
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand))return;

    switch (this.operation) {
      case '+':
        result = _previousOperand + _currentOperand;
        break;
      case '-':
        result = _previousOperand - _currentOperand;
        break;
      case '÷':
        result = _previousOperand / _currentOperand;
        break;
      case '*':
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;  
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
  }

  // Este método vai fazer as operações a partir dos button...
  chooseOperation(operation) {

    // SE nenhum numero for clicado, a operação não poderá ser clicada...
    if (this.currentOperand === '') return;

    // SE um operador for apertado mais de uma vez ele vai calcular...
    if (this.previousOperand != '') {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // Este método é para pegar o conteudo do button que está clicando...
  appendNumber(number) {
    // SE o currentOperand já tiver um '.' ai ele retorn e não executa outra vez...
    if (this.currentOperand.includes('.') && number === '.') return; 

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  // Criando um método para limpar...
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  // Atualizando os elementos de texto...
  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = 
    this.formatDisplayNumber(this.currentOperand);
  }
}

// Instaciando a calculator...
const calculator = new Calculator(
  previousOperandTextElement, 
  currentOperandTextElement
);

// Pegando todos os numbersButtons...
for (const numberButton of numberButtons) {
  numberButton.addEventListener('click', () => {
    calculator.appendNumber(numberButton.innerText)
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener('click', () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  })
}

// Quando clicar no all clear ele vai apagar...
allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})