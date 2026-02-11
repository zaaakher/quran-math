"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useQuranStore } from "@/lib/store";
import { Progress } from "./ui/progress";

export function LoadingScreen() {
  const { isLoading, progress } = useQuranStore();

  // Get appropriate loading message based on progress
  const getLoadingMessage = () => {
    if (progress < 25) return "Initializing...";
    if (progress < 60) return "Fetching juz data...";
    if (progress < 90) return "Processing Quran content...";
    if (progress < 100) return "Almost ready...";
    return "Processing dashboard data...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md px-4">

        {/* Loading text */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Loading Quran Analysis
          </h1>
          <p className="text-gray-600 text-sm">
            Preparing linguistic and mathematical insights...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <Progress value={progress} />
        </div>

        {/* Progress text */}
        <p className="text-xs text-gray-400">
          {getLoadingMessage()}
        </p>

      </div>
    </div>
  );
}
