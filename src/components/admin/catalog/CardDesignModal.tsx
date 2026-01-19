/**
 * @file Card Design Modal
 * @description Modal for adding/editing card designs
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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { CardDesign, CreateCardDesignPayload, UpdateCardDesignPayload } from '@/types/card-design'
import { Upload, Image, FileText } from 'lucide-react'

interface CardDesignModalProps {
    design?: CardDesign | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: CreateCardDesignPayload | UpdateCardDesignPayload) => Promise<void>
}

export function CardDesignModal({
    design,
    open,
    onOpenChange,
    onSubmit
}: CardDesignModalProps) {
    const isEditing = !!design
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [baseMsp, setBaseMsp] = useState(600)
    const [previewUrl, setPreviewUrl] = useState('')
    const [templateUrl, setTemplateUrl] = useState('')
    const [isActive, setIsActive] = useState(true)

    // Reset form when design changes
    useEffect(() => {
        if (design) {
            setName(design.name)
            setDescription(design.description || '')
            setBaseMsp(design.baseMsp)
            setPreviewUrl(design.previewUrl)
            setTemplateUrl(design.templateUrl || '')
            setIsActive(design.status === 'active')
        } else {
            setName('')
            setDescription('')
            setBaseMsp(600)
            setPreviewUrl('')
            setTemplateUrl('')
            setIsActive(true)
        }
    }, [design, open])

    const handleSubmit = async () => {
        if (!name || !baseMsp) return

        setIsSubmitting(true)

        const data = {
            name,
            description: description || undefined,
            baseMsp,
            previewUrl: previewUrl || '/placeholder-card.png',
            templateUrl: templateUrl || undefined,
            status: isActive ? 'active' : 'inactive'
        } as CreateCardDesignPayload

        await onSubmit(data)
        setIsSubmitting(false)
        onOpenChange(false)
    }

    const isValid = name.trim() && baseMsp > 0

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Card Design' : 'Add New Card Design'}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    {/* Card Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Card Name *</Label>
                        <Input
                            id="name"
                            placeholder="e.g., Vertical Blue Premium"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Brief description of the card design..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                        />
                    </div>

                    {/* Base MSP */}
                    <div className="space-y-2">
                        <Label htmlFor="baseMsp">Base MSP (₹) *</Label>
                        <Input
                            id="baseMsp"
                            type="number"
                            placeholder="600"
                            value={baseMsp}
                            onChange={(e) => setBaseMsp(parseInt(e.target.value) || 0)}
                        />
                        <p className="text-xs text-muted-foreground">
                            Default minimum selling price for all agents
                        </p>
                    </div>

                    {/* Preview Image URL */}
                    <div className="space-y-2">
                        <Label htmlFor="previewUrl">Preview Image URL</Label>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Input
                                    id="previewUrl"
                                    placeholder="https://... or /images/card.png"
                                    value={previewUrl}
                                    onChange={(e) => setPreviewUrl(e.target.value)}
                                />
                            </div>
                            <Button type="button" variant="outline" size="icon" disabled>
                                <Image className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Upload coming soon. For now, enter image URL.
                        </p>
                    </div>

                    {/* Template File URL */}
                    <div className="space-y-2">
                        <Label htmlFor="templateUrl">Template File URL (PDF)</Label>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Input
                                    id="templateUrl"
                                    placeholder="https://... or /templates/card.pdf"
                                    value={templateUrl}
                                    onChange={(e) => setTemplateUrl(e.target.value)}
                                />
                            </div>
                            <Button type="button" variant="outline" size="icon" disabled>
                                <FileText className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            PDF template for Wekonnect printing
                        </p>
                    </div>

                    {/* Status Toggle */}
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                            <Label htmlFor="status">Active Status</Label>
                            <p className="text-xs text-muted-foreground">
                                Inactive cards won't appear in agent catalog
                            </p>
                        </div>
                        <Switch
                            id="status"
                            checked={isActive}
                            onCheckedChange={setIsActive}
                        />
                    </div>
                </div>

                <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!isValid || isSubmitting}>
                        {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Card Design'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
