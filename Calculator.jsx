import { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleButtonClick = (value) => {
    setError('');
    if (value === '=') {
      try {
        
        const expression = input.replace(/×/g, '*').replace(/÷/g, '/');
        
        const evalResult = eval(expression);
        if (isNaN(evalResult) || !isFinite(evalResult)) {
          throw new Error('Invalid operation');
        }
        setResult(evalResult.toString());
        setInput(evalResult.toString());
      } catch (err) {
        setError('Invalid expression');
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
      setError('');
    } else if (value === '←') {
      setInput(input.slice(0, -1));
    } else {
     
      const lastChar = input.slice(-1);
      if (['+', '-', '×', '÷'].includes(lastChar) && ['+', '-', '×', '÷'].includes(value)) {
        setInput(input.slice(0, -1) + value);
      } else {
        setInput(input + value);
      }
    }
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', 'C', '←', '+',
    '='
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="p-5 bg-gray-800 text-white">
          <div className="text-right h-8 text-gray-400 text-sm">
            {error && <span className="text-red-400">{error}</span>}
            {!error && input}
          </div>
          <div className="text-right text-3xl font-semibold mt-2 h-10">
            {result || '0'}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-1 p-1 bg-gray-200">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className={`
                p-4 text-xl font-medium rounded-lg
                ${btn === '=' ? 'col-span-4 bg-blue-600 text-white' : 
                  ['+', '-', '×', '÷'].includes(btn) ? 'bg-gray-300' : 
                  ['C', '←'].includes(btn) ? 'bg-red-400 text-white' : 
                  'bg-white'}
                hover:bg-opacity-90 transition-all
                active:transform active:scale-95
              `}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
