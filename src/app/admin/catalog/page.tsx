/**
 * @file Admin Catalog Page
 * @description Card design catalog management
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { CardDesignCard } from '@/components/admin/catalog/CardDesignCard'
import { CardDesignModal } from '@/components/admin/catalog/CardDesignModal'
import { AgentMspModal } from '@/components/admin/catalog/AgentMspModal'
import { CardDesign, CardDesignStatus, CreateCardDesignPayload, UpdateCardDesignPayload } from '@/types/card-design'
import { Plus, Package, Search, CheckCircle, XCircle, TrendingUp } from 'lucide-react'

// Mock Data - will be replaced with Supabase queries
const mockCardDesigns: CardDesign[] = [
    {
        id: '1',
        name: 'Vertical Blue Premium',
        description: 'Professional vertical design with blue gradient',
        baseMsp: 600,
        previewUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=600&fit=crop',
        templateUrl: '/templates/vertical-blue-premium.pdf',
        status: 'active',
        totalSales: 42,
        createdAt: '2026-01-10T10:00:00Z',
        updatedAt: '2026-01-10T10:00:00Z'
    },
    {
        id: '2',
        name: 'Horizontal Gold Elite',
        description: 'Premium horizontal card with gold foil accents',
        baseMsp: 800,
        previewUrl: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=600&h=400&fit=crop',
        templateUrl: '/templates/horizontal-gold-elite.pdf',
        status: 'active',
        totalSales: 28,
        createdAt: '2026-01-12T10:00:00Z',
        updatedAt: '2026-01-12T10:00:00Z'
    },
    {
        id: '3',
        name: 'Minimal White Pro',
        description: 'Clean, minimalist design with subtle elegance',
        baseMsp: 550,
        previewUrl: 'https://images.unsplash.com/photo-1541182388248-95b2e42f9eee?w=400&h=600&fit=crop',
        templateUrl: '/templates/minimal-white-pro.pdf',
        status: 'active',
        totalSales: 35,
        createdAt: '2026-01-08T10:00:00Z',
        updatedAt: '2026-01-08T10:00:00Z'
    },
    {
        id: '4',
        name: 'Corporate Classic',
        description: 'Traditional business card styling',
        baseMsp: 500,
        previewUrl: '',
        templateUrl: '',
        status: 'inactive',
        totalSales: 15,
        createdAt: '2026-01-05T10:00:00Z',
        updatedAt: '2026-01-05T10:00:00Z'
    }
]

const mockAgentMsps = [
    { agentId: '1', agentName: 'Prince Yadav', mspAmount: 550 },
    { agentId: '2', agentName: 'Rahul Sharma', mspAmount: 600 },
    { agentId: '3', agentName: 'Priya Singh', mspAmount: null },
    { agentId: '4', agentName: 'Amit Kumar', mspAmount: 650 }
]

export default function AdminCatalogPage() {
    const [designs, setDesigns] = useState<CardDesign[]>(mockCardDesigns)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<CardDesignStatus | 'all'>('all')

    // Modal states
    const [designModalOpen, setDesignModalOpen] = useState(false)
    const [mspModalOpen, setMspModalOpen] = useState(false)
    const [selectedDesign, setSelectedDesign] = useState<CardDesign | null>(null)

    // Stats
    const stats = useMemo(() => ({
        total: designs.length,
        active: designs.filter(d => d.status === 'active').length,
        inactive: designs.filter(d => d.status === 'inactive').length,
        totalSales: designs.reduce((sum, d) => sum + d.totalSales, 0)
    }), [designs])

    // Filtered designs
    const filteredDesigns = useMemo(() => {
        return designs.filter(design => {
            const matchesSearch =
                design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                design.description?.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesStatus = statusFilter === 'all' || design.status === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [designs, searchQuery, statusFilter])

    const handleAddDesign = () => {
        setSelectedDesign(null)
        setDesignModalOpen(true)
    }

    const handleEditDesign = (design: CardDesign) => {
        setSelectedDesign(design)
        setDesignModalOpen(true)
    }

    const handleSetAgentMsp = (design: CardDesign) => {
        setSelectedDesign(design)
        setMspModalOpen(true)
    }

    const handleToggleStatus = async (design: CardDesign) => {
        const newStatus: CardDesignStatus = design.status === 'active' ? 'inactive' : 'active'
        setDesigns(prev => prev.map(d =>
            d.id === design.id ? { ...d, status: newStatus } : d
        ))
    }

    const handleDeleteDesign = async (design: CardDesign) => {
        if (confirm(`Are you sure you want to delete "${design.name}"?`)) {
            setDesigns(prev => prev.filter(d => d.id !== design.id))
        }
    }

    const handleSubmitDesign = async (data: CreateCardDesignPayload | UpdateCardDesignPayload) => {
        if (selectedDesign) {
            // Update existing
            setDesigns(prev => prev.map(d =>
                d.id === selectedDesign.id
                    ? { ...d, ...data, updatedAt: new Date().toISOString() }
                    : d
            ))
        } else {
            // Create new
            const newDesign: CardDesign = {
                id: Date.now().toString(),
                ...(data as CreateCardDesignPayload),
                totalSales: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            setDesigns(prev => [newDesign, ...prev])
        }
    }

    const handleSaveAgentMsps = async (
        designId: string,
        updates: { agentId: string; mspAmount: number }[]
    ) => {
        // In real app, this would call updateAgentMsp for each
        console.log('Saving MSPs for design:', designId, updates)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6 overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Card Catalog</h1>
                    <p className="text-muted-foreground">
                        Manage card designs and agent pricing
                    </p>
                </div>
                <Button onClick={handleAddDesign}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Card
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl border bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Package className="w-4 h-4" />
                        <span className="text-sm">Total Designs</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="p-4 rounded-xl border bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Active</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <div className="p-4 rounded-xl border bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <XCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Inactive</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-500">{stats.inactive}</p>
                </div>
                <div className="p-4 rounded-xl border bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">Total Sales</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.totalSales}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search designs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select
                    value={statusFilter}
                    onValueChange={(v) => setStatusFilter(v as CardDesignStatus | 'all')}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Card Grid */}
            {filteredDesigns.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold">No card designs found</h3>
                        <p className="text-muted-foreground mb-4">
                            {searchQuery || statusFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Add your first card design to get started'}
                        </p>
                        {searchQuery === '' && statusFilter === 'all' && (
                            <Button onClick={handleAddDesign}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Card
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDesigns.map((design) => (
                        <CardDesignCard
                            key={design.id}
                            design={design}
                            onEdit={handleEditDesign}
                            onSetAgentMsp={handleSetAgentMsp}
                            onToggleStatus={handleToggleStatus}
                            onDelete={handleDeleteDesign}
                        />
                    ))}
                </div>
            )}

            {/* Modals */}
            <CardDesignModal
                design={selectedDesign}
                open={designModalOpen}
                onOpenChange={setDesignModalOpen}
                onSubmit={handleSubmitDesign}
            />

            <AgentMspModal
                design={selectedDesign}
                agents={mockAgentMsps}
                open={mspModalOpen}
                onOpenChange={setMspModalOpen}
                onSave={handleSaveAgentMsps}
            />
        </div>
    )
}
