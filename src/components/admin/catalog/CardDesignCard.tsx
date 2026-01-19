/**
 * @file Card Design Card Component
 * @description Individual card display in catalog grid
 * 
 * @owner Dev 1
 */

'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CardDesign, CardDesignStatus } from '@/types/card-design'
import {
    MoreVertical,
    Pencil,
    Users,
    Eye,
    Power,
    PowerOff,
    Trash2,
    Package
} from 'lucide-react'

interface CardDesignCardProps {
    design: CardDesign
    onEdit: (design: CardDesign) => void
    onSetAgentMsp: (design: CardDesign) => void
    onToggleStatus: (design: CardDesign) => void
    onDelete: (design: CardDesign) => void
}

const statusColors: Record<CardDesignStatus, string> = {
    active: 'bg-green-100 text-green-800 border-green-200',
    inactive: 'bg-gray-100 text-gray-800 border-gray-200'
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export function CardDesignCard({
    design,
    onEdit,
    onSetAgentMsp,
    onToggleStatus,
    onDelete
}: CardDesignCardProps) {
    return (
        <div className="group relative bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow">
            {/* Preview Image */}
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {design.previewUrl ? (
                    <img
                        src={design.previewUrl}
                        alt={design.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-gray-400" />
                    </div>
                )}

                {/* Status Badge */}
                <Badge
                    variant="outline"
                    className={`absolute top-3 left-3 ${statusColors[design.status]} capitalize`}
                >
                    {design.status}
                </Badge>

                {/* Actions Overlay */}
                <div className="absolute top-3 right-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="h-8 w-8 bg-white/90 hover:bg-white"
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onEdit(design)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Design
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSetAgentMsp(design)}>
                                <Users className="mr-2 h-4 w-4" />
                                Set Agent MSPs
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onToggleStatus(design)}>
                                {design.status === 'active' ? (
                                    <>
                                        <PowerOff className="mr-2 h-4 w-4" />
                                        Deactivate
                                    </>
                                ) : (
                                    <>
                                        <Power className="mr-2 h-4 w-4" />
                                        Activate
                                    </>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDelete(design)}
                                className="text-red-600"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Card Info */}
            <div className="p-4">
                <h3 className="font-semibold text-lg truncate">{design.name}</h3>
                {design.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {design.description}
                    </p>
                )}

                <div className="flex items-center justify-between mt-3">
                    <div>
                        <p className="text-xs text-muted-foreground">Base MSP</p>
                        <p className="font-bold text-lg">{formatCurrency(design.baseMsp)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">Total Sales</p>
                        <p className="font-semibold text-lg">{design.totalSales}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
