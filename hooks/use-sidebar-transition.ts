import { useEffect, useState } from "react"
import { useSidebar } from "@/components/ui/sidebar"

/**
 * Hook to detect sidebar collapse/expand transitions
 * Returns true while the sidebar is transitioning
 */
export function useSidebarTransition() {
  const { state } = useSidebar()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    
    // The sidebar animation duration is typically 300-400ms
    // We'll show the skeleton for a bit longer to be safe
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [state])

  return isTransitioning
}
