'use client'

import { SplineScene } from "@/components/ui/spline"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { SpotlightInteractive } from "@/components/ui/spotlight-interactive"

export function SplineSceneBasic() {
    return (
        <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-0">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            <div className="flex flex-col md:flex-row h-full">
                {/* Left content */}
                <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                        Interactive 3D
                    </h1>
                    <p className="mt-4 text-neutral-300 max-w-lg">
                        Bring your UI to life with beautiful 3D scenes. Create immersive experiences
                        that capture attention and enhance your design.
                    </p>
                    <div className="mt-6">
                        <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105">
                            Explore 3D
                        </button>
                    </div>
                </div>

                {/* Right content - Spline 3D Scene */}
                <div className="flex-1 relative h-64 md:h-auto">
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </Card>
    )
}

export function SplineSceneInteractive() {
    return (
        <Card className="w-full h-[600px] bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden border-slate-800">
            <SpotlightInteractive className="opacity-40" size={300} />

            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Left content */}
                <div className="p-8 md:p-12 relative z-10 flex flex-col justify-center">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            3D Portfolio
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                            Showcase your work with stunning interactive 3D experiences using Spline.
                            Impress your audience with cutting-edge design.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95">
                                Get Started
                            </button>
                            <button className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-bold rounded-lg transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right content - Spline 3D Scene */}
                <div className="hidden md:block relative">
                    <SplineScene
                        scene="https://prod.spline.design/EwILcHb2L7QL7wXZ/scene.splinecode"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </Card>
    )
}
