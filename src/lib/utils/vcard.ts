/**
 * @file vCard Generator
 * @description Generate .vcf (vCard) files for contact saving
 * 
 * @owner Dev 3
 * @module public (tap view)
 * 
 * @see ProductRequirementsDocument.txt Section 6.4.3 for vCard requirements
 * 
 * USAGE:
 * - Called when user clicks "Save to Contact" button
 * - Downloads .vcf file that opens native contact app
 * - Compatible with iOS, Android, and desktop
 */

import type { VCardData } from '@/types'

/**
 * Generate vCard string from profile data
 * 
 * @param data - Profile data to include in vCard
 * @returns vCard formatted string (VCF 3.0)
 * 
 * @example
 * const vcardString = generateVCard({
 *   fullName: 'Rahul Verma',
 *   jobTitle: 'Founder & CEO',
 *   company: 'Tech Solutions',
 *   phone: '+919876543210',
 *   email: 'rahul@example.com'
 * })
 */
export function generateVCard(data: VCardData): string {
    const lines: string[] = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${data.fullName}`,
    ]

    if (data.company) {
        lines.push(`ORG:${data.company}`)
    }

    if (data.jobTitle) {
        lines.push(`TITLE:${data.jobTitle}`)
    }

    lines.push(`TEL;TYPE=CELL:${data.phone}`)
    lines.push(`EMAIL:${data.email}`)

    if (data.whatsapp && data.whatsapp !== data.phone) {
        lines.push(`TEL;TYPE=WORK:${data.whatsapp}`)
    }

    if (data.websiteUrl) {
        lines.push(`URL:${data.websiteUrl}`)
    }

    if (data.linkedinUrl) {
        lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${data.linkedinUrl}`)
    }

    if (data.instagramUrl) {
        lines.push(`X-SOCIALPROFILE;TYPE=instagram:${data.instagramUrl}`)
    }

    if (data.bio) {
        // Escape newlines and special characters in NOTE field
        const escapedBio = data.bio.replace(/\n/g, '\\n').replace(/,/g, '\\,')
        lines.push(`NOTE:${escapedBio}`)
    }

    lines.push('END:VCARD')

    return lines.join('\r\n')
}

/**
 * Download vCard file in browser
 * 
 * @param data - Profile data
 * @param filename - Optional custom filename (default: {name}_Contact.vcf)
 * 
 * @example
 * downloadVCard(profileData) // Downloads "Rahul_Verma_Contact.vcf"
 */
export function downloadVCard(data: VCardData, filename?: string): void {
    const vcardString = generateVCard(data)
    const blob = new Blob([vcardString], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const defaultFilename = `${data.fullName.replace(/\s+/g, '_')}_Contact.vcf`
    const downloadName = filename || defaultFilename

    const link = document.createElement('a')
    link.href = url
    link.download = downloadName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
}
