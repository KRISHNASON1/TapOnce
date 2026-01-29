"use client"

import OrderPageContent from "@/components/order/OrderPageContent"
import Navbar from "@/components/layout/Navbar"

export default function OrderPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Navbar />
            <OrderPageContent />
        </main>
    )
}

