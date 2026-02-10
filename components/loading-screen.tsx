"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Animated Quran icon */}
        <div className="relative">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg 
                className="w-4 h-4 text-blue-600 animate-pulse" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2L1 21h22L12 2zm0 4.5l3.5 6h-7l3.5-6z"/>
              </svg>
            </div>
          </div>
          {/* Floating animation */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 animate-ping"></div>
        </div>

        {/* Loading text */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Loading Quran Analysis
          </h1>
          <p className="text-gray-600 text-sm">
            Preparing your linguistic and mathematical insights...
          </p>
        </div>

        {/* Animated loader */}
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}