"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useQuranStore } from "@/lib/store";

export function LoadingScreen() {
  const { isLoading } = useQuranStore();

  // Estimate progress based on loading state
  // The Quran fetch has multiple steps, so we can show incremental progress
  const progress = isLoading ? 75 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md px-4">

        {/* Loading text */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Loading Quran Analysis
          </h1>
          <p className="text-gray-600 text-sm">
            Preparing your linguistic and mathematical insights...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress text */}
        <p className="text-xs text-gray-400">
          {progress < 100 ? "Fetching Quran data..." : "Almost ready..."}
        </p>



      </div>
    </div>
  );
}
