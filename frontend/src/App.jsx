import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Page imports
import Landing from './pages/Landing';
import Features from './pages/Features';
import About from './pages/About';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';
import ProjectDetail from './pages/ProjectDetail';
import Agents from './pages/Agents';
import CodeStudio from './pages/CodeStudio';
import Security from './pages/Security';
import Testing from './pages/Testing';
import Documentation from './pages/Documentation';
import Deployments from './pages/Deployments';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import MigrationGuide from './pages/MigrationGuide/index';
import AppLayout from './components/layout/AppLayout.jsx';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground font-body">Loading CodePilot AI...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<Features />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/migration-guide" element={<MigrationGuide />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<NewProject />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/code-studio" element={<CodeStudio />} />
        <Route path="/security" element={<Security />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/deployments" element={<Deployments />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <Sonner
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: { background: 'hsl(260 50% 6%)', border: '1px solid hsl(260 20% 16%)', color: 'hsl(210 40% 98%)' },
          }}
        />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App