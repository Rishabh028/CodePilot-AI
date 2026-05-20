import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { User, Bell, Key, Shield, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '@/components/shared/GlassCard.jsx';

export default function Settings() {
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const [notifications, setNotifications] = useState({
    email: true, security: true, deployments: true, agents: false,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => base44.auth.updateMe(data),
  });

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences</p>
      </motion.div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="glass border border-border/50">
          <TabsTrigger value="profile"><User className="w-3.5 h-3.5 mr-1.5" />Profile</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="w-3.5 h-3.5 mr-1.5" />Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="w-3.5 h-3.5 mr-1.5" />Security</TabsTrigger>
          <TabsTrigger value="api"><Key className="w-3.5 h-3.5 mr-1.5" />API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <GlassCard className="p-6 space-y-5">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={user?.full_name || ''} disabled className="bg-secondary/30 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ''} disabled className="bg-secondary/30 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input value={user?.role || 'user'} disabled className="bg-secondary/30 border-border/50 capitalize" />
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="notifications">
          <GlassCard className="p-6 space-y-5">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium capitalize">{key.replace(/_/g, ' ')} Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive alerts for {key} events</p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={(v) => setNotifications({ ...notifications, [key]: v })}
                />
              </div>
            ))}
            <Button className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
              <Save className="w-4 h-4 mr-2" /> Save Preferences
            </Button>
          </GlassCard>
        </TabsContent>

        <TabsContent value="security">
          <GlassCard className="p-6 space-y-5">
            <div>
              <h4 className="font-medium text-sm mb-2">Two-Factor Authentication</h4>
              <p className="text-xs text-muted-foreground mb-3">Add an extra layer of security to your account</p>
              <Button variant="outline" className="border-border/50">Enable 2FA</Button>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Active Sessions</h4>
              <p className="text-xs text-muted-foreground">1 active session</p>
            </div>
            <div>
              <Button variant="destructive" onClick={() => base44.auth.logout()}>Sign Out All Devices</Button>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="api">
          <GlassCard className="p-6 space-y-5">
            <div>
              <h4 className="font-medium text-sm mb-2">API Keys</h4>
              <p className="text-xs text-muted-foreground mb-4">Manage API keys for external integrations</p>
              <div className="bg-secondary/30 rounded-lg p-4 font-mono text-xs text-muted-foreground">
                cp_live_••••••••••••••••••••
              </div>
            </div>
            <Button className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
              <Key className="w-4 h-4 mr-2" /> Generate New Key
            </Button>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}