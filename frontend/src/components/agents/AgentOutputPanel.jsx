import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
  CheckCircle2, XCircle, Loader2, Copy, Check, Download,
  ChevronDown, ChevronRight, File, Terminal, BarChart2,
  History, RefreshCw, Clock, Zap, FileCode, AlertCircle,
  ChevronUp, Maximize2, Minimize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const StatusBar = ({ status, startTime, tokensUsed }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (status === 'running') {
      const interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status, startTime]);

  const statusConfig = {
    queued: { color: 'text-muted-foreground', icon: Clock, label: 'Queued' },
    running: { color: 'text-neon-cyan', icon: Loader2, label: 'Running', spin: true },
    completed: { color: 'text-emerald-400', icon: CheckCircle2, label: 'Completed' },
    failed: { color: 'text-red-400', icon: XCircle, label: 'Failed' },
  };

  const cfg = statusConfig[status] || statusConfig.queued;
  const Icon = cfg.icon;

  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground px-4 py-2 border-b border-border/40 bg-secondary/20">
      <div className={`flex items-center gap-1.5 ${cfg.color}`}>
        <Icon className={`w-3.5 h-3.5 ${cfg.spin ? 'animate-spin' : ''}`} />
        <span className="font-medium">{cfg.label}</span>
      </div>
      {status === 'running' && (
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {elapsed}s</span>
      )}
      {tokensUsed > 0 && (
        <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-primary" /> {tokensUsed.toLocaleString()} tokens</span>
      )}
    </div>
  );
};

const StreamingText = ({ text, isStreaming }) => {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const endRef = useRef(null);

  useEffect(() => {
    if (!text) { setDisplayed(''); setIdx(0); return; }
    if (!isStreaming) { setDisplayed(text); return; }
    setDisplayed('');
    setIdx(0);
  }, [text, isStreaming]);

  useEffect(() => {
    if (!isStreaming || !text || idx >= text.length) return;
    const speed = text.length > 2000 ? 2 : 8;
    const chunkSize = text.length > 2000 ? 20 : 3;
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, idx + chunkSize));
      setIdx(i => i + chunkSize);
    }, speed);
    return () => clearTimeout(timer);
  }, [isStreaming, text, idx]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [displayed]);

  return (
    <div className="relative">
      <div className="prose prose-invert prose-sm max-w-none text-foreground/90 leading-relaxed">
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              if (inline) {
                return <code className="bg-secondary/60 text-primary px-1.5 py-0.5 rounded text-xs font-mono" {...props}>{children}</code>;
              }
              const lang = /language-(\w+)/.exec(className || '')?.[1] || '';
              return (
                <div className="my-3 rounded-lg overflow-hidden border border-border/40">
                  {lang && (
                    <div className="flex items-center justify-between px-3 py-1.5 bg-secondary/50 border-b border-border/40">
                      <span className="text-xs text-muted-foreground font-mono">{lang}</span>
                      <button
                        onClick={() => { navigator.clipboard.writeText(String(children)); toast.success('Copied!'); }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <pre className="p-4 overflow-x-auto text-xs bg-card/60 m-0">
                    <code className="font-mono text-foreground/85">{children}</code>
                  </pre>
                </div>
              );
            },
            h1: ({ children }) => <h1 className="text-xl font-heading font-bold mt-4 mb-2 text-foreground">{children}</h1>,
            h2: ({ children }) => <h2 className="text-lg font-heading font-semibold mt-3 mb-2 text-foreground">{children}</h2>,
            h3: ({ children }) => <h3 className="text-base font-heading font-semibold mt-3 mb-1.5 text-foreground">{children}</h3>,
            ul: ({ children }) => <ul className="my-2 ml-4 space-y-1 list-disc">{children}</ul>,
            ol: ({ children }) => <ol className="my-2 ml-4 space-y-1 list-decimal">{children}</ol>,
            li: ({ children }) => <li className="text-foreground/85 text-sm">{children}</li>,
            p: ({ children }) => <p className="my-2 text-sm text-foreground/85 leading-relaxed">{children}</p>,
            strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
            blockquote: ({ children }) => <blockquote className="border-l-2 border-primary/50 pl-3 my-2 text-muted-foreground italic">{children}</blockquote>,
            table: ({ children }) => <div className="overflow-x-auto my-3"><table className="w-full text-xs border-collapse">{children}</table></div>,
            th: ({ children }) => <th className="border border-border/40 px-2 py-1.5 bg-secondary/50 font-medium text-left">{children}</th>,
            td: ({ children }) => <td className="border border-border/40 px-2 py-1.5">{children}</td>,
          }}
        >
          {displayed || ''}
        </ReactMarkdown>
      </div>
      {isStreaming && idx < (text?.length || 0) && (
        <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5 align-middle rounded-sm" />
      )}
      <div ref={endRef} />
    </div>
  );
};

