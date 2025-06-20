import { LoaderCircle } from 'lucide-react'

export const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <LoaderCircle
      className={`animate-spin text-indigo-500 ${className}`}
      size={50}
    />
  )
}
