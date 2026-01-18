/**
 * @file Agent Table Component
 * @description Table displaying agents with performance metrics and actions
 * 
 * @owner Dev 1
 */

'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Agent, AgentStatus } from '@/types/agent'
import {
    MoreHorizontal,
    Eye,
    Pencil,
    UserX,
    UserCheck,
    Copy,
    Wallet,
    TrendingUp
} from 'lucide-react'

interface AgentTableProps {
    agents: Agent[]
    onViewAgent: (agent: Agent) => void
    onEditAgent: (agent: Agent) => void
    onPayAgent: (agent: Agent) => void
    onToggleStatus: (agent: Agent) => void
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

export function AgentTable({
    agents,
    onViewAgent,
    onEditAgent,
    onPayAgent,
    onToggleStatus
}: AgentTableProps) {
    const copyReferralCode = (code: string) => {
        navigator.clipboard.writeText(code)
    }

    if (agents.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No agents found</h3>
                <p className="text-muted-foreground mt-1">
                    Create your first agent to get started
                </p>
            </div>
        )
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px]">Agent</TableHead>
                        <TableHead>Referral Code</TableHead>
                        <TableHead className="text-right">Sales</TableHead>
                        <TableHead className="text-right">Earnings</TableHead>
                        <TableHead className="text-right">Balance Owed</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {agents.map((agent) => (
                        <TableRow
                            key={agent.id}
                            className="cursor-pointer"
                            onClick={() => onViewAgent(agent)}
                        >
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {getInitials(agent.fullName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{agent.fullName}</p>
                                        <p className="text-sm text-muted-foreground">{agent.city || agent.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <code className="px-2 py-1 bg-muted rounded text-sm font-mono">
                                        {agent.referralCode}
                                    </code>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            copyReferralCode(agent.referralCode)
                                        }}
                                    >
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                                {agent.totalSales}
                            </TableCell>
                            <TableCell className="text-right text-green-600 font-semibold">
                                {formatCurrency(agent.totalEarnings)}
                            </TableCell>
                            <TableCell className="text-right">
                                {agent.availableBalance > 0 ? (
                                    <span className="text-amber-600 font-semibold">
                                        {formatCurrency(agent.availableBalance)}
                                    </span>
                                ) : (
                                    <span className="text-muted-foreground">₹0</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <span className="text-sm text-muted-foreground">
                                    {new Date(agent.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`${statusColors[agent.status]} capitalize`}
                                >
                                    {agent.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={(e) => {
                                            e.stopPropagation()
                                            onViewAgent(agent)
                                        }}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => {
                                            e.stopPropagation()
                                            onEditAgent(agent)
                                        }}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit Agent
                                        </DropdownMenuItem>
                                        {agent.availableBalance > 0 && (
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onPayAgent(agent)
                                                }}
                                                className="text-green-600"
                                            >
                                                <Wallet className="mr-2 h-4 w-4" />
                                                Pay Now ({formatCurrency(agent.availableBalance)})
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onToggleStatus(agent)
                                            }}
                                            className={agent.status === 'active' ? 'text-red-600' : 'text-green-600'}
                                        >
                                            {agent.status === 'active' ? (
                                                <>
                                                    <UserX className="mr-2 h-4 w-4" />
                                                    Deactivate
                                                </>
                                            ) : (
                                                <>
                                                    <UserCheck className="mr-2 h-4 w-4" />
                                                    Activate
                                                </>
                                            )}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