const FileTree = ({ files }) => {
  const [openFile, setOpenFile] = useState(null);
  const [copied, setCopied] = useState(null);

  if (!files?.length) {
    return (
      <div className="text-center py-10">
        <FileCode className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">No files generated yet</p>
      </div>
    );
  }

  const copyFile = async (file, idx) => {
    await navigator.clipboard.writeText(file.content || '');
    setCopied(idx);
    toast.success('File content copied!');
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadFile = (file) => {
    const blob = new Blob([file.content || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name || 'file.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const langColors = {
    typescript: 'text-blue-400', javascript: 'text-yellow-400', python: 'text-green-400',
    rust: 'text-orange-400', go: 'text-neon-cyan', yaml: 'text-pink-400',
    json: 'text-yellow-300', markdown: 'text-muted-foreground', dockerfile: 'text-neon-cyan',
    sql: 'text-purple-400', html: 'text-orange-300', css: 'text-blue-300',
  };

  return (
    <div className="space-y-2">
      {files.map((file, idx) => (
        <div key={idx} className="border border-border/40 rounded-lg overflow-hidden">
          <div
            className="flex items-center gap-2 px-3 py-2.5 bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
            onClick={() => setOpenFile(openFile === idx ? null : idx)}
          >
            <FileCode className={`w-4 h-4 flex-shrink-0 ${langColors[file.language] || 'text-muted-foreground'}`} />
            <span className="text-sm font-mono flex-1 truncate">{file.path || file.name || `file-${idx + 1}`}</span>
            <div className="flex items-center gap-2 ml-auto">
              {file.language && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">{file.language}</Badge>
              )}
              <button onClick={(e) => { e.stopPropagation(); copyFile(file, idx); }} className="text-muted-foreground hover:text-foreground p-1">
                {copied === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button onClick={(e) => { e.stopPropagation(); downloadFile(file); }} className="text-muted-foreground hover:text-foreground p-1">
                <Download className="w-3.5 h-3.5" />
              </button>
              {openFile === idx ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
            </div>
          </div>
          <AnimatePresence>
            {openFile === idx && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <pre className="p-4 text-xs font-mono text-foreground/80 whitespace-pre-wrap max-h-72 overflow-y-auto bg-card/30 border-t border-border/40">
                  {file.content || '// No content'}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <Button
        size="sm"
        variant="outline"
        className="w-full border-border/40 mt-2"
        onClick={() => {
          files.forEach(f => {
            const blob = new Blob([f.content || ''], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = f.name || 'file.txt';
            a.click();
            URL.revokeObjectURL(url);
          });
          toast.success(`Downloading ${files.length} files`);
        }}
      >
        <Download className="w-4 h-4 mr-2" />
        Download All ({files.length} files)
      </Button>
    </div>
  );
};

const LogsPanel = ({ logs = [], status }) => {
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  const defaultLogs = status === 'running' ? [
    { time: '00:00', level: 'info', msg: 'Agent initialized' },
    { time: '00:01', level: 'info', msg: 'Connecting to LLM...' },
    { time: '00:02', level: 'info', msg: 'Processing request...' },
  ] : status === 'completed' ? [
    { time: '00:00', level: 'info', msg: 'Agent initialized' },
    { time: '00:01', level: 'info', msg: 'LLM connection established' },
    { time: '00:02', level: 'info', msg: 'Generating response...' },
    { time: '00:03', level: 'success', msg: 'Response generated successfully' },
    { time: '00:04', level: 'success', msg: 'Run completed' },
  ] : [];

  const displayLogs = logs.length > 0 ? logs : defaultLogs;

  return (
    <div className="font-mono text-xs bg-card/30 rounded-lg p-4 max-h-72 overflow-y-auto">
      {displayLogs.length === 0 ? (
        <p className="text-muted-foreground">No logs yet</p>
      ) : (
        displayLogs.map((log, i) => (
          <div key={i} className="flex items-start gap-3 py-0.5">
            <span className="text-muted-foreground/60 flex-shrink-0">[{log.time}]</span>
            <span className={
              log.level === 'error' ? 'text-red-400' :
              log.level === 'success' ? 'text-emerald-400' :
              log.level === 'warn' ? 'text-yellow-400' :
              'text-foreground/70'
            }>{log.msg}</span>
          </div>
        ))
      )}
      {status === 'running' && (
        <div className="flex items-center gap-2 py-0.5 text-neon-cyan">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Processing...</span>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
};

const MetricsPanel = ({ run }) => {
  const metrics = [
    { label: 'Status', value: run?.status || '—', highlight: run?.status === 'completed' ? 'text-emerald-400' : run?.status === 'failed' ? 'text-red-400' : 'text-neon-cyan' },
    { label: 'Tokens Used', value: run?.tokens_used ? run.tokens_used.toLocaleString() : '—' },
    { label: 'Files Generated', value: run?.output_files?.length || 0 },
    { label: 'Agent Type', value: run?.agent_type?.replace(/_/g, ' ') || '—' },
    { label: 'Created', value: run?.created_date ? new Date(run.created_date).toLocaleString() : '—' },
    { label: 'Duration', value: run?.duration_ms ? `${(run.duration_ms / 1000).toFixed(1)}s` : '—' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map(m => (
        <div key={m.label} className="bg-secondary/30 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
          <p className={`text-sm font-semibold capitalize ${m.highlight || ''}`}>{m.value}</p>
        </div>
      ))}
    </div>
  );
};

export default function AgentOutputPanel({ run, isStreaming = false, onRetry, className = '' }) {
  const [tab, setTab] = useState('response');
  const [expanded, setExpanded] = useState(true);
  const startTimeRef = useRef(Date.now());

  const copyAll = () => {
    const text = run?.output || '';
    navigator.clipboard.writeText(text);
    toast.success('Output copied to clipboard!');
  };

  if (!run) return null;

  const hasFiles = run.output_files?.length > 0;
  const fileCount = run.output_files?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass rounded-xl overflow-hidden border border-border/50 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-secondary/20">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
            run.status === 'completed' ? 'bg-emerald-400' :
            run.status === 'running' ? 'bg-neon-cyan animate-pulse' :
            run.status === 'failed' ? 'bg-red-400' :
            'bg-muted-foreground'
          }`} />
          <span className="text-sm font-heading font-semibold capitalize truncate">
            {run.agent_type?.replace(/_/g, ' ')} Agent
          </span>
          {run.status === 'running' && (
            <Badge className="bg-neon-cyan/10 text-neon-cyan text-xs animate-pulse">Running</Badge>
          )}
          {run.status === 'completed' && (
            <Badge className="bg-emerald-400/10 text-emerald-400 text-xs">Done</Badge>
          )}
          {run.status === 'failed' && (
            <Badge className="bg-red-400/10 text-red-400 text-xs">Failed</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {run.status === 'failed' && onRetry && (
            <Button size="sm" variant="ghost" onClick={onRetry} className="h-7 text-xs text-muted-foreground hover:text-foreground">
              <RefreshCw className="w-3 h-3 mr-1" /> Retry
            </Button>
          )}
          {run.status === 'completed' && (
            <button onClick={copyAll} className="text-muted-foreground hover:text-foreground transition-colors p-1.5">
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
          <button onClick={() => setExpanded(e => !e)} className="text-muted-foreground hover:text-foreground p-1.5">
            {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Status bar */}
      <StatusBar status={run.status} startTime={startTimeRef.current} tokensUsed={run.tokens_used || 0} />

      {/* Prompt preview */}
      {run.input && (
        <div className="px-4 py-2.5 bg-secondary/10 border-b border-border/30">
          <p className="text-xs text-muted-foreground font-medium mb-0.5">Prompt</p>
          <p className="text-sm text-foreground/80 line-clamp-2">{run.input}</p>
        </div>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <div className="px-4 pt-3 pb-0 border-b border-border/40">
                <TabsList className="bg-transparent h-8 gap-1 p-0">
                  <TabsTrigger value="response" className="text-xs h-7 data-[state=active]:bg-secondary/50">
                    <Terminal className="w-3 h-3 mr-1.5" /> Response
                  </TabsTrigger>
                  <TabsTrigger value="files" className="text-xs h-7 data-[state=active]:bg-secondary/50">
                    <File className="w-3 h-3 mr-1.5" /> Files
                    {hasFiles && <span className="ml-1 bg-primary/20 text-primary rounded-full px-1.5 text-[10px]">{fileCount}</span>}
                  </TabsTrigger>
                  <TabsTrigger value="logs" className="text-xs h-7 data-[state=active]:bg-secondary/50">
                    <Terminal className="w-3 h-3 mr-1.5" /> Logs
                  </TabsTrigger>
                  <TabsTrigger value="metrics" className="text-xs h-7 data-[state=active]:bg-secondary/50">
                    <BarChart2 className="w-3 h-3 mr-1.5" /> Metrics
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="response" className="p-4 mt-0 min-h-[180px]">
                {run.status === 'queued' && (
                  <div className="flex items-center gap-3 text-muted-foreground py-6">
                    <Clock className="w-5 h-5 animate-pulse" />
                    <span className="text-sm">Waiting in queue...</span>
                  </div>
                )}
                {run.status === 'running' && !run.output && (
                  <div className="space-y-3 py-4">
                    <div className="flex items-center gap-3 text-neon-cyan">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm font-medium">Agent is working...</span>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="h-3 bg-secondary/50 rounded animate-pulse w-3/4" />
                      <div className="h-3 bg-secondary/50 rounded animate-pulse w-full" />
                      <div className="h-3 bg-secondary/50 rounded animate-pulse w-2/3" />
                      <div className="h-3 bg-secondary/50 rounded animate-pulse w-5/6" />
                      <div className="h-3 bg-secondary/50 rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                )}
                {run.status === 'failed' && (
                  <div className="flex items-start gap-3 text-red-400 py-4">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Agent run failed</p>
                      <p className="text-xs text-red-400/70 mt-1">{run.error || 'An unexpected error occurred. Please retry.'}</p>
                    </div>
                  </div>
                )}
                {run.output && (
                  <StreamingText text={run.output} isStreaming={isStreaming} />
                )}
              </TabsContent>

              <TabsContent value="files" className="p-4 mt-0 min-h-[180px]">
                <FileTree files={run.output_files} />
              </TabsContent>

              <TabsContent value="logs" className="p-4 mt-0 min-h-[180px]">
                <LogsPanel status={run.status} />
              </TabsContent>

              <TabsContent value="metrics" className="p-4 mt-0 min-h-[180px]">
                <MetricsPanel run={run} />
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}