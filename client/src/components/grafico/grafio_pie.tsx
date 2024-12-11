"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: ChartData<"pie">;
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14, // Ajustar tamaño de las etiquetas
            family: "Arial, sans-serif", // Cambiar tipografía si es necesario
            weight: "bold",
          },
          color: "#ffffff", // Color de las etiquetas
          padding: 15, // Espaciado extra
        },
      },
      tooltip: {
        bodyFont: {
          size: 14,
        },
      },
    },
    layout: {
      padding: {
        top: 15, // Agrega separación entre el gráfico y las etiquetas
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
