import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Activity, Droplet } from "lucide-react"

export default function HealthOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Overview</CardTitle>
        <CardDescription>Your current health status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Heart className="mr-2 h-5 w-5 text-red-500" />
            <span className="text-sm font-medium">Heart Rate: 72 bpm</span>
          </div>
          <div className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Blood Pressure: 120/80 mmHg</span>
          </div>
          <div className="flex items-center">
            <Droplet className="mr-2 h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Blood Glucose: 95 mg/dL</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

