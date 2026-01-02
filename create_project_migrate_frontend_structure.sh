#!/usr/bin/env bash

set -e

echo "Creating Project Migrate frontend folder structure..."

# Base directory
BASE="frontend/src"

# Create directories
mkdir -p $BASE/components/layout
mkdir -p $BASE/components/ui
mkdir -p $BASE/components/dashboard
mkdir -p $BASE/components/jobs
mkdir -p $BASE/pages
mkdir -p $BASE/hooks
mkdir -p $BASE/utils
mkdir -p $BASE/router
mkdir -p $BASE/styles

# Layout components
touch $BASE/components/layout/AppLayout.tsx
touch $BASE/components/layout/Sidebar.tsx
touch $BASE/components/layout/SidebarItem.tsx
touch $BASE/components/layout/TopBar.tsx
touch $BASE/components/layout/Breadcrumbs.tsx
touch $BASE/components/layout/PageContainer.tsx

# UI components
touch $BASE/components/ui/Card.tsx
touch $BASE/components/ui/Button.tsx
touch $BASE/components/ui/Input.tsx
touch $BASE/components/ui/Toggle.tsx
touch $BASE/components/ui/Slider.tsx
touch $BASE/components/ui/Badge.tsx
touch $BASE/components/ui/ProgressBar.tsx
touch $BASE/components/ui/StatCard.tsx
touch $BASE/components/ui/Toast.tsx
touch $BASE/components/ui/ToastProvider.tsx
touch $BASE/components/ui/Modal.tsx
touch $BASE/components/ui/Tooltip.tsx
touch $BASE/components/ui/Terminal.tsx

# Dashboard components
mkdir -p $BASE/components/dashboard
touch $BASE/components/dashboard/SystemHealthCard.tsx
touch $BASE/components/dashboard/QuickActionsCard.tsx
touch $BASE/components/dashboard/RecentJobsCard.tsx
touch $BASE/components/dashboard/StatsOverviewCard.tsx

# Job components
touch $BASE/components/jobs/JobCard.tsx
touch $BASE/components/jobs/JobGrid.tsx
touch $BASE/components/jobs/JobStats.tsx
touch $BASE/components/jobs/JobHeader.tsx
touch $BASE/components/jobs/JobProgress.tsx
touch $BASE/components/jobs/JobLogs.tsx

# Pages
touch $BASE/pages/DashboardPage.tsx
touch $BASE/pages/MigratePage.tsx
touch $BASE/pages/JobsPage.tsx
touch $BASE/pages/JobDetailsPage.tsx
touch $BASE/pages/SettingsPage.tsx

# Hooks
touch $BASE/hooks/useToast.ts
touch $BASE/hooks/useSidebar.ts
touch $BASE/hooks/useHotkeys.ts
touch $BASE/hooks/usePolling.ts
touch $BASE/hooks/useLogs.ts

# Utils
touch $BASE/utils/classNames.ts
touch $BASE/utils/formatBytes.ts
touch $BASE/utils/formatDuration.ts
touch $BASE/utils/formatDate.ts

# Router
touch $BASE/router/AppRouter.tsx

# Styles
touch $BASE/styles/globals.css

# Entrypoints
touch $BASE/main.tsx
touch $BASE/App.tsx

echo "All folders and placeholder files created successfully!"
