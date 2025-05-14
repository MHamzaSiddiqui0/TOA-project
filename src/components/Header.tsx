import React from 'react';
import { Box } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Box className="text-indigo-600" size={24} />
            <h1 className="text-xl font-semibold text-slate-900">PDA Visualizer</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">About PDAs</a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">Documentation</a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">Examples</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;