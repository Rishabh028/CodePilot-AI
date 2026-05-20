import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';

export default function TopBar({ collapsed, setCollapsed }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 border-b border-border/40 bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 flex-shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden md:block">
          Welcome back, <span className="text-foreground font-medium">{user?.full_name?.split(' ')[0] || 'there'}</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/projects/new">
          <Button size="sm" className="bg-primary hover:bg-primary/90 h-8 text-xs gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Project</span>
          </Button>
        </Link>

        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        <button
          onClick={() => logout()}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          title={user?.email}
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}