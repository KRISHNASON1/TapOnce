/**
 * @file Customer Dashboard Home
 * @description Welcome screen for cardholders with quick actions
 * 
 * @owner Dev 3
 * @module dashboard (customer)
 * 
 * @see ProductRequirementsDocument.txt Section 6.3.5 for dashboard requirements
 * 
 * DISPLAYS:
 * - Welcome message
 * - Profile URL with copy button
 * - Quick stats (card activated date, last update)
 * - Quick actions (edit profile, preview, download)
 */

export default function CustomerDashboard() {
    return (
        <div className="p-6">
            {/* 
        TODO: Implement customer dashboard
        
        1. Welcome Message
           - "Hi [Name]! Your card is active."
        
        2. Profile URL Display
           - taponce.in/[slug]
           - Copy button
           - QR code
        
        3. Quick Stats
           - Card activated on: [Date]
           - Last profile update: [Date]
        
        4. Quick Actions
           - [Edit Profile] → /dashboard/profile
           - [Preview Public Page] → Opens tap view in new tab
           - [Download Portfolio] → PDF/Image options
           - [Change Password] → Contact admin or settings
        
        See ProductRequirementsDocument.txt Section 6.3 for full details
      */}

            <h1 className="text-2xl font-bold">Welcome!</h1>
            <p className="text-gray-600 mt-2">Your card is active</p>

            <div className="mt-8 p-6 bg-white rounded-lg shadow">
                <p className="text-sm text-gray-500">Your Profile URL</p>
                <div className="flex items-center gap-2 mt-2">
                    <code className="text-lg font-mono bg-gray-100 px-3 py-1 rounded">
                        taponce.in/your-slug
                    </code>
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                        Copy
                    </button>
                </div>
            </div>

            <p className="text-center text-sm text-gray-400 mt-8">
                Owner: Dev 3 | Module: dashboard
            </p>
        </div>
    )
}
