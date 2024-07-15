import { useState, useEffect } from "react";
import { useStore } from "../store/store";
import style from './style.module.css'
import { useTranslation } from 'react-i18next'

import { Chart } from "react-google-charts";
import CanvasJsReact from '@canvasjs/react-charts';
import { Chart as ChartJs, ArcElement, Tooltip, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import { responsiveArray } from "antd/es/_util/responsiveObserver";


var CanvasJSChart = CanvasJsReact.CanvasJSChart;
ChartJs.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement, Title)

export default function Charts() {
  const store = useStore();

  const { t } = useTranslation();
  const { PieTitle, BarTitle, employee, salary } = t('chart')

  const data = store.employeesChart();
  data.unshift(['Name', 'Salary'])
  const options = {
    title: PieTitle,
  };
  const barOptions = {
    title: BarTitle,
    width: 800,
    height: 500,
    legend: { position: "none" },
    isStacked: true,
    bar: { groupWidth: '18' },
    hAxis: {
      title: salary,
      minValue: 10000,
    },
    vAxis: {
      title: employee,
    },
  };

  const canvasJsData = store.canvasJsData()
  const canvasJsOption = {
    animationEnabled: true,
    title: { text: BarTitle },
    axisX: { title: employee },
    axisY: { title: salary },
    data: [{
      type: 'bar',
      dataPoints: canvasJsData
    }]
  }
  const canvasJsPieOption = {
    animationEnabled: true,
    title: { text: PieTitle },
    data: [{
      type: 'pie',
      indexLabel: '',
      dataPoints: canvasJsData
    }]
  }

  const chartJsData = store.chartJsData()
  const chartJsPieOption = {
    labels: chartJsData.names,
    datasets: [{
      label: PieTitle,
      data: chartJsData.salary,
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
    }]
  }
  const chartJsBarOption = {
    indexAxis: 'y' as const,
    responsive: true,
    title: {
      display: true,
      text: BarTitle
    },
    plugins: {
      title: {
        display: true,
        text: BarTitle
      }
    }
  }
  const chartJsBarData = {
    labels: chartJsData.names,
    datasets: [{
      data: chartJsData.salary,
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderRadius: Number.MAX_VALUE,
    }]
  }

  return (
    (data.length > 0) ? (
      <div className={style.chartsStyle}>
        <h1>Google Charts Examples</h1>
        <div className={style.subChartStyle}>
          <div className={style.pieChart}>
            <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width="100%"
              height="100%"
            />
          </div>
          <div className={style.barChart}>
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="100%"
              data={data}
              options={barOptions}
            />
          </div>
        </div>
        <h1>CanvasJS Chart Example</h1>
        <div className={style.subChartStyle}>
          <CanvasJSChart options={canvasJsPieOption} />
          <CanvasJSChart options={canvasJsOption} />
        </div>
        <h1>ChartJs Chart Example</h1>
        <div className={style.subChartStyle}>
          <div className={style.chartJsPie}>
            <Pie data={chartJsPieOption} />
          </div>
          <div className={style.chartJsBar}>
            <Bar options={chartJsBarOption} data={chartJsBarData} />
          </div>
        </div>
      </div>
    ) : null
  );
}
