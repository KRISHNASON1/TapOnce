/**
 * @file Preview Mode
 * @description See how profile looks before saving
 * 
 * @owner Dev 2
 * @module customer
 * 
 * @see ProductRequirementsDocument.txt Section 6.3.3
 */

'use client'

import { Button } from '@/components/ui/button'
import {
    Phone,
    Mail,
    MessageCircle,
    Linkedin,
    Instagram,
    Facebook,
    Twitter,
    Globe,
    Download,
    ArrowLeft,
    Share2
} from 'lucide-react'

// Mock profile data - same as in editor
const mockProfile = {
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    fullName: 'Rahul Verma',
    jobTitle: 'Founder & CEO',
    companyName: 'Tech Solutions Pvt Ltd',
    bio: 'Passionate entrepreneur building innovative tech solutions. 10+ years of experience in software development and business strategy.',
    phone: '+919876543210',
    email: 'rahul@techsolutions.com',
    whatsapp: '+919876543210',
    linkedIn: 'https://linkedin.com/in/rahulverma',
    instagram: 'https://instagram.com/rahulverma',
    facebook: '',
    twitter: 'https://twitter.com/rahulverma',
    website: 'https://rahulverma.com'
}

const socialLinks = [
    { url: mockProfile.linkedIn, icon: Linkedin, label: 'LinkedIn', color: 'bg-blue-600' },
    { url: mockProfile.instagram, icon: Instagram, label: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { url: mockProfile.twitter, icon: Twitter, label: 'Twitter', color: 'bg-sky-500' },
    { url: mockProfile.website, icon: Globe, label: 'Website', color: 'bg-gray-700' },
].filter(link => link.url)

export default function PreviewPage() {
    const profile = mockProfile

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <a href="/dashboard/profile">
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Editor
                    </Button>
                </a>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                    </Button>
                    <a href="/dashboard/download">
                        <Button className="gap-2">
                            <Download className="w-4 h-4" />
                            Download
                        </Button>
                    </a>
                </div>
            </div>

            {/* Preview Container */}
            <div className="flex justify-center">
                <div className="relative">
                    {/* Phone Frame */}
                    <div className="bg-gray-800 rounded-[40px] p-3 shadow-2xl">
                        <div className="bg-black rounded-[32px] p-1">
                            {/* Notch */}
                            <div className="bg-black w-24 h-6 mx-auto rounded-b-xl relative z-10"></div>

                            {/* Screen */}
                            <div className="bg-white rounded-[28px] w-[320px] h-[640px] overflow-y-auto">
                                {/* Preview Content */}
                                <div className="p-6 text-center">
                                    {/* Profile Photo */}
                                    <img
                                        src={profile.photo}
                                        alt={profile.fullName}
                                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                                    />

                                    {/* Name & Title */}
                                    <h1 className="text-xl font-bold mt-4">{profile.fullName}</h1>
                                    <p className="text-gray-600">{profile.jobTitle}</p>
                                    <p className="text-gray-500 text-sm">{profile.companyName}</p>

                                    {/* Bio */}
                                    <p className="text-gray-600 text-sm mt-4 px-2">{profile.bio}</p>

                                    {/* Save Contact Button */}
                                    <Button className="w-full mt-6 gap-2">
                                        <Download className="w-4 h-4" />
                                        Save Contact
                                    </Button>

                                    {/* Quick Actions */}
                                    <div className="flex justify-center gap-3 mt-4">
                                        <a href={`tel:${profile.phone}`} className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
                                            <Phone className="w-5 h-5" />
                                        </a>
                                        <a href={`mailto:${profile.email}`} className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
                                            <Mail className="w-5 h-5" />
                                        </a>
                                        <a href={`https://wa.me/${profile.whatsapp?.replace(/\D/g, '')}`} className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
                                            <MessageCircle className="w-5 h-5" />
                                        </a>
                                    </div>

                                    {/* Social Links */}
                                    <div className="space-y-3 mt-6">
                                        {socialLinks.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                className={`flex items-center gap-3 p-3 ${social.color} text-white rounded-lg hover:opacity-90 transition-opacity`}
                                            >
                                                <social.icon className="w-5 h-5" />
                                                <span>{social.label}</span>
                                            </a>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <p className="text-xs text-gray-400 mt-8">
                                        Powered by TapOnce
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
