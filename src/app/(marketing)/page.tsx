/**
 * @file Landing Page
 * @description Marketing website for direct customer acquisition
 * 
 * @owner Dev 2
 * @module marketing
 * 
 * @see ProductRequirementsDocument.txt Section 6.5 for landing page requirements
 * 
 * SECTIONS:
 * - Hero with CTA
 * - Card design gallery
 * - How it works
 * - Direct order form
 * - Become an agent section
 * - FAQ
 * - Footer
 */

export default function LandingPage() {
    return (
        <main className="min-h-screen">
            {/* 
        TODO: Implement landing page sections
        
        1. Hero Section
           - Headline: "Your Digital Business Card"
           - Subheadline: Explain NFC technology simply
           - CTA: "Order Your Card" / "Watch Demo"
           - Hero image/animation
        
        2. Card Design Gallery
           - Carousel/grid of card designs
           - Click to enlarge
           - Prices shown
        
        3. How It Works
           - Step 1: Order your card
           - Step 2: Receive & customize
           - Step 3: Tap to share
        
        4. Direct Order Form (or link to /order)
           - Customer details
           - Photo upload
           - Card selection
           - Shipping address
        
        5. Become an Agent Section
           - Benefits
           - CTA: "Join as Agent"
        
        6. FAQ Section
           - Common questions accordion
        
        7. Footer
           - Links: Privacy, Terms, Contact
           - Social links
           - WhatsApp button
        
        See ProductRequirementsDocument.txt Section 6.5 for full details
      */}

            <section className="max-w-6xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center">TapOnce</h1>
                <p className="text-xl text-center text-gray-600 mt-4">
                    Your Digital Business Card - Share with a Tap
                </p>
                <p className="text-center text-sm text-gray-400 mt-8">
                    Owner: Dev 2 | Module: marketing
                </p>
            </section>
        </main>
    )
}
