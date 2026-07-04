import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { apiClient } from '@/api/apiClient';
import { motion } from 'framer-motion';
import { User, Bell, Key, Shield, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '@/components/shared/GlassCard.jsx';
import { useAuth } from '@/lib/AuthContext';

export default function Settings() {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => apiClient.auth.me(),
  });
  
  const { logout } = useAuth();

  const [notifications, setNotifications] = useState({
    email: true, security: true, deployments: true, agents: false,
  });

  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        password: '',
      });
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: (data) => apiClient.auth.updateProfile(data),
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['me'] });
      setProfileForm(prev => ({ ...prev, password: '' }));
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update profile');
    }
  });

  const handleSaveProfile = () => {
    const data = {};
    if (profileForm.firstName !== user.firstName) data.firstName = profileForm.firstName;
    if (profileForm.lastName !== user.lastName) data.lastName = profileForm.lastName;
    if (profileForm.password) data.password = profileForm.password;
    
    if (Object.keys(data).length > 0) {
      updateMutation.mutate(data);
    } else {
      toast.info('No changes to save.');
    }
  };

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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input 
                  value={profileForm.firstName} 
                  onChange={e => setProfileForm({...profileForm, firstName: e.target.value})}
                  className="bg-secondary/30 border-border/50" 
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input 
                  value={profileForm.lastName} 
                  onChange={e => setProfileForm({...profileForm, lastName: e.target.value})}
                  className="bg-secondary/30 border-border/50" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ''} disabled className="bg-secondary/30 border-border/50 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <Label>New Password (Optional)</Label>
              <Input 
                type="password"
                placeholder="Leave blank to keep current password"
                value={profileForm.password}
                onChange={e => setProfileForm({...profileForm, password: e.target.value})}
                className="bg-secondary/30 border-border/50" 
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={handleSaveProfile} disabled={updateMutation.isPending} className="bg-primary text-primary-foreground">
                {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Profile
              </Button>
            </div>
          </GlassCard>
          
          <div className="mt-6 flex justify-end">
            <Button variant="destructive" onClick={() => logout()}>
              Sign Out
            </Button>
          </div>
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
              <Button variant="destructive" onClick={() => apiClient.auth.logout()}>Sign Out All Devices</Button>
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