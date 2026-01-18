/**
 * @file Agent Detail Modal
 * @description Modal for viewing agent details, performance, and settings
 * 
 * @owner Dev 1
 */

'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Agent, AgentStatus, Payout } from '@/types/agent'
import {
    User,
    Phone,
    Mail,
    MapPin,
    CreditCard,
    Wallet,
    TrendingUp,
    Package,
    Calendar,
    Copy,
    ExternalLink,
    Pencil,
    UserX,
    UserCheck
} from 'lucide-react'

interface AgentDetailModalProps {
    agent: Agent | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onEdit?: (agent: Agent) => void
    onPay?: (agent: Agent) => void
    onToggleStatus?: (agent: Agent) => void
}

const statusColors: Record<AgentStatus, string> = {
    active: 'bg-green-100 text-green-800 border-green-200',
    inactive: 'bg-gray-100 text-gray-800 border-gray-200'
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export function AgentDetailModal({
    agent,
    open,
    onOpenChange,
    onEdit,
    onPay,
    onToggleStatus
}: AgentDetailModalProps) {
    if (!agent) return null

    const copyReferralCode = () => {
        navigator.clipboard.writeText(agent.referralCode)
    }

    // Mock payouts for display
    const mockPayouts: Payout[] = [
        {
            id: '1',
            agentId: agent.id,
            amount: 5000,
            paymentMethod: 'upi',
            status: 'completed',
            createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
        },
        {
            id: '2',
            agentId: agent.id,
            amount: 3500,
            paymentMethod: 'bank_transfer',
            status: 'completed',
            createdAt: new Date(Date.now() - 86400000 * 30).toISOString()
        }
    ]

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                    {getInitials(agent.fullName)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <DialogTitle className="text-xl">{agent.fullName}</DialogTitle>
                                <div className="flex items-center gap-2 mt-1">
                                    <code className="px-2 py-0.5 bg-muted rounded text-sm">
                                        {agent.referralCode}
                                    </code>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={copyReferralCode}
                                    >
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Badge
                            variant="outline"
                            className={`${statusColors[agent.status]} capitalize`}
                        >
                            {agent.status}
                        </Badge>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="overview" className="mt-4">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="sales">Sales</TabsTrigger>
                        <TabsTrigger value="commission">Commission</TabsTrigger>
                        <TabsTrigger value="payouts">Payouts</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-4 mt-4">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <Package className="w-4 h-4" />
                                    <span className="text-xs">Total Sales</span>
                                </div>
                                <p className="text-2xl font-bold">{agent.totalSales}</p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="text-xs">Total Earnings</span>
                                </div>
                                <p className="text-2xl font-bold text-green-600">
                                    {formatCurrency(agent.totalEarnings)}
                                </p>
                            </div>
                            <div className="p-4 border rounded-lg bg-amber-50">
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <Wallet className="w-4 h-4" />
                                    <span className="text-xs">Balance Owed</span>
                                </div>
                                <p className="text-2xl font-bold text-amber-600">
                                    {formatCurrency(agent.availableBalance)}
                                </p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-xs">Joined</span>
                                </div>
                                <p className="text-lg font-semibold">
                                    {new Date(agent.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="p-4 border rounded-lg space-y-3">
                            <p className="text-sm font-medium">Contact Information</p>
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <span>{agent.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span>{agent.phone}</span>
                            </div>
                            {agent.city && (
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                    <span>{agent.city}</span>
                                </div>
                            )}
                        </div>

                        {/* Banking Info */}
                        <div className="p-4 border rounded-lg space-y-3">
                            <p className="text-sm font-medium">Banking Details</p>
                            {agent.upiId && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Wallet className="w-4 h-4 text-muted-foreground" />
                                    <span>UPI: {agent.upiId}</span>
                                </div>
                            )}
                            {agent.bankAccount && (
                                <div className="flex items-center gap-2 text-sm">
                                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                                    <span>
                                        A/C: {agent.bankAccount} | IFSC: {agent.bankIfsc}
                                    </span>
                                </div>
                            )}
                            {!agent.upiId && !agent.bankAccount && (
                                <p className="text-sm text-muted-foreground">
                                    No banking details added
                                </p>
                            )}
                        </div>
                    </TabsContent>

                    {/* Sales Tab */}
                    <TabsContent value="sales" className="space-y-4 mt-4">
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                                <Package className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground">
                                Sales history will show here
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Connect to Supabase to load real data
                            </p>
                        </div>
                    </TabsContent>

                    {/* Commission Tab */}
                    <TabsContent value="commission" className="space-y-4 mt-4">
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm font-medium mb-2">Base Commission</p>
                            <p className="text-2xl font-bold">{formatCurrency(agent.baseCommission)}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                + 50% of amount above MSP per sale
                            </p>
                        </div>

                        <div className="p-4 border rounded-lg">
                            <p className="text-sm font-medium mb-3">MSP by Card Design</p>
                            <div className="space-y-2">
                                {agent.msps && agent.msps.length > 0 ? (
                                    agent.msps.map((msp) => (
                                        <div
                                            key={msp.cardDesignId}
                                            className="flex items-center justify-between py-2 border-b last:border-0"
                                        >
                                            <span className="text-sm">{msp.cardDesignName}</span>
                                            <span className="font-medium">
                                                {formatCurrency(msp.mspAmount)}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        Using default MSP for all designs
                                    </p>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Payouts Tab */}
                    <TabsContent value="payouts" className="space-y-4 mt-4">
                        {mockPayouts.length > 0 ? (
                            <div className="space-y-2">
                                {mockPayouts.map((payout) => (
                                    <div
                                        key={payout.id}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                        <div>
                                            <p className="font-semibold text-green-600">
                                                {formatCurrency(payout.amount)}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(payout.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })} via {payout.paymentMethod === 'upi' ? 'UPI' :
                                                    payout.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Cash'}
                                            </p>
                                        </div>
                                        <Badge variant="outline" className="bg-green-50 text-green-700">
                                            {payout.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                                    <Wallet className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <p className="text-muted-foreground">No payouts yet</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                {/* Actions */}
                <div className="flex gap-2 mt-6 pt-4 border-t">
                    <Button
                        variant="outline"
                        onClick={() => onEdit?.(agent)}
                        className="flex-1"
                    >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                    {agent.availableBalance > 0 && (
                        <Button
                            onClick={() => onPay?.(agent)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                            <Wallet className="w-4 h-4 mr-2" />
                            Pay Now
                        </Button>
                    )}
                    <Button
                        variant={agent.status === 'active' ? 'destructive' : 'default'}
                        onClick={() => onToggleStatus?.(agent)}
                        className="flex-1"
                    >
                        {agent.status === 'active' ? (
                            <>
                                <UserX className="w-4 h-4 mr-2" />
                                Deactivate
                            </>
                        ) : (
                            <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Activate
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
