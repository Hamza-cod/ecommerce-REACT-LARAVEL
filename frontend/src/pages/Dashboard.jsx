
import { useEffect } from "react";
import axiosClient from "../Axios/axios";
import { CardNumbers } from "../components/admin/dashboard/Card";
import { BarChartExampleWithCustomTooltip } from "../components/admin/dashboard/Chart";
import { useDispatch } from 'react-redux';
import { setDashboard } from "../redux/sclices/dashboardSlice";
import { useSelector } from 'react-redux';
import { dashboardSelectore } from "../redux/selectors";

export default function Dashboard() {
  const dahsboardData = useSelector(dashboardSelectore)
  const dispatch = useDispatch()
  const getDashboardInfo = async () =>{
    const {data} = await axiosClient.get('orderPerDay');
    dispatch(setDashboard(data))

  }
  useEffect(()=>{
      getDashboardInfo()
  },[])

  
  return (<div className="w-full">
    <div className="my-6 flex gap-4">
      <CardNumbers title='Total Orders To day' nbr={dahsboardData?.totalOrdersForCurrentDay}/>
      <CardNumbers title='Total Sales' nbr={"$ "+dahsboardData?.totalSales}/>
      <CardNumbers title='Total Sales to day' nbr={"$ "+dahsboardData?.totalSalesForCurrentDay}/>
    
    </div>
      <BarChartExampleWithCustomTooltip data={dahsboardData?.data}/>
  </div>
  )
}
