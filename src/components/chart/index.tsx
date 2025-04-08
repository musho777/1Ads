import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export const ChartModal = ({ onClose, companyId }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "A",
        data: [],
      },
      {
        name: "B",
        data: [],
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
        curve: "smooth",
      },
      markers: {
        size: 5,
      },
      colors: ["#008FFB", "#FF4560"],
    },
  });

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`https://xn----nbck7b7ald8atlv.xn--y9a3aq/halal.loc/public/api/getDataForDiagram?company_id=${companyId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const impressions = [];
        const clicks = [];
        const dates = [];

        // Сортируем по дате (если нужно)
        const sortedData = result.data.sort((a, b) => new Date(a.date.split('.').reverse().join('-')) - new Date(b.date.split('.').reverse().join('-')));

        sortedData.forEach(item => {
          impressions.push(parseInt(item.Impressions));
          clicks.push(parseInt(item.Clicks));
          dates.push(item.date);
        });

        setChartData({
          series: [
            {
              name: "Impressions",
              data: impressions,
            },
            {
              name: "Clicks",
              data: clicks,
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
              categories: dates,
            },
            title: {
              text: "Сравнение",
              align: "center",
            },
            stroke: {
              curve: "smooth",
            },
            markers: {
              size: 5,
            },
            colors: ["#008FFB", "#FF4560"],
          },
        });
      })
      .catch((error) => console.error(error));
  }, []);


  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-sky-100">
      <div className="px-8 py-6 relative">
        <div onClick={onClose} className="absolute right-2 top-2 cursor-pointer">
          <XCircle />
        </div>
        <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
      </div>
    </div>
  );
};
