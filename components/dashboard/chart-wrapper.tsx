'use client'

import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useSidebarTransition } from "@/hooks/use-sidebar-transition"

interface ChartWrapperProps {
  title: string
  description?: string
  children: ReactNode
}

export function ChartWrapper({ title, description, children }: ChartWrapperProps) {
  const isTransitioning = useSidebarTransition()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isTransitioning ? (
          <div className="space-y-3">
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}
