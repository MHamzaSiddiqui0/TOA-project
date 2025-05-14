import React from 'react';
import { ArrowRight } from 'lucide-react';
import PDAVisualizer from './components/PDAVisualizer';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">About This PDA</h2>
            <p className="mb-4">
              This visualization demonstrates a Pushdown Automaton (PDA) that validates balanced brackets.
              The PDA checks if parentheses <span className="font-mono">()</span>, square brackets <span className="font-mono">[]</span>, and curly braces <span className="font-mono">{"{}"}</span> are properly balanced.
            </p>
            <div className="space-y-2 mb-4">
              <h3 className="font-medium">The PDA has four states:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-medium mr-2 text-sm">q₀</span> Initial state</li>
                <li><span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-medium mr-2 text-sm">q₁</span> Processing state</li>
                <li><span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 font-medium mr-2 text-sm">qₐ</span> Accept state</li>
                <li><span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 font-medium mr-2 text-sm">qᵣ</span> Reject state</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mb-4">
              <h3 className="font-medium mb-2">Example valid strings:</h3>
              <div className="flex flex-wrap gap-2">
                <code className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded font-mono">()</code>
                <code className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded font-mono">[]</code>
                <code className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded font-mono">{"{}"}</code>
                <code className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded font-mono">([])</code>
                <code className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded font-mono">([{}])</code>
                <span className="inline-flex items-center"><ArrowRight size={16} className="text-slate-400 mx-1" /> Try these!</span>
              </div>
            </div>
          </div>
          
          <PDAVisualizer />
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-slate-500 border-t border-slate-200">
        PDA Visualization Tool © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;