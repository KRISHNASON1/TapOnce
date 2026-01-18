/**
 * @file Agent Filters Component
 * @description Search and filter controls for agent list
 * 
 * @owner Dev 1
 */

'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Search, X, Filter, Plus } from 'lucide-react'
import { AgentStatus } from '@/types/agent'

interface AgentFiltersProps {
    searchQuery: string
    onSearchChange: (query: string) => void
    selectedStatus: AgentStatus | null
    onStatusChange: (status: AgentStatus | null) => void
    onClearFilters: () => void
    onCreateAgent: () => void
}

export function AgentFilters({
    searchQuery,
    onSearchChange,
    selectedStatus,
    onStatusChange,
    onClearFilters,
    onCreateAgent
}: AgentFiltersProps) {
    const hasActiveFilters = searchQuery || selectedStatus

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
                {/* Search Input */}
                <div className="relative min-w-[250px] max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, code, or email..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9 pr-8"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Status Filter */}
                <Select
                    value={selectedStatus || 'all'}
                    onValueChange={(value) => onStatusChange(value === 'all' ? null : value as AgentStatus)}
                >
                    <SelectTrigger className="w-[140px]">
                        <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-4 h-4 mr-1" />
                        Clear
                    </Button>
                )}
            </div>

            {/* Create Agent Button */}
            <Button onClick={onCreateAgent} className="shrink-0">
                <Plus className="w-4 h-4 mr-2" />
                Create Agent
            </Button>
        </div>
    )
}
