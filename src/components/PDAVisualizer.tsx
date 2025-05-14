import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import InputForm from './InputForm';
import StateVisualization from './StateVisualization';
import StackVisualization from './StackVisualization';
import TransitionDetails from './TransitionDetails';
import { simulatePDA, PDAState, SimulationStep } from '../lib/pdaSimulator';
import HistoryLog from './HistoryLog';

const PDAVisualizer: React.FC = () => {
  const [input, setInput] = useState('');
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(800); // milliseconds
  const [history, setHistory] = useState<{input: string, accepted: boolean}[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  
  const currentStep = steps[currentStepIndex];
  const simulationComplete = currentStepIndex === steps.length - 1;
  const isAccepted = simulationComplete && currentStep?.state === PDAState.ACCEPT;
  
  const handleInputSubmit = (input: string) => {
    const simulationSteps = simulatePDA(input);
    setSteps(simulationSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setInput(input);
    if (simulationSteps.length > 0) {
      // Only add to history if we got valid steps
      setHistory(prev => [
        { 
          input, 
          accepted: simulationSteps[simulationSteps.length - 1].state === PDAState.ACCEPT 
        }, 
        ...prev.slice(0, 9)
      ]); // Keep last 10 items
    }
  };
  
  const playSimulation = () => {
    if (currentStepIndex < steps.length - 1) {
      setIsPlaying(true);
    }
  };
  
  const pauseSimulation = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  
  const resetSimulation = () => {
    pauseSimulation();
    setCurrentStepIndex(0);
  };
  
  const stepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };
  
  // Effect for animation control
  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      timerRef.current = window.setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, playSpeed);
    } else if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
    
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, steps.length, playSpeed]);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <InputForm onSubmit={handleInputSubmit} />
      </div>
      
      {steps.length > 0 ? (
        <>
          <div className="p-6 border-b border-slate-200">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">PDA States</h3>
                <StateVisualization currentState={currentStep.state} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">Stack</h3>
                <StackVisualization stack={currentStep.stack} />
              </div>
            </div>
          </div>
          
          <div className="p-6 border-b border-slate-200">
            <TransitionDetails 
              step={currentStep} 
              isComplete={simulationComplete}
              isAccepted={isAccepted}
              currentIndex={currentStepIndex}
              totalSteps={steps.length}
            />
          </div>
          
          <div className="p-6 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <button 
                onClick={resetSimulation}
                className="p-2 rounded-full hover:bg-slate-200 transition-colors"
                aria-label="Reset"
              >
                <RotateCcw size={20} />
              </button>
              
              {isPlaying ? (
                <button 
                  onClick={pauseSimulation}
                  className="p-2 rounded-full hover:bg-slate-200 transition-colors"
                  aria-label="Pause"
                >
                  <Pause size={20} />
                </button>
              ) : (
                <button 
                  onClick={playSimulation}
                  disabled={simulationComplete}
                  className={`p-2 rounded-full transition-colors ${
                    simulationComplete ? 'text-slate-400 cursor-not-allowed' : 'hover:bg-slate-200'
                  }`}
                  aria-label="Play"
                >
                  <Play size={20} />
                </button>
              )}
              
              <button 
                onClick={stepForward}
                disabled={simulationComplete}
                className={`p-2 rounded-full transition-colors ${
                  simulationComplete ? 'text-slate-400 cursor-not-allowed' : 'hover:bg-slate-200'
                }`}
                aria-label="Step forward"
              >
                <SkipForward size={20} />
              </button>
              
              <div className="ml-4">
                <label className="text-sm text-slate-600 flex items-center">
                  <span className="mr-2">Speed:</span>
                  <select 
                    value={playSpeed} 
                    onChange={(e) => setPlaySpeed(Number(e.target.value))}
                    className="px-2 py-1 border border-slate-300 rounded text-sm"
                  >
                    <option value={1200}>Slow</option>
                    <option value={800}>Normal</option>
                    <option value={400}>Fast</option>
                    <option value={200}>Very Fast</option>
                  </select>
                </label>
              </div>
            </div>
            
            <div className="flex items-center">
              {simulationComplete && (
                <div className={`flex items-center px-4 py-2 rounded-full ${
                  isAccepted ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {isAccepted ? (
                    <>
                      <CheckCircle2 size={16} className="mr-1.5" />
                      <span className="font-medium">String Accepted</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="mr-1.5" />
                      <span className="font-medium">String Rejected</span>
                    </>
                  )}
                </div>
              )}
              
              <button 
                onClick={() => setShowHistory(!showHistory)} 
                className="ml-4 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                {showHistory ? 'Hide History' : 'Show History'}
              </button>
            </div>
          </div>
          
          {showHistory && history.length > 0 && (
            <div className="p-6 border-t border-slate-200">
              <HistoryLog history={history} onSelectInput={handleInputSubmit} />
            </div>
          )}
        </>
      ) : (
        <div className="p-12 text-center text-slate-500">
          <p>Enter a string to visualize the PDA in action</p>
        </div>
      )}
    </div>
  );
};

export default PDAVisualizer;