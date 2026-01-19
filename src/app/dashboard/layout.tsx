/**
 * @file Customer Layout
 * @description Layout wrapper for customer dashboard
 * 
 * @owner Dev 2
 * @module customer
 * 
 * @see ProductRequirementsDocument.txt Section 6.3
 */

'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
    Home,
    User,
    Eye,
    Download,
    LogOut,
    ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigationItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/dashboard/profile', label: 'Edit Profile', icon: User },
    { href: '/dashboard/preview', label: 'Preview', icon: Eye },
    { href: '/dashboard/download', label: 'Download', icon: Download },
]

export default function CustomerLayout({ children }: { children: ReactNode }) {
    const router = useRouter()

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold text-blue-600">TapOnce</h1>
                        <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">My Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <a href="/rahul-verma" target="_blank">
                            <Button variant="outline" size="sm" className="gap-2">
                                <ExternalLink className="w-4 h-4" />
                                View Public Page
                            </Button>
                        </a>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="max-w-4xl mx-auto px-4">
                    <nav className="flex gap-1">
                        {navigationItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-t-lg transition-colors border-b-2 border-transparent"
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t bg-white py-4 mt-8">
                <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
                    Powered by TapOnce | Need help? Contact support
                </div>
            </footer>
        </div>
    )
}
