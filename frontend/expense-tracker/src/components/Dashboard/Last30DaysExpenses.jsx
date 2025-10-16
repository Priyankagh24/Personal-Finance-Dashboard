import React,{useEffect,useState} from 'react'
// import {prepareExpenseBarChartData} from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";
import moment from 'moment';

const Last30DaysExpenses = ( {data})=>{
const [chartData, setChartData] = useState([]);

useEffect(() => {
  if (!data || data.length === 0) return;

  const last30DaysData = data.filter(item =>
    item.date && moment(item.date).isValid() &&
    moment(item.date).isAfter(moment().subtract(30, "days"))
  );

  const finalData = last30DaysData.length > 0 ? last30DaysData : data;

  const result = finalData.map(item => ({
    category: item.category || item.source || "Unknown",
    amount: item.amount || 0,
  }));

  

  setChartData(result);
}, [data]);






return (
    <div className="card col-span-1">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Last 30 Days Expenses</h5>
        </div>

      

        <CustomBarChart data={chartData} xKey="category" />

    </div>

    
  )
}

export default Last30DaysExpenses
