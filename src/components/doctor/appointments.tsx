import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

const appointments = [
  {
    id: 1,
    name: "M.J. Micał",
    time: "09:00 AM",
    type: "Health Checkup",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Sanath Deo",
    time: "11:30 AM",
    type: "Health Checkup",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Loeara Phanj",
    time: "01:00 PM",
    type: "Report",
    image: "/placeholder.svg",
  },
]

export function DoctorAppointments() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Today's Appointments</h3>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <Avatar>
                <img alt={`${appointment.name}'s avatar`} src={appointment.image || "/placeholder.svg"} />
              </Avatar>
              <div>
                <p className="font-medium">{appointment.name}</p>
                <p className="text-sm text-gray-500">{appointment.type}</p>
              </div>
            </div>
            <span className="text-sm text-blue-600 font-medium">{appointment.time}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

