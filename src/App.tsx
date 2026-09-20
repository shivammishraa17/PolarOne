import React, { useState } from 'react';
import { MissionProvider, useMission } from './context/MissionContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { DemoScenarioBar } from './components/common/DemoScenarioBar';
import { NotificationDrawer } from './components/common/NotificationDrawer';

// Module views
import { MissionOverview } from './components/dashboard/MissionOverview';
import { ExpeditionPlanner } from './components/expedition/ExpeditionPlanner';
import { StationDigitalTwin } from './components/digitaltwin/StationDigitalTwin';
import { CargoTracking } from './components/cargo/CargoTracking';
import { InventoryManagement } from './components/inventory/InventoryManagement';
import { PersonnelManagement } from './components/personnel/PersonnelManagement';
import { AssetManagement } from './components/assets/AssetManagement';
import { PredictiveIntelligence } from './components/predictive/PredictiveIntelligence';
import { WhatIfSimulator } from './components/simulator/WhatIfSimulator';
import { EmergencyCenter } from './components/emergency/EmergencyCenter';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { ReportsCenter } from './components/reports/ReportsCenter';
import { MissionHistory } from './components/history/MissionHistory';
import { SettingsView } from './components/settings/SettingsView';

const MainLayout: React.FC = () => {
  const { activeTab, alerts } = useMission();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const unreadAlertsCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Header */}
      <Header 
        onToggleNotifications={() => setIsNotificationOpen(true)}
        unreadCount={unreadAlertsCount}
      />

      {/* Persistent Judge Demo Scenario Bar */}
      <DemoScenarioBar />

      {/* Main Body Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Dynamic Viewport Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-[#070D1E] via-[#0A132B] to-[#070D1E]">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <MissionOverview />}
            {activeTab === 'expedition' && <ExpeditionPlanner />}
            {activeTab === 'digitaltwin' && <StationDigitalTwin />}
            {activeTab === 'cargo' && <CargoTracking />}
            {activeTab === 'inventory' && <InventoryManagement />}
            {activeTab === 'personnel' && <PersonnelManagement />}
            {activeTab === 'assets' && <AssetManagement />}
            {activeTab === 'predictive' && <PredictiveIntelligence />}
            {activeTab === 'simulator' && <WhatIfSimulator />}
            {activeTab === 'emergency' && <EmergencyCenter />}
            {activeTab === 'analytics' && <AnalyticsDashboard />}
            {activeTab === 'reports' && <ReportsCenter />}
            {activeTab === 'history' && <MissionHistory />}
            {activeTab === 'settings' && <SettingsView />}
          </div>
        </main>
      </div>

      {/* Slide-over Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <MissionProvider>
      <MainLayout />
    </MissionProvider>
  );
};

export default App;
