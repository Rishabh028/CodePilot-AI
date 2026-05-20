#!/bin/bash

# Create entities directory and files
mkdir -p src/entities
touch src/entities/AgentRun.jsx
touch src/entities/Conversation.jsx
touch src/entities/Deployment.jsx
touch src/entities/Project.jsx
touch src/entities/SecurityIssue.jsx
touch src/entities/TestSuite.jsx

# Create api directory
mkdir -p src/api
touch src/api/base44Client.js

# Create components subdirectories
mkdir -p src/components/agents
touch src/components/agents/AgentOutputPanel.jsx
touch src/components/agents/AgentPromptInput.jsx

mkdir -p src/components/landing
touch src/components/landing/AgentsSection.jsx
touch src/components/landing/CTASection.jsx
touch src/components/landing/FeaturesSection.jsx
touch src/components/landing/FooterSection.jsx
touch src/components/landing/HeroSection.jsx
touch src/components/landing/HowItWorksSection.jsx
touch src/components/landing/Navbar.jsx
touch src/components/landing/PricingSection.jsx
touch src/components/landing/StatsSection.jsx
touch src/components/landing/TechStackSection.jsx
touch src/components/landing/TestimonialsSection.jsx

mkdir -p src/components/layout
touch src/components/layout/AppLayout.jsx
touch src/components/layout/Sidebar.jsx
touch src/components/layout/TopBar.jsx

mkdir -p src/components/shared
touch src/components/shared/GlassCard.jsx
touch src/components/shared/StatCard.jsx

mkdir -p src/components/ui
touch src/components/ui/accordion.jsx
touch src/components/ui/alert-dialog.jsx
touch src/components/ui/alert.jsx
touch src/components/ui/aspect-ratio.jsx
touch src/components/ui/avatar.jsx
touch src/components/ui/badge.jsx
touch src/components/ui/breadcrumb.jsx
touch src/components/ui/button.jsx
touch src/components/ui/calendar.jsx
touch src/components/ui/card.jsx
touch src/components/ui/carousel.jsx
touch src/components/ui/chart.jsx
touch src/components/ui/checkbox.jsx
touch src/components/ui/collapsible.jsx
touch src/components/ui/command.jsx
touch src/components/ui/context-menu.jsx
touch src/components/ui/dialog.jsx
touch src/components/ui/drawer.jsx
touch src/components/ui/dropdown-menu.jsx
touch src/components/ui/form.jsx
touch src/components/ui/hover-card.jsx
touch src/components/ui/input-otp.jsx
touch src/components/ui/input.jsx
touch src/components/ui/label.jsx
touch src/components/ui/menubar.jsx
touch src/components/ui/navigation-menu.jsx
touch src/components/ui/pagination.jsx
touch src/components/ui/popover.jsx
touch src/components/ui/progress.jsx
touch src/components/ui/radio-group.jsx
touch src/components/ui/resizable.jsx
touch src/components/ui/scroll-area.jsx
touch src/components/ui/select.jsx
touch src/components/ui/separator.jsx
touch src/components/ui/sheet.jsx
touch src/components/ui/sidebar.jsx
touch src/components/ui/skeleton.jsx
touch src/components/ui/slider.jsx
touch src/components/ui/sonner.jsx
touch src/components/ui/switch.jsx
touch src/components/ui/table.jsx
touch src/components/ui/tabs.jsx
touch src/components/ui/textarea.jsx
touch src/components/ui/toast.jsx
touch src/components/ui/toaster.jsx
touch src/components/ui/toggle-group.jsx
touch src/components/ui/toggle.jsx
touch src/components/ui/tooltip.jsx
touch src/components/ui/use-toast.jsx

touch src/components/ProtectedRoute.jsx
touch src/components/UserNotRegisteredError.jsx

# Create hooks directory
mkdir -p src/hooks
touch src/hooks/use-mobile.jsx

# Create lib directory
mkdir -p src/lib
touch src/lib/app-params.js
touch src/lib/AuthContext.jsx
touch src/lib/PageNotFound.jsx
touch src/lib/query-client.js
touch src/lib/utils.js

# Create pages directory and subdirectories
mkdir -p src/pages/MigrationGuide
touch src/pages/About.jsx
touch src/pages/Agents.jsx
touch src/pages/Auth.jsx
touch src/pages/Billing.jsx
touch src/pages/CodeStudio.jsx
touch src/pages/Dashboard.jsx
touch src/pages/Deployments.jsx
touch src/pages/Documentation.jsx
touch src/pages/Features.jsx
touch src/pages/Landing.jsx
touch src/pages/NewProject.jsx
touch src/pages/ProjectDetail.jsx
touch src/pages/Projects.jsx
touch src/pages/Security.jsx
touch src/pages/Settings.jsx
touch src/pages/Testing.jsx

# Create utils directory
mkdir -p src/utils
touch src/utils/index.ts

# Create src root files
touch src/App.jsx
touch src/index.css
touch src/main.jsx

# Create root level config files
touch .gitignore
touch components.json
touch eslint.config.js
touch README.md

echo "Frontend directory structure created successfully!"
