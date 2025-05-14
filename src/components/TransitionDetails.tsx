import React from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import { SimulationStep, PDAState } from '../lib/pdaSimulator';

interface TransitionDetailsProps {
  step: SimulationStep;
  isComplete: boolean;
  isAccepted: boolean;
  currentIndex: number;
  totalSteps: number;
}

const TransitionDetails: React.FC<TransitionDetailsProps> = ({ 
  step, 
  isComplete,
  isAccepted,
  currentIndex,
  totalSteps
}) => {
  // Generate an explanation based on the current step
  const getExplanation = () => {
    if (step.state === PDAState.INITIAL) {
      return "Starting the PDA in initial state q₀. Pushing the bottom stack marker 'Z'.";
    }
    
    if (step.state === PDAState.ACCEPT) {
      return "All input characters have been processed. The stack is empty except for the bottom marker, so the string is accepted.";
    }
    
    if (step.state === PDAState.REJECT) {
      if (step.rejectReason === 'mismatch') {
        return `Encountered closing bracket '${step.currentChar}' that doesn't match the top of the stack '${step.previousStackTop}'. String rejected.`;
      } else if (step.rejectReason === 'emptyStack') {
        return `Encountered closing bracket '${step.currentChar}' but the stack is empty. String rejected.`;
      } else if (step.rejectReason === 'nonEmptyStack') {
        return "All input characters have been processed, but the stack still contains unmatched opening brackets. String rejected.";
      }
      return "String rejected. The PDA entered the reject state.";
    }
    
    if (step.action === 'push') {
      return `Read opening bracket '${step.currentChar}'. Pushing it onto the stack.`;
    }
    
    if (step.action === 'pop') {
      return `Read closing bracket '${step.currentChar}'. It matches the opening bracket '${step.previousStackTop}' on top of the stack. Popping the stack.`;
    }
    
    return "Processing input...";
  };
  
  // Get background color based on state
  const getStatusBgColor = () => {
    if (isComplete) {
      return isAccepted ? 'bg-green-50' : 'bg-red-50';
    }
    return 'bg-blue-50';
  };
  
  // Get icon based on completion state
  const getStatusIcon = () => {
    if (isComplete) {
      return isAccepted 
        ? <CheckCircle2 size={20} className="text-green-600" />
        : <XCircle size={20} className="text-red-600" />;
    }
    return <Info size={20} className="text-blue-600" />;
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Transition Details</h3>
      
      <div className={`p-4 rounded-lg ${getStatusBgColor()}`}>
        <div className="flex items-start">
          <div className="mr-3 pt-0.5">
            {getStatusIcon()}
          </div>
          <div>
            <p className="text-slate-800">{getExplanation()}</p>
            
            {/* Input string status */}
            {step.input && (
              <div className="mt-2 font-mono">
                <div className="text-xs text-slate-500 mb-1">Input string:</div>
                <div className="flex items-center space-x-1 overflow-x-auto pb-1 whitespace-nowrap">
                  {step.input.split('').map((char, idx) => {
                    const isCurrent = idx === step.inputPosition;
                    const isPassed = idx < step.inputPosition;
                    
                    return (
                      <span 
                        key={idx}
                        className={`inline-block px-1.5 py-0.5 border rounded ${
                          isCurrent 
                            ? 'bg-indigo-100 text-indigo-800 border-indigo-300 ring-2 ring-indigo-200' 
                            : isPassed
                              ? 'bg-slate-100 text-slate-400 border-slate-200'
                              : 'bg-white text-slate-800 border-slate-200'
                        }`}
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-slate-500">
        <div>Step {currentIndex + 1} of {totalSteps}</div>
        <div className="flex items-center">
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${(currentIndex + 1) / totalSteps * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransitionDetails;