/**
 * @file Agent Dashboard Home
 * @description Overview page for agents with stats and quick actions
 * 
 * @owner Dev 2
 * @module agent
 * 
 * @see ProductRequirementsDocument.txt Section 6.2.1 for agent dashboard requirements
 * 
 * DISPLAYS:
 * - Overview cards (total sales, earnings, balance, received)
 * - Quick actions (new order, view orders, request payout)
 * - Recent orders summary
 * - Referral code display
 */

export default function AgentDashboard() {
    return (
        <div className="p-6">
            {/* 
        TODO: Implement agent dashboard
        
        1. Welcome message with agent name
        
        2. Overview Cards (4 cards)
           - Total Sales (lifetime card count)
           - Total Earnings (lifetime commission)
           - Available Balance (ready to withdraw)
           - Amount Received (lifetime payouts)
        
        3. Quick Actions
           - [+ Submit New Order] button (primary)
           - [View My Orders] button
           - [Request Payout] button
        
        4. Referral Code Section
           - Large display: "PRINCE10"
           - Copy button
           - QR code
           - Share via WhatsApp button
        
        5. Recent Orders (last 5)
           - Order card previews
           - Link to full orders page
        
        See ProductRequirementsDocument.txt Section 6.2 for full details
      */}

            <h1 className="text-2xl font-bold">Agent Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back!</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-lg shadow">
                    <p className="text-sm text-gray-500">Total Sales</p>
                    <p className="text-2xl font-bold">--</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                    <p className="text-sm text-gray-500">Total Earnings</p>
                    <p className="text-2xl font-bold">₹--</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <p className="text-2xl font-bold">₹--</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                    <p className="text-sm text-gray-500">Amount Received</p>
                    <p className="text-2xl font-bold">₹--</p>
                </div>
            </div>

            <p className="text-center text-sm text-gray-400 mt-8">
                Owner: Dev 2 | Module: agent
            </p>
        </div>
    )
}
