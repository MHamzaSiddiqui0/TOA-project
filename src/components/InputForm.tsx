import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface InputFormProps {
  onSubmit: (input: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
    }
  };
  
  const isValidChar = (char: string) => {
    return ['(', ')', '[', ']', '{', '}'].includes(char);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow valid characters
    if (value === '' || value.split('').every(isValidChar)) {
      setInputValue(value);
    }
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Input String</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="pda-input" className="sr-only">Input string of brackets</label>
          <input
            id="pda-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a string of brackets (e.g., ({[]})"
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
            aria-describedby="input-description"
          />
          <p id="input-description" className="mt-1 text-sm text-slate-500">
            Only bracket characters are allowed: (, ), [, ], {"{", "}"}
          </p>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
        >
          <Play size={16} className="mr-1.5" />
          <span>Visualize</span>
        </button>
      </form>
    </div>
  );
};

export default InputForm;