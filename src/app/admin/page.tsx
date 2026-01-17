/**
 * @file Admin Dashboard Home
 * @description Overview page for admin with key metrics
 * 
 * @owner Dev 1
 * @module admin
 * 
 * @see ProductRequirementsDocument.txt Section 6.1 for admin requirements
 * 
 * DISPLAYS:
 * - Today's metrics (orders, revenue)
 * - Pending approvals count
 * - Recent orders quick view
 * - Agent performance summary
 * - Alerts/notifications
 */

export default function AdminDashboard() {
    return (
        <div className="p-6">
            {/* 
        TODO: Implement admin dashboard
        
        1. Header
           - "Dashboard" title
           - Date/time
           - Notification bell
        
        2. Quick Stats Cards
           - Today's Orders
           - Today's Revenue
           - Pending Approvals (click to go to orders)
           - Pending Payouts
        
        3. Recent Orders (last 5)
           - Order card previews
           - Link to full Kanban
        
        4. Agent Leaderboard (top 5)
           - Name, sales this month
        
        5. Alerts Section
           - Stuck orders >7 days
           - COD overdue
           - Pending payouts >14 days
        
        See ProductRequirementsDocument.txt Section 6.1 for full details
      */}

            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, Admin</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-lg shadow">
                    <p className="text-sm text-gray-500">Placeholder</p>
                    <p className="text-2xl font-bold">--</p>
                </div>
            </div>

            <p className="text-center text-sm text-gray-400 mt-8">
                Owner: Dev 1 | Module: admin
            </p>
        </div>
    )
}
