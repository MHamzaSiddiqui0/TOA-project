import React from 'react';

interface StackVisualizationProps {
  stack: string[];
}

const StackVisualization: React.FC<StackVisualizationProps> = ({ stack }) => {
  // Reverse the stack for display (bottom to top)
  const displayStack = [...stack].reverse();
  
  // Get character color based on the bracket type
  const getCharColor = (char: string) => {
    switch (char) {
      case '(':
      case ')':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case '[':
      case ']':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case '{':
      case '}':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Z': // Bottom marker
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      {/* Empty state */}
      {stack.length === 0 && (
        <div className="text-slate-400 italic">Empty stack</div>
      )}
      
      {/* Stack visualization */}
      <div className="flex flex-col-reverse items-center gap-1 min-h-[200px]">
        {displayStack.map((char, index) => (
          <div 
            key={`${index}-${char}`}
            className={`w-16 h-12 flex items-center justify-center border-2 ${getCharColor(char)} font-mono text-xl rounded animate-fadeIn`}
            style={{
              animationDelay: `${index * 0.1}s`,
              // Slight offset for 3D effect
              transform: `translateY(${index * -4}px)`,
              zIndex: displayStack.length - index
            }}
          >
            {char}
          </div>
        ))}
      </div>
      
      {stack.length > 0 && (
        <div className="mt-3 text-sm text-slate-500">
          Stack bottom ↑
        </div>
      )}
    </div>
  );
};

export default StackVisualization;