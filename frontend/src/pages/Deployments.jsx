import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { motion } from 'framer-motion';
import {
  Rocket, Globe, Server, Container, Cloud, CheckCircle2,
  XCircle, Loader2, Clock, ExternalLink, Plus
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import GlassCard from '@/components/shared/GlassCard.jsx';

const targetIcons = { vercel: Globe, render: Server, railway: Cloud, docker: Container, kubernetes: Server };
const statusConfig = {
  pending: { color: 'bg-muted text-muted-foreground', icon: Clock },
  building: { color: 'bg-neon-cyan/10 text-neon-cyan', icon: Loader2 },
  deploying: { color: 'bg-neon-purple/10 text-neon-purple', icon: Loader2 },
  live: { color: 'bg-emerald-400/10 text-emerald-400', icon: CheckCircle2 },
  failed: { color: 'bg-red-400/10 text-red-400', icon: XCircle },
  rolled_back: { color: 'bg-yellow-400/10 text-yellow-400', icon: Clock },
};

export default function Deployments() {
  const [target, setTarget] = useState('vercel');
  const [projectId, setProjectId] = useState('');
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: deploymentsData = [] } = useQuery({
    queryKey: ['deployments'],
    queryFn: () => apiClient.deployments.list(),
  });

  const { data: projectsData = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient.projects.list(),
  });

  const deployments = Array.isArray(deploymentsData) ? deploymentsData : [];
  const projects = Array.isArray(projectsData) ? projectsData : [];

  const deployMutation = useMutation({
    mutationFn: async () => {
      const dep = await apiClient.deployments.create({
        project_id: projectId,
        target: target,
        status: 'building',
        environment: 'production',
        version: `v1.${Math.floor(Math.random() * 99)}.0`,
      });

      // Simulate deployment
      setTimeout(async () => {
        await apiClient.deployments.update(dep.id, {
          status: 'live',
          url: `https://${projects.find(p => p.id === projectId)?.name?.toLowerCase().replace(/\s+/g, '-') || 'app'}.${target}.app`,
        });
        queryClient.invalidateQueries({ queryKey: ['deployments'] });
      }, 3000);

      return dep;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
      setOpen(false);
      toast.success(`Deployment to ${target} started!`);
    },
    onError: () => toast.error('Deployment failed'),
  });

  const liveCount = deployments.filter(d => d.status === 'live').length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Deployments</h1>
          <p className="text-muted-foreground mt-1">Deploy and manage your applications</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" /> New Deployment
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-border/50">
            <DialogHeader>
              <DialogTitle className="font-heading">New Deployment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Project</Label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger className="bg-secondary/30 border-border/50">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent className="glass-strong border-border/50">
                    {projects.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Target</Label>
                <Select value={target} onValueChange={setTarget}>
                  <SelectTrigger className="bg-secondary/30 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-strong border-border/50">
                    <SelectItem value="vercel">Vercel</SelectItem>
                    <SelectItem value="render">Render</SelectItem>
                    <SelectItem value="railway">Railway</SelectItem>
                    <SelectItem value="docker">Docker</SelectItem>
                    <SelectItem value="kubernetes">Kubernetes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => deployMutation.mutate()}
                disabled={!projectId || deployMutation.isPending}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:opacity-90"
              >
                {deployMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Rocket className="w-4 h-4 mr-2" /> Deploy</>}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <GlassCard className="p-4"><p className="text-sm text-muted-foreground">Total</p><p className="text-2xl font-heading font-bold">{deployments.length}</p></GlassCard>
        <GlassCard className="p-4" delay={0.05}><p className="text-sm text-muted-foreground">Live</p><p className="text-2xl font-heading font-bold text-emerald-400">{liveCount}</p></GlassCard>
        <GlassCard className="p-4" delay={0.1}><p className="text-sm text-muted-foreground">Failed</p><p className="text-2xl font-heading font-bold text-red-400">{deployments.filter(d => d.status === 'failed').length}</p></GlassCard>
      </div>

      {/* List */}
      <div className="space-y-3">
        {deployments.length === 0 ? (
          <div className="text-center py-16">
            <Rocket className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No deployments yet</p>
          </div>
        ) : (
          deployments.map((dep, i) => {
            const TargetIcon = targetIcons[dep.target] || Globe;
            const status = statusConfig[dep.status] || statusConfig.pending;
            const StatusIcon = status.icon;
            return (
              <GlassCard key={dep.id} className="p-5" delay={i * 0.05}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <TargetIcon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm capitalize">{dep.target}</p>
                      <p className="text-xs text-muted-foreground">{dep.version || 'v1.0.0'} • {dep.environment}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${status.color} flex items-center gap-1`}>
                      <StatusIcon className={`w-3 h-3 ${dep.status === 'building' || dep.status === 'deploying' ? 'animate-spin' : ''}`} />
                      {dep.status}
                    </Badge>
                    {dep.url && (
                      <a href={dep.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> View
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            );
          })
        )}
      </div>
    </div>
  );
}