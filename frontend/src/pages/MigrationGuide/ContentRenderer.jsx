import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function ContentRenderer({ raw }) {
  const parts = raw.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-1">
      {parts.map((part, i) => {
        if (part.startsWith('```')) {
          const lines = part.split('\n');
          const code = lines.slice(1, -1).join('\n');
          return <CodeBlock key={i} code={code} />;
        }

        return (
          <div key={i}>
            {part.split('\n').map((line, j) => {
              if (line.startsWith('## '))
                return (
                  <h2 key={j} className="text-base font-heading font-bold text-white mt-6 mb-2 pb-2 border-b"
                    style={{ borderColor: 'rgba(139,92,246,0.2)' }}>
                    {line.slice(3)}
                  </h2>
                );

              if (line.startsWith('### '))
                return (
                  <h3 key={j} className="text-sm font-semibold text-purple-300 mt-4 mb-1">
                    {line.slice(4)}
                  </h3>
                );

              if (line.startsWith('- [ ]'))
                return (
                  <div key={j} className="flex items-center gap-2 text-sm text-[#94A3B8] my-1 ml-2">
                    <div className="w-4 h-4 rounded border flex-shrink-0"
                      style={{ borderColor: 'rgba(139,92,246,0.4)' }} />
                    <span>{line.slice(5)}</span>
                  </div>
                );

              if (line.startsWith('- ✅') || line.startsWith('✅'))
                return (
                  <div key={j} className="flex items-start gap-2 text-sm text-emerald-400 my-1">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{line.replace(/^-\s*✅\s*/, '').replace(/^✅\s*/, '')}</span>
                  </div>
                );

              if (line.startsWith('- ⚠️'))
                return (
                  <div key={j} className="flex items-start gap-2 text-sm text-amber-400 my-1">
                    <span className="flex-shrink-0">⚠️</span>
                    <span>{line.slice(5)}</span>
                  </div>
                );

              if (line.startsWith('- '))
                return (
                  <div key={j} className="flex items-start gap-2 text-sm text-[#94A3B8] my-1 ml-2">
                    <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                    <span>{line.slice(2)}</span>
                  </div>
                );

              if (line.startsWith('| '))
                return (
                  <div key={j} className="text-xs font-mono text-[#94A3B8] my-0.5 overflow-x-auto">{line}</div>
                );

              if (line.trim() === '')
                return <div key={j} className="h-2" />;

              return (
                <p key={j} className="text-sm text-[#94A3B8] leading-relaxed">{line}</p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}