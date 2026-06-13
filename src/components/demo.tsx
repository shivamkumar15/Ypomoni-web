'use client'

import { Card } from "@/components/ui/card"

export function SplineSceneBasic() {
  return (
    <Card className="w-full min-h-screen md:h-full bg-neutral-50 relative overflow-hidden border-0 rounded-none">
      <div className="grid min-h-screen md:h-full grid-cols-1 md:grid-cols-2 items-center">
        {/* Left content: Text */}
        <div className="relative z-10 flex flex-col justify-center items-start text-left px-6 pt-32 pb-12 md:px-24 md:py-0">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-pink-700">
             Ypomoni
          </h1>
          <p className="mt-6 text-pink-600 max-w-xl text-lg md:text-xl leading-relaxed">
            Your smart online safety guardian always with you and by your side. Make your travel safer and more enjoyable with Ypomoni, your personal travel safety assistant.
          </p>
        </div>

        {/* Right content: Mobile Phone */}
        <div className="relative flex justify-center items-center w-full pb-12 md:pb-0">
          <div className="relative w-[280px] h-[580px] md:w-[320px] md:h-[650px] bg-white border-[8px] border-neutral-200 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
              <div className="w-32 h-6 bg-neutral-200 rounded-b-3xl"></div>
            </div>
            
            {/* Screen Content */}
            <div className="flex-1 bg-white p-6 pt-12 flex flex-col gap-4 relative">
              {/* Header inside phone */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                  <div className="w-5 h-5 bg-pink-700 rounded-full"></div>
                </div>
                <div className="w-20 h-4 bg-neutral-100 rounded-full"></div>
              </div>
              
              {/* Map/Location Mockup */}
              <div className="w-full h-56 bg-neutral-100 rounded-2xl relative overflow-hidden flex items-center justify-center">
                <div className="w-16 h-16 bg-pink-700/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-6 h-6 bg-pink-700 rounded-full shadow-[0_0_15px_rgba(190,24,93,0.5)]"></div>
                </div>
              </div>
              
              {/* Status texts */}
              <div className="mt-4 w-3/4 h-5 bg-neutral-100 rounded-md"></div>
              <div className="w-1/2 h-5 bg-neutral-100 rounded-md"></div>
              
              {/* Emergency SOS Button */}
              <div className="mt-auto mb-4 w-full h-16 bg-pink-700 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-700/30">
                SOS
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
