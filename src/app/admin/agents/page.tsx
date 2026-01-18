/**
 * @file Admin Agents Page
 * @description Agent management with list, create, detail, and payout modals
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useMemo } from 'react'
import { AgentTable } from '@/components/admin/AgentTable'
import { AgentFilters } from '@/components/admin/AgentFilters'
import { AgentDetailModal } from '@/components/admin/AgentDetailModal'
import { CreateAgentModal } from '@/components/admin/CreateAgentModal'
import { PayoutModal } from '@/components/admin/PayoutModal'
import { Agent, AgentStatus, CreateAgentPayload, PayoutPayload } from '@/types/agent'
import { Users, IndianRupee, TrendingUp, Wallet } from 'lucide-react'

// Mock Data - will be replaced with Supabase queries
const mockAgents: Agent[] = [
    {
        id: '1',
        profileId: 'profile-agent-1',
        fullName: 'Prince Yadav',
        email: 'prince@example.com',
        phone: '+91 98765 43210',
        referralCode: 'PRINCE10',
        city: 'Indore',
        upiId: 'prince@upi',
        baseCommission: 100,
        totalSales: 45,
        totalEarnings: 22500,
        availableBalance: 5500,
        status: 'active',
        createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '2',
        profileId: 'profile-agent-2',
        fullName: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '+91 87654 32109',
        referralCode: 'RAHUL20',
        city: 'Mumbai',
        bankAccount: '00000000001234',
        bankIfsc: 'HDFC0001234',
        bankHolderName: 'Rahul Sharma',
        baseCommission: 100,
        parentAgentId: '1',
        totalSales: 28,
        totalEarnings: 14000,
        availableBalance: 3200,
        status: 'active',
        createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '3',
        profileId: 'profile-agent-3',
        fullName: 'Priya Patel',
        email: 'priya@example.com',
        phone: '+91 76543 21098',
        referralCode: 'PRIYA30',
        city: 'Indore',
        upiId: 'priya@paytm',
        baseCommission: 100,
        totalSales: 12,
        totalEarnings: 6000,
        availableBalance: 0,
        status: 'active',
        createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '4',
        profileId: 'profile-agent-4',
        fullName: 'Amit Kumar',
        email: 'amit@example.com',
        phone: '+91 65432 10987',
        referralCode: 'AMIT40',
        city: 'Delhi',
        baseCommission: 100,
        totalSales: 3,
        totalEarnings: 1500,
        availableBalance: 1500,
        status: 'inactive',
        createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
        updatedAt: new Date().toISOString()
    }
]

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export default function AdminAgentsPage() {
    const [agents, setAgents] = useState<Agent[]>(mockAgents)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<AgentStatus | null>(null)
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
    const [detailModalOpen, setDetailModalOpen] = useState(false)
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [payoutAgent, setPayoutAgent] = useState<Agent | null>(null)
    const [payoutModalOpen, setPayoutModalOpen] = useState(false)

    // Filtered agents
    const filteredAgents = useMemo(() => {
        let result = agents

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(a =>
                a.fullName.toLowerCase().includes(query) ||
                a.email.toLowerCase().includes(query) ||
                a.referralCode.toLowerCase().includes(query) ||
                a.phone.includes(query)
            )
        }

        // Status filter
        if (selectedStatus) {
            result = result.filter(a => a.status === selectedStatus)
        }

        return result
    }, [agents, searchQuery, selectedStatus])

    // Stats
    const stats = useMemo(() => ({
        total: agents.length,
        active: agents.filter(a => a.status === 'active').length,
        totalSales: agents.reduce((sum, a) => sum + a.totalSales, 0),
        totalOwed: agents.reduce((sum, a) => sum + a.availableBalance, 0)
    }), [agents])

    const handleViewAgent = (agent: Agent) => {
        setSelectedAgent(agent)
        setDetailModalOpen(true)
    }

    const handleEditAgent = (agent: Agent) => {
        // TODO: Open edit form
        console.log('Edit agent:', agent.id)
    }

    const handlePayAgent = (agent: Agent) => {
        setPayoutAgent(agent)
        setPayoutModalOpen(true)
        setDetailModalOpen(false)
    }

    const handleToggleStatus = (agent: Agent) => {
        const newStatus: AgentStatus = agent.status === 'active' ? 'inactive' : 'active'
        setAgents(prev => prev.map(a =>
            a.id === agent.id ? { ...a, status: newStatus } : a
        ))
        setDetailModalOpen(false)
    }

    const handleCreateAgent = async (data: CreateAgentPayload) => {
        // Generate referral code from name
        const firstName = data.fullName.split(' ')[0].toUpperCase()
        const number = Math.floor(Math.random() * 90) + 10
        const referralCode = `${firstName}${number}`

        const newAgent: Agent = {
            id: crypto.randomUUID(),
            profileId: crypto.randomUUID(),
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            referralCode,
            city: data.city,
            upiId: data.upiId,
            bankAccount: data.bankAccount,
            bankIfsc: data.bankIfsc,
            bankHolderName: data.bankHolderName,
            baseCommission: data.baseCommission || 100,
            parentAgentId: data.parentAgentId,
            totalSales: 0,
            totalEarnings: 0,
            availableBalance: 0,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        setAgents(prev => [newAgent, ...prev])
    }

    const handlePayout = async (agentId: string, data: PayoutPayload) => {
        setAgents(prev => prev.map(a =>
            a.id === agentId
                ? { ...a, availableBalance: a.availableBalance - data.amount }
                : a
        ))
    }

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedStatus(null)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Agents</h1>
                    <p className="text-muted-foreground">
                        Manage marketing agents and commissions
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-xs">Total Agents</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-green-600">{stats.active} active</p>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs">Total Sales</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.totalSales}</p>
                    <p className="text-xs text-muted-foreground">cards sold</p>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <IndianRupee className="w-4 h-4" />
                        <span className="text-xs">Total Earnings</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(agents.reduce((sum, a) => sum + a.totalEarnings, 0))}
                    </p>
                </div>
                <div className="p-4 border rounded-lg bg-amber-50">
                    <div className="flex items-center gap-2 text-amber-700 mb-1">
                        <Wallet className="w-4 h-4" />
                        <span className="text-xs">Commission Owed</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-600">
                        {formatCurrency(stats.totalOwed)}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-4">
                <AgentFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    onClearFilters={clearFilters}
                    onCreateAgent={() => setCreateModalOpen(true)}
                />
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <AgentTable
                    agents={filteredAgents}
                    onViewAgent={handleViewAgent}
                    onEditAgent={handleEditAgent}
                    onPayAgent={handlePayAgent}
                    onToggleStatus={handleToggleStatus}
                />
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredAgents.length} of {agents.length} agents
            </div>

            {/* Modals */}
            <AgentDetailModal
                agent={selectedAgent}
                open={detailModalOpen}
                onOpenChange={setDetailModalOpen}
                onEdit={handleEditAgent}
                onPay={handlePayAgent}
                onToggleStatus={handleToggleStatus}
            />

            <CreateAgentModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                existingAgents={agents}
                onSubmit={handleCreateAgent}
            />

            <PayoutModal
                agent={payoutAgent}
                open={payoutModalOpen}
                onOpenChange={setPayoutModalOpen}
                onSubmit={handlePayout}
            />
        </div>
    )
}
