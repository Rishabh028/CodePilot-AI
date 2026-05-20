import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-3">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 p-1.5 rounded-md"
        style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)' }}
      >
        {copied
          ? <Check className="w-3 h-3 text-green-400" />
          : <Copy className="w-3 h-3 text-purple-300" />
        }
      </button>
      <pre
        className="overflow-x-auto text-xs leading-relaxed p-4 rounded-xl"
        style={{ background: '#0D0B1E', border: '1px solid rgba(139,92,246,0.15)', color: '#E2E8F0' }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}