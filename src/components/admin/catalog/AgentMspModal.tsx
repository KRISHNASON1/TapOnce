/**
 * @file Agent MSP Modal
 * @description Modal for setting agent-specific MSPs for a card design
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CardDesign } from '@/types/card-design'
import { Users, Save } from 'lucide-react'

interface AgentMsp {
    agentId: string
    agentName: string
    mspAmount: number | null
}

interface AgentMspModalProps {
    design: CardDesign | null
    agents: AgentMsp[]
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (designId: string, updates: { agentId: string; mspAmount: number }[]) => Promise<void>
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export function AgentMspModal({
    design,
    agents,
    open,
    onOpenChange,
    onSave
}: AgentMspModalProps) {
    const [isSaving, setIsSaving] = useState(false)
    const [mspValues, setMspValues] = useState<Record<string, string>>({})
    const [changes, setChanges] = useState<Set<string>>(new Set())

    // Initialize MSP values when modal opens
    useEffect(() => {
        if (open && agents.length > 0) {
            const initial: Record<string, string> = {}
            agents.forEach(agent => {
                initial[agent.agentId] = agent.mspAmount?.toString() || ''
            })
            setMspValues(initial)
            setChanges(new Set())
        }
    }, [open, agents])

    if (!design) return null

    const handleMspChange = (agentId: string, value: string) => {
        setMspValues(prev => ({ ...prev, [agentId]: value }))
        setChanges(prev => new Set(prev).add(agentId))
    }

    const handleSave = async () => {
        const updates = Array.from(changes)
            .map(agentId => ({
                agentId,
                mspAmount: parseInt(mspValues[agentId]) || design.baseMsp
            }))
            .filter(u => u.mspAmount > 0)

        if (updates.length === 0) {
            onOpenChange(false)
            return
        }

        setIsSaving(true)
        await onSave(design.id, updates)
        setIsSaving(false)
        onOpenChange(false)
    }

    const hasChanges = changes.size > 0

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Set Agent MSPs
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                    {/* Card Design Info */}
                    <div className="p-4 bg-muted/50 rounded-lg mb-4">
                        <p className="font-semibold">{design.name}</p>
                        <p className="text-sm text-muted-foreground">
                            Base MSP: <span className="font-medium">{formatCurrency(design.baseMsp)}</span>
                        </p>
                    </div>

                    {/* Agent MSP Table */}
                    {agents.length === 0 ? (
                        <div className="py-8 text-center">
                            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground">No active agents found</p>
                        </div>
                    ) : (
                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {agents.map((agent) => {
                                const currentValue = mspValues[agent.agentId] || ''
                                const hasValue = currentValue.trim() !== ''
                                const isCustom = hasValue && parseInt(currentValue) !== design.baseMsp
                                const isChanged = changes.has(agent.agentId)

                                return (
                                    <div
                                        key={agent.agentId}
                                        className={`flex items-center justify-between p-3 border rounded-lg ${isChanged ? 'border-blue-300 bg-blue-50' : ''}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{agent.agentName}</span>
                                            {isCustom && (
                                                <Badge variant="outline" className="text-xs">
                                                    Custom
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">₹</span>
                                            <Input
                                                type="number"
                                                value={currentValue}
                                                onChange={(e) => handleMspChange(agent.agentId, e.target.value)}
                                                placeholder={design.baseMsp.toString()}
                                                className="w-24 text-right"
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    <p className="text-xs text-muted-foreground mt-4">
                        Leave empty to use base MSP. Agents will see their personalized MSP in their catalog.
                    </p>
                </div>

                <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
                        {isSaving ? (
                            'Saving...'
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
