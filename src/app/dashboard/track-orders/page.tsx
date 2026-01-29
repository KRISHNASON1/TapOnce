/**
 * @file Track Orders Page
 * @description Order tracking page for customers
 * 
 * @owner Dev 2
 * @module customer
 */

'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Package,
    Clock,
    CheckCircle,
    Truck,
    Printer,
    FileCheck,
    XCircle,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Loader2,
    ShoppingBag
} from 'lucide-react'

interface Order {
    id: string
    orderNumber: number
    customerName: string
    customerCompany?: string
    status: string
    paymentStatus: string
    salePrice: number
    trackingNumber?: string
    portfolioSlug?: string
    specialInstructions?: string
    cardDesign?: {
        id: string
        name: string
        preview_url: string
    }
    createdAt: string
    updatedAt: string
    approvedAt?: string
    shippedAt?: string
    deliveredAt?: string
}

const statusConfig: Record<string, {
    label: string;
    color: string;
    bgColor: string;
    icon: typeof Package
}> = {
    pending_approval: {
        label: 'Pending Approval',
        color: 'text-amber-600',
        bgColor: 'bg-amber-100',
        icon: Clock
    },
    approved: {
        label: 'Approved',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        icon: FileCheck
    },
    printing: {
        label: 'Printing',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        icon: Printer
    },
    printed: {
        label: 'Printed',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100',
        icon: CheckCircle
    },
    ready_to_ship: {
        label: 'Ready to Ship',
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-100',
        icon: Package
    },
    shipped: {
        label: 'Shipped',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        icon: Truck
    },
    delivered: {
        label: 'Delivered',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        icon: CheckCircle
    },
    paid: {
        label: 'Completed',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        icon: CheckCircle
    },
    rejected: {
        label: 'Rejected',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        icon: XCircle
    },
    cancelled: {
        label: 'Cancelled',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        icon: XCircle
    }
}

const statusOrder = [
    'pending_approval',
    'approved',
    'printing',
    'printed',
    'ready_to_ship',
    'shipped',
    'delivered'
]

function OrderTimeline({ status }: { status: string }) {
    const currentIndex = statusOrder.indexOf(status)
    const isCompleted = status === 'delivered' || status === 'paid'
    const isCancelled = status === 'rejected' || status === 'cancelled'

    if (isCancelled) {
        return (
            <div className="flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5" />
                <span className="text-sm font-medium">
                    {status === 'rejected' ? 'Order Rejected' : 'Order Cancelled'}
                </span>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                {statusOrder.slice(0, 5).map((s, index) => {
                    const isActive = index <= currentIndex
                    const isCurrent = index === currentIndex
                    return (
                        <div key={s} className="flex items-center">
                            <div
                                className={`w-3 h-3 rounded-full ${isActive
                                        ? isCurrent
                                            ? 'bg-blue-600 ring-4 ring-blue-100'
                                            : 'bg-green-500'
                                        : 'bg-gray-200'
                                    }`}
                            />
                            {index < 4 && (
                                <div
                                    className={`w-8 h-0.5 ${index < currentIndex ? 'bg-green-500' : 'bg-gray-200'
                                        }`}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
                <span>Order</span>
                <span>Print</span>
                <span>Ship</span>
            </div>
        </div>
    )
}

function OrderCard({ order, expanded, onToggle }: {
    order: Order
    expanded: boolean
    onToggle: () => void
}) {
    const config = statusConfig[order.status] || statusConfig.pending_approval
    const StatusIcon = config.icon

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        <Card className="overflow-hidden">
            {/* Header */}
            <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={onToggle}
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        {/* Card Preview */}
                        {order.cardDesign?.preview_url ? (
                            <img
                                src={order.cardDesign.preview_url}
                                alt={order.cardDesign.name}
                                className="w-16 h-10 object-cover rounded border"
                            />
                        ) : (
                            <div className="w-16 h-10 bg-gray-100 rounded border flex items-center justify-center">
                                <Package className="w-5 h-5 text-gray-400" />
                            </div>
                        )}

                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">
                                    Order #{order.orderNumber}
                                </span>
                                <Badge className={`${config.bgColor} ${config.color} border-0`}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {config.label}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {order.cardDesign?.name || 'Custom Card'} • Ordered {formatDate(order.createdAt)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">
                            ₹{order.salePrice}
                        </span>
                        {expanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                    </div>
                </div>
            </div>

            {/* Expanded Details */}
            {expanded && (
                <div className="px-4 pb-4 pt-0 border-t bg-gray-50/50">
                    <div className="pt-4 space-y-4">
                        {/* Timeline */}
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase mb-3">Order Progress</p>
                            <OrderTimeline status={order.status} />
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Payment Status</p>
                                <p className="font-medium capitalize">{order.paymentStatus.replace('_', ' ')}</p>
                            </div>
                            {order.trackingNumber && (
                                <div>
                                    <p className="text-gray-500">Tracking Number</p>
                                    <p className="font-medium font-mono">{order.trackingNumber}</p>
                                </div>
                            )}
                            {order.approvedAt && (
                                <div>
                                    <p className="text-gray-500">Approved On</p>
                                    <p className="font-medium">{formatDate(order.approvedAt)}</p>
                                </div>
                            )}
                            {order.shippedAt && (
                                <div>
                                    <p className="text-gray-500">Shipped On</p>
                                    <p className="font-medium">{formatDate(order.shippedAt)}</p>
                                </div>
                            )}
                            {order.deliveredAt && (
                                <div>
                                    <p className="text-gray-500">Delivered On</p>
                                    <p className="font-medium">{formatDate(order.deliveredAt)}</p>
                                </div>
                            )}
                        </div>

                        {/* Portfolio Link */}
                        {order.portfolioSlug && (
                            <div className="pt-2">
                                <a
                                    href={`/${order.portfolioSlug}`}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View Your Digital Card
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Card>
    )
}

export default function TrackOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [expandedId, setExpandedId] = useState<string | null>(null)

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch('/api/customer/orders')
                if (res.ok) {
                    const data = await res.json()
                    setOrders(data.orders || [])
                    // Auto-expand first order if exists
                    if (data.orders?.length > 0) {
                        setExpandedId(data.orders[0].id)
                    }
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
                <p className="text-gray-500 mb-6">
                    You haven't placed any orders. Start by browsing our card designs!
                </p>
                <a href="/dashboard/discover">
                    <Button className="gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Discover Cards
                    </Button>
                </a>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Track My Orders</h1>
                <p className="text-gray-500 mt-1">
                    View the status and details of your orders
                </p>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {orders.map(order => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        expanded={expandedId === order.id}
                        onToggle={() => setExpandedId(
                            expandedId === order.id ? null : order.id
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
