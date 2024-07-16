// src/components/BarChart.tsx
import React, { useState, useEffect } from "react";
import { Bar, Chart } from "react-chartjs-2";
import worldData from "../data/data.json";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

interface CountryChartProps {
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
}

const BarChart: React.FC<CountryChartProps> = ({ isClicked, setIsClicked }) => {
  const [countriesLabel, setCountriesLabel] = useState<string[]>([]);
  const [countriesPopulation, setCountriesPopulation] = useState<number[]>([]);

  const [statesLabel, setStatesLabel] = useState<string[]>([]);
  const [statesPopulation, setStatesPopulation] = useState<number[]>([]);
  const [index,setIndex] = useState<number>(0);

  const data = {
    labels: countriesLabel,
    datasets: [
      {
        label: "Dataset 1",
        data: countriesPopulation,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: statesLabel,
    datasets: [
      {
        label: "Dataset 1",
        data: statesPopulation,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart in React",
      },
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const {index } = elements[0];
        const clickedLabel = worldData.countries[index].states.map((obj) => {
          return obj.name;
        });
        const clickedPopulation = worldData.countries[index].states.map((obj) => {
          return obj.population;
        });
        setStatesLabel(clickedLabel);
        setStatesPopulation(clickedPopulation);
        setIsClicked(true);
        setIndex(index);
      }
    },
  };

  useEffect(() => {
    const currLabel = worldData.countries.map((obj) => {
      return obj.name;
    });

    const totalPopulation = worldData.countries.map((country) => {
      const totalPopulation = country.states.reduce(
        (acc, state) => acc + state.population,
        0
      );
      return totalPopulation;
    });

    setCountriesLabel(currLabel);
    setCountriesPopulation(totalPopulation);
  }, []);

  return (
    <div>
      {!isClicked && countriesLabel && <Bar data={data} options={options} />}
      {statesLabel && isClicked && (
        <div>
          <h2>Selected Data: {countriesLabel[index]}</h2>
          <Bar data={data2} options={options} />
        </div>
      )}
    </div>
  );
};

export default BarChart;
