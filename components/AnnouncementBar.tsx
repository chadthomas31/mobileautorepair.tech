import { Info } from 'lucide-react'

export default function AnnouncementBar() {
  return (
    <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm md:text-base sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <Info className="h-4 w-4 flex-shrink-0" />
        <p>
          <span className="font-semibold">First-visit diagnostic: $100 + mobile service charge</span>
          {' '}— credited with repair · Prices based on RepairPal®
        </p>
      </div>
    </div>
  )
}
