/**
 * @file Create Agent Modal
 * @description Form for creating new agents
 * 
 * @owner Dev 1
 */

'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Agent, CreateAgentPayload } from '@/types/agent'
import { User, CreditCard, Settings } from 'lucide-react'

interface CreateAgentModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    existingAgents: Agent[]
    onSubmit: (data: CreateAgentPayload) => Promise<void>
}

export function CreateAgentModal({
    open,
    onOpenChange,
    existingAgents,
    onSubmit
}: CreateAgentModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<CreateAgentPayload>({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        upiId: '',
        bankAccount: '',
        bankIfsc: '',
        bankHolderName: '',
        baseCommission: 100,
        parentAgentId: undefined
    })

    const handleChange = (field: keyof CreateAgentPayload, value: string | number | undefined) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        if (!formData.fullName || !formData.email || !formData.phone) {
            return
        }
        setIsSubmitting(true)
        await onSubmit(formData)
        setIsSubmitting(false)
        // Reset form
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            city: '',
            upiId: '',
            bankAccount: '',
            bankIfsc: '',
            bankHolderName: '',
            baseCommission: 100,
            parentAgentId: undefined
        })
        onOpenChange(false)
    }

    const isValid = formData.fullName && formData.email && formData.phone

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create New Agent</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="personal" className="mt-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="personal" className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Personal
                        </TabsTrigger>
                        <TabsTrigger value="banking" className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Banking
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Settings
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                                id="fullName"
                                placeholder="Enter full name"
                                value={formData.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="agent@example.com"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone *</Label>
                            <Input
                                id="phone"
                                placeholder="+91 98765 43210"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                placeholder="Mumbai, Indore, etc."
                                value={formData.city || ''}
                                onChange={(e) => handleChange('city', e.target.value)}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="banking" className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="upiId">UPI ID</Label>
                            <Input
                                id="upiId"
                                placeholder="agent@upi"
                                value={formData.upiId || ''}
                                onChange={(e) => handleChange('upiId', e.target.value)}
                            />
                        </div>
                        <div className="text-center text-sm text-muted-foreground my-2">
                            — OR —
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bankAccount">Bank Account Number</Label>
                            <Input
                                id="bankAccount"
                                placeholder="00000000000"
                                value={formData.bankAccount || ''}
                                onChange={(e) => handleChange('bankAccount', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="bankIfsc">IFSC Code</Label>
                                <Input
                                    id="bankIfsc"
                                    placeholder="ABCD0001234"
                                    value={formData.bankIfsc || ''}
                                    onChange={(e) => handleChange('bankIfsc', e.target.value.toUpperCase())}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bankHolderName">Account Holder</Label>
                                <Input
                                    id="bankHolderName"
                                    placeholder="Name as per bank"
                                    value={formData.bankHolderName || ''}
                                    onChange={(e) => handleChange('bankHolderName', e.target.value)}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="baseCommission">Base Commission (₹)</Label>
                            <Input
                                id="baseCommission"
                                type="number"
                                placeholder="100"
                                value={formData.baseCommission || 100}
                                onChange={(e) => handleChange('baseCommission', parseInt(e.target.value) || 100)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Agent earns this + 50% of amount above MSP
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="parentAgent">Referred by Agent</Label>
                            <Select
                                value={formData.parentAgentId || 'none'}
                                onValueChange={(value) => handleChange('parentAgentId', value === 'none' ? undefined : value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select parent agent (optional)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Direct Recruitment</SelectItem>
                                    {existingAgents.filter(a => a.status === 'active').map((agent) => (
                                        <SelectItem key={agent.id} value={agent.id}>
                                            {agent.fullName} ({agent.referralCode})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Parent agent earns 2% override on all sales
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!isValid || isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Agent'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
