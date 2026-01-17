/**
 * @file Agent Layout
 * @description Layout wrapper for all agent pages with sidebar
 * 
 * @owner Dev 2
 * @module agent
 * 
 * FEATURES:
 * - Sidebar navigation (mobile-responsive)
 * - Header with notifications
 * - Auth protection (agent only)
 */

import { ReactNode } from 'react'

// TODO: Import auth check
// import { requireAgent } from '@/lib/auth'

export default function AgentLayout({ children }: { children: ReactNode }) {
    // TODO: Add auth check
    // await requireAgent()

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                {/* 
          TODO: Implement AgentSidebar component
          - Logo
          - Navigation items from config/navigation.ts
          - Referral code quick display
          - User info at bottom
          - Logout button
        */}
                <div className="p-4">
                    <h2 className="text-xl font-bold text-green-600">TapOnce</h2>
                    <p className="text-xs text-gray-500">Agent Dashboard</p>
                </div>
                <nav className="mt-4">
                    <p className="px-4 text-sm text-gray-400">Navigation placeholder</p>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1">
                {/* Header */}
                <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Agent Dashboard</h1>
                    {/* TODO: Add notification bell, user menu */}
                </header>

                {/* Page content */}
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
