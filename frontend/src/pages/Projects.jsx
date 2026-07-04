import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, FolderKanban, MoreVertical, Trash2, ExternalLink, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const statusColors = {
  planning: 'bg-muted text-muted-foreground',
  in_progress: 'bg-neon-cyan/10 text-neon-cyan',
  review: 'bg-neon-purple/10 text-neon-purple',
  testing: 'bg-yellow-400/10 text-yellow-400',
  deployed: 'bg-emerald-400/10 text-emerald-400',
  archived: 'bg-muted text-muted-foreground',
};

export default function Projects() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data: projectsData = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient.projects.list(),
  });
  const projects = Array.isArray(projectsData) ? projectsData : [];

  const deleteMutation = useMutation({
    mutationFn: (id) => apiClient.projects.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted');
    },
    onError: () => toast.error('Failed to delete project'),
  });

  const filtered = projects.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your AI-powered projects</p>
        </div>
        <Link to="/projects/new">
          <Button className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-secondary/30 border-border/50"
        />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass rounded-xl p-6 animate-pulse">
              <div className="h-5 bg-muted rounded w-2/3 mb-3" />
              <div className="h-3 bg-muted rounded w-full mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <FolderKanban className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg">No projects yet</h3>
          <p className="text-muted-foreground text-sm mt-1">Create your first project to get started</p>
          <Link to="/projects/new">
            <Button className="mt-4 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
              <Plus className="w-4 h-4 mr-2" /> Create Project
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-6 hover:border-primary/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-secondary/50 transition-all">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-strong border-border/50">
                      <DropdownMenuItem onClick={() => deleteMutation.mutate(project.id)} className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link to={`/projects/${project.id}`}>
                  <h3 className="font-heading font-semibold text-base mb-1 hover:text-primary transition-colors">{project.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description || 'No description'}</p>
                <div className="flex items-center justify-between">
                  <Badge className={`text-xs ${statusColors[project.status] || statusColors.planning}`}>
                    {project.status?.replace(/_/g, ' ')}
                  </Badge>
                  {project.framework && (
                    <span className="text-xs text-muted-foreground capitalize">{project.framework}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}