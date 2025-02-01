import { Card } from "@/components/ui/card"

export function PatientSummary() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Patients Summary December 2021</h3>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              New Patients
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">30%</span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div
            style={{ width: "30%" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
          />
        </div>
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200">
              Old Patients
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-yellow-600">70%</span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200">
          <div
            style={{ width: "70%" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-600"
          />
        </div>
      </div>
    </Card>
  )
}

