import { useState } from 'react';

const operations = [
  { value: 'add', label: 'Addition (+)' },
  { value: 'subtract', label: 'Subtraction (-)' },
  { value: 'multiply', label: 'Multiplication (×)' },
  { value: 'divide', label: 'Division (÷)' },
];

function parseValue(value) {
  const cleaned = value.trim();
  if (cleaned === '') return null;
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function formatResult(value) {
  return Number.isFinite(value) ? value.toLocaleString() : '';
}

function App() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const computeResult = (event) => {
    event.preventDefault();

    const leftValue = parseValue(firstNumber);
    const rightValue = parseValue(secondNumber);

    if (leftValue === null || rightValue === null) {
      setResult(null);
      setMessage('Please enter two valid numbers.');
      return;
    }

    if (operation === 'divide' && rightValue === 0) {
      setResult(null);
      setMessage('Division by zero is not allowed.');
      return;
    }

    let value;

    switch (operation) {
      case 'subtract':
        value = leftValue - rightValue;
        break;
      case 'multiply':
        value = leftValue * rightValue;
        break;
      case 'divide':
        value = leftValue / rightValue;
        break;
      default:
        value = leftValue + rightValue;
    }

    setResult(value);
    setMessage('');
  };

  return (
    <div className="calculator-shell">
      <div className="calculator-card">
        <h1>React Calculator</h1>
        <p>Enter two numbers and choose the operation to see the result instantly.</p>

        <form className="calculator-form" onSubmit={computeResult}>
          <label className="field">
            <span>First number</span>
            <input
              type="number"
              value={firstNumber}
              onChange={(event) => setFirstNumber(event.target.value)}
              placeholder="0"
            />
          </label>

          <label className="field">
            <span>Second number</span>
            <input
              type="number"
              value={secondNumber}
              onChange={(event) => setSecondNumber(event.target.value)}
              placeholder="0"
            />
          </label>

          <label className="field">
            <span>Operation</span>
            <select value={operation} onChange={(event) => setOperation(event.target.value)}>
              {operations.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button className="primary-button" type="submit">
            Calculate
          </button>
        </form>

        <div className="result-box">
          <p className="result-label">Result</p>
          <p className="result-value">
            {message || (result !== null ? formatResult(result) : 'Waiting for input')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
