import React from "react";
import { Box } from "../styles/box";
import Chart, { Props } from "react-apexcharts";

const state: Props["series"] = [
  {
    name: "Vendido",
    data: [31, 40, 28, 51, 42, 109, 100],
  },
];

const options: Props["options"] = {
  plotOptions: {
    bar: {
      rangeBarGroupRows: true,
      rangeBarOverlap: true
    }
  },
  chart: {
    type: "bar",
    animations: {
      easing: "linear",
      speed: 300,
    },
    sparkline: {
      enabled: false,
    },
    brush: {
      enabled: false,
    },
    id: "basic-bar",
    fontFamily: "Inter, sans-serif",
    foreColor: "var(--nextui-colors-accents9)",
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"],
    labels: {
      // show: false,
      style: {
        colors: "var(--nextui-colors-accents8)",
        fontFamily: "Inter, sans-serif",
      },
    },
    axisBorder: {
      color: "var(--nextui-colors-border)",
    },
    axisTicks: {
      color: "var(--nextui-colors-border)",
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "var(--nextui-colors-accents8)",
        fontFamily: "Inter, sans-serif",
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: true,
    borderColor: "var(--nextui-colors-border)",
    strokeDashArray: 0,
    position: "back",
  },
  stroke: {
    curve: "smooth",
    fill: {
      colors: ["red"],
    },
  },
  // @ts-ignore
  markers: false,
};

export const Steam = () => {
  return (
    <>
      <Box
        css={{
          width: "100%",
          zIndex: 5,
        }}
      >
        <div id="chart">
          <Chart options={options} series={state} type="bar" height={425} />
        </div>
      </Box>
    </>
  );
};
