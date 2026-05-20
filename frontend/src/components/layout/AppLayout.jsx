import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className="min-h-screen flex flex-col transition-all duration-300"
        style={{ marginLeft: collapsed ? 72 : 240 }}
      >
        <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}