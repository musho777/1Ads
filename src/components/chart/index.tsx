import { XCircle } from "lucide-react";
import React, { useState } from "react";
import Chart from "react-apexcharts";

export const ChartModal = ({ onClose }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "A",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
      {
        name: "B",
        data: [15, 50, 40, 60, 55, 70, 80, 100, 160],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: false,
          },
        },
      },
      xaxis: {
        categories: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен"],
      },
      title: {
        text: "Сравнение",
        align: "center",
      },
      stroke: {
        curve: "smooth", // Гладкие линии
      },
      markers: {
        size: 5, // Точки на линиях
      },
      colors: ["#008FFB", "#FF4560"], // Цвета линий
    },
  });



  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-sky-100">
      <div className="px-8 py-6 relative">
        <div onClick={() => {
          onClose()
        }} className='absolute right-2 top-2'>
          <XCircle />
        </div>
        <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
      </div>
    </div>
  );
};
