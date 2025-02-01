import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Appointments() {
  const appointments = [
    { date: "2023-06-15", time: "10:00 AM", doctor: "Dr. Smith", type: "Check-up" },
    { date: "2023-06-22", time: "2:30 PM", doctor: "Dr. Johnson", type: "Follow-up" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {appointments.map((appointment, index) => (
            <li key={index} className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium">
                {appointment.date} at {appointment.time}
              </p>
              <p className="text-sm text-gray-600">
                {appointment.doctor} - {appointment.type}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

