'use client'

import React, { useState } from 'react'
import { siteConfig } from '@/lib/projects'
import { Upload, Link as LinkIcon, Trash2, Plus, Image as ImageIcon } from 'lucide-react'

export default function HeroManager() {
    const [config, setConfig] = useState(siteConfig.hero)
    const [saved, setSaved] = useState(false)

    const handleUpdate = () => {
        // In a real app, this would save to a database
        // For now, we update the local siteConfig temporarily
        Object.assign(siteConfig.hero, config)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    const handleFeaturedImageChange = (index: number, url: string) => {
        const newFeatured = [...config.featuredImages]
        newFeatured[index] = url
        setConfig({ ...config, featuredImages: newFeatured })
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'main' | number) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (ev) => {
                const result = ev.target?.result as string
                if (target === 'main') {
                    setConfig({ ...config, mainImage: result })
                } else {
                    const newFeatured = [...config.featuredImages]
                    newFeatured[target] = result
                    setConfig({ ...config, featuredImages: newFeatured })
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const addFeaturedImage = () => {
        setConfig({
            ...config,
            featuredImages: [...config.featuredImages, '']
        })
    }

    const removeFeaturedImage = (index: number) => {
        const newFeatured = config.featuredImages.filter((_, i) => i !== index)
        setConfig({ ...config, featuredImages: newFeatured })
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-foreground">Hero Section Manager</h2>
                <p className="text-foreground/60 mt-1">Manage images and stats shown at the top of your portfolio</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Hero Image */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="w-5 h-5 text-accent" />
                        <h3 className="text-xl font-bold text-foreground">Main Hero Image</h3>
                    </div>

                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-muted group">
                        {config.mainImage ? (
                            <img src={config.mainImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-foreground/40">
                                <ImageIcon className="w-10 h-10 mb-2" />
                                <span>No image set</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="cursor-pointer bg-accent text-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                                <Upload className="w-4 h-4" />
                                Replace Photo
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'main')} />
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                <input
                                    type="text"
                                    value={config.mainImage}
                                    onChange={(e) => setConfig({ ...config, mainImage: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-accent"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Images & Stats */}
                <div className="space-y-8">
                    {/* Featured Images */}
                    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-accent" />
                                <h3 className="text-xl font-bold text-foreground">Social Images (Beside Name)</h3>
                            </div>
                            <button
                                onClick={addFeaturedImage}
                                className="p-2 hover:bg-accent/10 text-accent rounded-lg transition-colors"
                                title="Add Image"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {config.featuredImages.map((img, i) => (
                                <div key={i} className="space-y-2 p-4 rounded-xl bg-background border border-border group">
                                    <div className="flex gap-4 items-center">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-accent/20 group-hover:border-accent transition-colors">
                                            <img src={img || '/placeholder.svg'} className="w-full h-full object-cover" />
                                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                                <Upload className="w-4 h-4 text-white" />
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, i)} />
                                            </label>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <input
                                                type="text"
                                                value={img}
                                                onChange={(e) => handleFeaturedImageChange(i, e.target.value)}
                                                className="w-full px-3 py-1.5 rounded-md bg-card border border-border text-foreground text-sm focus:outline-none focus:border-accent"
                                                placeholder="Image URL"
                                            />
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => removeFeaturedImage(i)}
                                                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Manager */}
                    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                        <h3 className="text-xl font-bold text-foreground">Hero Stats</h3>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Lines of Code Text</label>
                            <input
                                type="text"
                                value={config.linesOfCode}
                                onChange={(e) => setConfig({ ...config, linesOfCode: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-accent"
                                placeholder="e.g. 150K+"
                            />
                            <p className="text-xs text-foreground/50 mt-2">This highlights your productivity beside your name.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 bg-background/80 backdrop-blur-md sticky bottom-0 py-4 border-t border-border z-10">
                {saved && (
                    <span className="mr-6 flex items-center text-green-500 text-sm font-bold animate-fade-in-up">
                        ✓ Changes updated on site
                    </span>
                )}
                <button
                    onClick={handleUpdate}
                    className="px-10 py-4 bg-accent text-primary rounded-2xl font-black shadow-[0_0_20px_rgba(var(--accent),0.3)] hover:shadow-[0_0_30px_rgba(var(--accent),0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-sm"
                >
                    Save Portfolio
                </button>
            </div>
        </div>
    )
}
