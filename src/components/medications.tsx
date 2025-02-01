import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Medications() {
  const medications = [
    { name: "Aspirin", dosage: "81mg", frequency: "Daily" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Twice daily" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medications</CardTitle>
        <CardDescription>Your current medications</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {medications.map((medication, index) => (
            <li key={index} className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium">{medication.name}</p>
              <p className="text-sm text-gray-600">
                {medication.dosage} - {medication.frequency}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

