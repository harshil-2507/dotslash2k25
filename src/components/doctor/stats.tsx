import { Card } from "@/components/ui/card"

export function DoctorStats() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Patients Review</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Excellent</span>
          <div className="w-2/3">
            <div className="h-2 bg-blue-600 rounded-full" style={{ width: "75%" }} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Great</span>
          <div className="w-2/3">
            <div className="h-2 bg-blue-400 rounded-full" style={{ width: "55%" }} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Good</span>
          <div className="w-2/3">
            <div className="h-2 bg-blue-300 rounded-full" style={{ width: "40%" }} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Average</span>
          <div className="w-2/3">
            <div className="h-2 bg-blue-200 rounded-full" style={{ width: "25%" }} />
          </div>
        </div>
      </div>
    </Card>
  )
}

