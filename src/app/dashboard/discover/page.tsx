/**
 * @file Discover Page
 * @description Embedded order page for customers to discover and order cards
 * 
 * @owner Dev 2
 * @module customer
 */

'use client'

import OrderPageContent from "@/components/order/OrderPageContent"

export default function DiscoverPage() {
    return (
        <div className="min-h-[80vh] bg-[#050505] text-white rounded-xl overflow-hidden -mx-4 -mt-6">
            <OrderPageContent
                showBackLink={false}
            />
        </div>
    )
}
