// PDA States
export enum PDAState {
  INITIAL = 'initial',
  PROCESSING = 'processing', 
  ACCEPT = 'accept',
  REJECT = 'reject'
}

// Step in the PDA simulation
export interface SimulationStep {
  state: PDAState;
  stack: string[];
  action?: 'push' | 'pop' | 'initialize' | 'complete';
  input?: string;
  inputPosition: number;
  currentChar?: string;
  previousStackTop?: string;
  rejectReason?: 'mismatch' | 'emptyStack' | 'nonEmptyStack';
}

/**
 * Simulates a Pushdown Automaton for bracket matching
 * The PDA validates if a string of brackets is balanced
 */
export function simulatePDA(input: string): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const stack: string[] = [];
  
  // Initial step - push Z (bottom marker) onto stack
  steps.push({
    state: PDAState.INITIAL,
    stack: ['Z'],
    action: 'initialize',
    input,
    inputPosition: 0,
  });
  
  // Move to processing state
  let currentState = PDAState.PROCESSING;
  stack.push('Z'); // Bottom of stack marker
  
  // Process each character
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    
    // Opening brackets - push to stack
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
      steps.push({
        state: currentState,
        stack: [...stack],
        action: 'push',
        input,
        inputPosition: i,
        currentChar: char,
      });
    }
    // Closing brackets - check if they match the top of stack
    else if (char === ')' || char === ']' || char === '}') {
      // Stack empty (except bottom marker) - error
      if (stack.length <= 1) {
        currentState = PDAState.REJECT;
        steps.push({
          state: currentState,
          stack: [...stack],
          action: 'pop',
          input,
          inputPosition: i,
          currentChar: char,
          rejectReason: 'emptyStack',
        });
        break;
      }
      
      const top = stack.pop()!;
      const previousStack = [...stack, top]; // For visualization
      
      // Check if brackets match
      const isMatch = 
        (char === ')' && top === '(') ||
        (char === ']' && top === '[') ||
        (char === '}' && top === '{');
      
      if (isMatch) {
        steps.push({
          state: currentState,
          stack: [...stack],
          action: 'pop',
          input,
          inputPosition: i,
          currentChar: char,
          previousStackTop: top,
        });
      } else {
        currentState = PDAState.REJECT;
        steps.push({
          state: currentState,
          stack: previousStack, // Show stack before error
          action: 'pop',
          input,
          inputPosition: i,
          currentChar: char,
          previousStackTop: top,
          rejectReason: 'mismatch',
        });
        break;
      }
    }
  }
  
  // After processing all input, check if stack is empty (except Z)
  if (currentState !== PDAState.REJECT) {
    if (stack.length === 1) { // Only Z remains
      currentState = PDAState.ACCEPT;
      steps.push({
        state: currentState,
        stack: [...stack],
        action: 'complete',
        input,
        inputPosition: input.length,
      });
    } else {
      currentState = PDAState.REJECT;
      steps.push({
        state: currentState,
        stack: [...stack],
        action: 'complete',
        input,
        inputPosition: input.length,
        rejectReason: 'nonEmptyStack',
      });
    }
  }
  
  return steps;
}