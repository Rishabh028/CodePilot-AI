import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const frameworks = ['nextjs', 'react', 'vue', 'angular', 'express', 'nestjs', 'django', 'fastapi', 'other'];

export default function NewProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', description: '', framework: 'nextjs', requirements: '', repository_url: '', visibility: 'private'
  });

  const createMutation = useMutation({
    mutationFn: (data) => apiClient.projects.create(data),
    onSuccess: (project) => {
      toast.success('Project created!');
      navigate(`/projects/${project.id}`);
    },
    onError: () => toast.error('Failed to create project'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('NewProject submit - token:', localStorage.getItem('codepilot_token'));
    createMutation.mutate({ ...form, status: 'planning' });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <h1 className="text-3xl font-heading font-bold">Create Project</h1>
        <p className="text-muted-foreground mt-1">Set up a new AI-powered development project</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="glass rounded-xl p-6 space-y-5"
      >
        <div className="space-y-2">
          <Label>Project Name</Label>
          <Input
            placeholder="My Awesome App"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-secondary/30 border-border/50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Describe your project..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="bg-secondary/30 border-border/50 h-20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Framework</Label>
            <Select value={form.framework} onValueChange={(v) => setForm({ ...form, framework: v })}>
              <SelectTrigger className="bg-secondary/30 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-strong border-border/50">
                {frameworks.map(f => (
                  <SelectItem key={f} value={f} className="capitalize">{f.replace(/js$/, '.js')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Visibility</Label>
            <Select value={form.visibility} onValueChange={(v) => setForm({ ...form, visibility: v })}>
              <SelectTrigger className="bg-secondary/30 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-strong border-border/50">
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Repository URL (optional)</Label>
          <Input
            placeholder="https://github.com/user/repo"
            value={form.repository_url}
            onChange={(e) => setForm({ ...form, repository_url: e.target.value })}
            className="bg-secondary/30 border-border/50"
          />
        </div>

        <div className="space-y-2">
          <Label>
            <span className="flex items-center gap-2">
              Requirements
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </span>
          </Label>
          <Textarea
            placeholder="Describe what you want to build in natural language..."
            value={form.requirements}
            onChange={(e) => setForm({ ...form, requirements: e.target.value })}
            className="bg-secondary/30 border-border/50 h-32"
          />
        </div>

        <Button
          type="submit"
          disabled={!form.name || createMutation.isPending}
          className="w-full bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:opacity-90 h-11"
        >
          {createMutation.isPending ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Rocket className="w-4 h-4 mr-2" />
              Create Project
            </>
          )}
        </Button>
      </motion.form>
    </div>
  );
}