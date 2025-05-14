import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PDAState } from '../lib/pdaSimulator';

interface StateVisualizationProps {
  currentState: PDAState;
}

const StateVisualization: React.FC<StateVisualizationProps> = ({ currentState }) => {
  // Define state display properties
  const states = [
    { id: PDAState.INITIAL, label: 'q₀', description: 'Initial' },
    { id: PDAState.PROCESSING, label: 'q₁', description: 'Processing' },
    { id: PDAState.ACCEPT, label: 'qₐ', description: 'Accept' },
    { id: PDAState.REJECT, label: 'qᵣ', description: 'Reject' }
  ];
  
  // Get styling for each state
  const getStateStyle = (state: PDAState) => {
    const isActive = state === currentState;
    
    const baseClasses = "relative flex flex-col items-center";
    const circleBaseClasses = "flex items-center justify-center w-16 h-16 rounded-full font-medium text-lg transition-all duration-300";
    
    let stateSpecificClasses = '';
    
    switch (state) {
      case PDAState.INITIAL:
        stateSpecificClasses = isActive 
          ? "bg-blue-600 text-white ring-4 ring-blue-200" 
          : "bg-blue-100 text-blue-700";
        break;
      case PDAState.PROCESSING:
        stateSpecificClasses = isActive 
          ? "bg-purple-600 text-white ring-4 ring-purple-200" 
          : "bg-purple-100 text-purple-700";
        break;
      case PDAState.ACCEPT:
        stateSpecificClasses = isActive 
          ? "bg-green-600 text-white ring-4 ring-green-200" 
          : "bg-green-100 text-green-700";
        break;
      case PDAState.REJECT:
        stateSpecificClasses = isActive 
          ? "bg-red-600 text-white ring-4 ring-red-200" 
          : "bg-red-100 text-red-700";
        break;
    }
    
    // Add scale animation when active
    const activeAnimation = isActive ? "transform scale-110" : "";
    
    return {
      container: baseClasses,
      circle: `${circleBaseClasses} ${stateSpecificClasses} ${activeAnimation}`
    };
  };
  
  // Get label classes based on current state
  const getLabelClass = (state: PDAState) => {
    const isActive = state === currentState;
    return `mt-2 text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-600'}`;
  };
  
  return (
    <div className="flex flex-col">
      <div className="flex justify-around items-center">
        {states.map((state, index) => (
          <React.Fragment key={state.id}>
            {index > 0 && (
              <div className="flex-grow flex justify-center">
                <ArrowRight className="text-slate-300" size={24} />
              </div>
            )}
            <div className={getStateStyle(state.id).container}>
              <div className={getStateStyle(state.id).circle}>
                {state.label}
              </div>
              <div className={getLabelClass(state.id)}>
                {state.description}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StateVisualization;