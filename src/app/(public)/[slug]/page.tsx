/**
 * @file Public Tap View Page
 * @description Ultra-fast public profile page accessed via NFC tap
 * 
 * @owner Dev 3
 * @module public
 * 
 * @see docs/ARCHITECTURE.md for performance requirements
 * @see ProductRequirementsDocument.txt Section 6.4 for tap view requirements
 * 
 * CRITICAL REQUIREMENTS:
 * - Load time <3s on 3G, <1.5s on 4G
 * - Static generation (ISR) for instant loading
 * - Minimal JavaScript bundle
 * - Image optimization (WebP, <100KB)
 * 
 * FEATURES:
 * - Profile photo, name, title, company
 * - Bio section (expandable)
 * - Contact info (clickable tel:/mailto:)
 * - Social links row
 * - "Save to Contact" button (vCard download)
 * - "Download Portfolio" (PDF/Image)
 * - "Get Your Card" CTA
 * - Footer with login link
 */

import { notFound } from 'next/navigation'

// TODO: Import from Supabase queries
// import { getCustomerBySlug } from '@/lib/supabase/queries/customers'

interface PageProps {
    params: {
        slug: string
    }
}

/**
 * Generate static params for all active profiles
 * This enables Static Site Generation (SSG) for fast loading
 */
export async function generateStaticParams() {
    // TODO: Fetch all active customer slugs from Supabase
    // const slugs = await getAllActiveCustomerSlugs()
    // return slugs.map((slug) => ({ slug }))
    return []
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps) {
    // TODO: Fetch customer data and return metadata
    return {
        title: `Profile | TapOnce`,
        description: 'Digital business card',
    }
}

export default async function TapViewPage({ params }: PageProps) {
    const { slug } = params

    // TODO: Fetch customer profile from Supabase
    // const profile = await getCustomerBySlug(slug)
    // if (!profile) notFound()

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* 
        TODO: Implement tap view page layout
        
        1. Profile Photo (circular, centered)
        2. Name & Title
        3. Bio section
        4. Contact info (clickable)
        5. Social links row
        6. Save to Contact button
        7. Download Portfolio buttons
        8. "Get Your Card" CTA
        9. Footer with login link
        
        See ProductRequirementsDocument.txt Section 6.4.2 for layout details
      */}

            <div className="max-w-md mx-auto px-4 py-8">
                <p className="text-center text-gray-500">
                    Tap View Page for: {slug}
                </p>
                <p className="text-center text-sm text-gray-400 mt-2">
                    Owner: Dev 3 | Module: public
                </p>
            </div>
        </main>
    )
}
