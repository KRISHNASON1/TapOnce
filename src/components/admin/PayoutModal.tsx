/**
 * @file Payout Modal
 * @description Quick payout dialog for processing agent payments
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
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Agent, PaymentMethod, PayoutPayload } from '@/types/agent'
import { Wallet, CreditCard, Banknote, CheckCircle } from 'lucide-react'

interface PayoutModalProps {
    agent: Agent | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (agentId: string, data: PayoutPayload) => Promise<void>
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export function PayoutModal({
    agent,
    open,
    onOpenChange,
    onSubmit
}: PayoutModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [amount, setAmount] = useState<number>(0)
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi')
    const [notes, setNotes] = useState('')

    // Set initial amount when agent changes
    if (agent && amount === 0 && agent.availableBalance > 0) {
        setAmount(agent.availableBalance)
    }

    if (!agent) return null

    const handleSubmit = async () => {
        if (amount <= 0 || amount > agent.availableBalance) return

        setIsSubmitting(true)
        await onSubmit(agent.id, {
            amount,
            paymentMethod,
            adminNotes: notes || undefined
        })
        setIsSubmitting(false)
        // Reset form
        setAmount(0)
        setNotes('')
        onOpenChange(false)
    }

    const isValid = amount > 0 && amount <= agent.availableBalance

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-green-600" />
                        Process Payout
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    {/* Agent Info */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold">{agent.fullName}</p>
                        <p className="text-sm text-muted-foreground">{agent.referralCode}</p>
                        <div className="mt-2 pt-2 border-t">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Available Balance</span>
                                <span className="font-bold text-green-600">
                                    {formatCurrency(agent.availableBalance)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payout Amount */}
                    <div className="space-y-2">
                        <Label htmlFor="amount">Payout Amount (₹)</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                            max={agent.availableBalance}
                        />
                        {amount > agent.availableBalance && (
                            <p className="text-xs text-red-500">
                                Cannot exceed available balance
                            </p>
                        )}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setAmount(agent.availableBalance)}
                            className="text-xs"
                        >
                            Pay Full Balance
                        </Button>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                type="button"
                                variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                                className="flex flex-col items-center gap-1 h-auto py-3"
                                onClick={() => setPaymentMethod('upi')}
                            >
                                <Wallet className="w-4 h-4" />
                                <span className="text-xs">UPI</span>
                            </Button>
                            <Button
                                type="button"
                                variant={paymentMethod === 'bank_transfer' ? 'default' : 'outline'}
                                className="flex flex-col items-center gap-1 h-auto py-3"
                                onClick={() => setPaymentMethod('bank_transfer')}
                            >
                                <CreditCard className="w-4 h-4" />
                                <span className="text-xs">Bank</span>
                            </Button>
                            <Button
                                type="button"
                                variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                                className="flex flex-col items-center gap-1 h-auto py-3"
                                onClick={() => setPaymentMethod('cash')}
                            >
                                <Banknote className="w-4 h-4" />
                                <span className="text-xs">Cash</span>
                            </Button>
                        </div>
                        {paymentMethod === 'upi' && agent.upiId && (
                            <p className="text-xs text-muted-foreground">
                                UPI: {agent.upiId}
                            </p>
                        )}
                        {paymentMethod === 'bank_transfer' && agent.bankAccount && (
                            <p className="text-xs text-muted-foreground">
                                A/C: {agent.bankAccount} | IFSC: {agent.bankIfsc}
                            </p>
                        )}
                    </div>

                    {/* Admin Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes (optional)</Label>
                        <Textarea
                            id="notes"
                            placeholder="e.g., Paid via UPI on 18-Jan"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={2}
                        />
                    </div>
                </div>

                <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!isValid || isSubmitting}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isSubmitting ? (
                            'Processing...'
                        ) : (
                            <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mark as Paid
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
