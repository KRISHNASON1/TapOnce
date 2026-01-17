/**
 * @file Customer Layout
 * @description Layout wrapper for customer dashboard pages
 * 
 * @owner Dev 3
 * @module dashboard (customer)
 * 
 * FEATURES:
 * - Simple sidebar/header
 * - Auth protection (customer only)
 * - Mobile-responsive
 */

import { ReactNode } from 'react'

// TODO: Import auth check
// import { requireCustomer } from '@/lib/auth'

export default function CustomerLayout({ children }: { children: ReactNode }) {
    // TODO: Add auth check
    // await requireCustomer()

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                {/* 
          TODO: Implement CustomerSidebar component
          - Logo
          - Navigation items from config/navigation.ts
          - User info at bottom
          - Logout button
        */}
                <div className="p-4">
                    <h2 className="text-xl font-bold text-purple-600">TapOnce</h2>
                    <p className="text-xs text-gray-500">My Dashboard</p>
                </div>
                <nav className="mt-4">
                    <p className="px-4 text-sm text-gray-400">Navigation placeholder</p>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1">
                {/* Header */}
                <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold">My Dashboard</h1>
                    {/* TODO: Add user menu */}
                </header>

                {/* Page content */}
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
