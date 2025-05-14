import React from 'react';
import { CheckCircle2, XCircle, History } from 'lucide-react';

interface HistoryEntry {
  input: string;
  accepted: boolean;
}

interface HistoryLogProps {
  history: HistoryEntry[];
  onSelectInput: (input: string) => void;
}

const HistoryLog: React.FC<HistoryLogProps> = ({ history, onSelectInput }) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <History size={18} className="text-slate-400 mr-2" />
        <h3 className="text-lg font-medium">Input History</h3>
      </div>
      
      <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
        {history.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center">
              {entry.accepted ? (
                <CheckCircle2 size={16} className="text-green-500 mr-2" />
              ) : (
                <XCircle size={16} className="text-red-500 mr-2" />
              )}
              <code className="font-mono">{entry.input}</code>
            </div>
            <button
              onClick={() => onSelectInput(entry.input)}
              className="text-xs px-2 py-1 text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
            >
              Run again
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryLog;