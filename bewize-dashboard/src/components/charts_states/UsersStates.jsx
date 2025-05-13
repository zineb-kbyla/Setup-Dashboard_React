import { LineChart } from "@mui/x-charts/LineChart";
import React , {useState} from "react";

export default function UsersStates() {
  const monthlyData = {
   
        jan: [150, 170, 160, 180],
        feb: [140, 130, 160, 145],
        mar: [170, 190, 175, 160],
        apr: [200, 180, 190, 210],
        may: [220, 210, 230, 200],
        jun: [210, 250, 240, 230],
        jul: [260, 240, 220, 250],
        aug: [270, 290, 260, 280],
        sep: [260, 250, 270, 240],
        oct: [230, 250, 220, 240],
        nov: [210, 230, 240, 220],
        dec: [250, 260, 280, 270],
    
      
  };

  const [selectedMonth , setSelectedMonth] = useState("jan");

  const handleChange = (e) => {
    setSelectedMonth(e.target.value) ;
  }

  return (
    <>
      <div className="bg-gray-50 py-4 rounded-xl">
        <div className="title flex flex-row justify-around items-center">
          <h2 className="text-lg align-middle font-semibold mb-2 text-gray-800 ms-5 ">
            New Users By Month 📈
          </h2>
          <select
            name="month"
            id="month"
            value={selectedMonth}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-4 me-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="jan">Janvier</option>
            <option value="feb">Février</option>
            <option value="mar">Mars</option>
            <option value="apr">Avril</option>
            <option value="may">Mai</option>
            <option value="jun">Juin</option>
            <option value="jul">Juillet</option>
            <option value="aug">Août</option>
            <option value="sep">Septembre</option>
            <option value="oct">Octobre</option>
            <option value="nov">Novembre</option>
            <option value="dec">Décembre</option>
          </select>
        </div>
        <div className="content">
          <LineChart
            xAxis={[
              {
                data: ["Week 1", "Week 2", "Week 3", "Week 4"],
                scaleType: "band",
             
              },
            ]}
            series={[
              {
                label: "Users",
                data: monthlyData[selectedMonth],
                area: true,
                color: "#3b82f6", // Tailwind 'blue-500'

              },
            ]}
            height={300}
            margin={{ top: 10, right: 10, bottom: 10, left: 0 }} // Set left margin to 0 to touch the Y-axis
          />
        </div>
      </div>
    </>
  );
}
