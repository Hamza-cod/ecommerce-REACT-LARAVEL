
import { CardNumbers } from "../components/admin/dashboard/Card";
import { BarChartExampleWithCustomTooltip } from "../components/admin/dashboard/Chart";

export default function Dashboard() {
  
  // console.log(context)
  return (<div className="w-full">
    <div className="my-6 flex gap-4">
      <CardNumbers/>
      <CardNumbers/>
      <CardNumbers/>
    </div>
      <BarChartExampleWithCustomTooltip/>
  </div>
  )
}
