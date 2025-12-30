'use client';

import { useState } from 'react';
import { Header, Sidebar, SearchModal } from '@/components/layout';
import { AIChatWidget } from '@/components/ai/ChatWidget';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSearchClick={() => setSearchOpen(true)}
        onAIClick={() => setChatOpen(true)}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="pt-16 lg:pl-72 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AIChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
