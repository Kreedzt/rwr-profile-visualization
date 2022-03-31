import React, { FC, useCallback, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useDataContext } from "../../context/DataContext";
import { EChartsType } from "echarts";
import "./TimePlayed.css";

const LABELS: string[] = [
  "< 500 分钟",
  "500 ~ 1000 分钟",
  "1000 ~ 1500 分钟",
  "1500 ~ 2000 分钟",
  "2000 ~ 2500 分钟",
  "2500 ~ 3000 分钟",
  "3000 ~ 3500 分钟",
  "3500 ~ 4000 分钟",
  "4000 ~ 4500 分钟",
  "4500 ~ 5000 分钟",
  ">= 5000 分钟",
];

const TimePlayed: FC = () => {
  const { currentValue } = useDataContext();
  const echartsPieDivRef = useRef(null);
  const echartsPieInst = useRef<EChartsType>();
  const echartsLineDivRef = useRef(null);
  const echartsLineInst = useRef<EChartsType>();

  const initCharts = useCallback(() => {
    const pieDom = echartsPieDivRef.current;
    if (!pieDom) return;
    echartsPieInst.current = echarts.init(pieDom);

    const lineDom = echartsLineDivRef.current;
    if (!lineDom) return;
    echartsLineInst.current = echarts.init(lineDom);
  }, []);

  const refreshCharts = useCallback(() => {
    const chartsValue: [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    currentValue.forEach(([id, person, profile]) => {
      // < 500 Minutes
      if (profile.stats.time_played < 5 * 10000) {
        chartsValue[0] += 1;
        // < 1000 Minutes
      } else if (profile.stats.time_played < 10 * 10000) {
        chartsValue[1] += 1;
        // < 1500 Minutes
      } else if (profile.stats.time_played < 15 * 10000) {
        chartsValue[2] += 1;
        // < 2000 Minutes
      } else if (profile.stats.time_played < 20 * 10000) {
        chartsValue[3] += 1;
        // < 2500 Minutes
      } else if (profile.stats.time_played < 25 * 10000) {
        chartsValue[4] += 1;
        // < 3000 Minutes
      } else if (profile.stats.time_played < 30 * 10000) {
        chartsValue[5] += 1;
        // < 3500 Minutes
      } else if (profile.stats.time_played < 35 * 10000) {
        chartsValue[6] += 1;
        // < 4000 Minutes
      } else if (profile.stats.time_played < 40 * 10000) {
        chartsValue[7] += 1;
        // < 4500 Minutes
      } else if (profile.stats.time_played < 45 * 10000) {
        chartsValue[8] += 1;
        // < 5000 Minutes
      } else if (profile.stats.time_played < 50 * 10000) {
        chartsValue[9] += 1;
        // > 5000 Minutes
      } else {
        chartsValue[10] += 1;
      }
    });

    echartsPieInst.current?.setOption({
      title: {
        text: "游玩时间饼图",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        bottom: 10,
        left: "center",
        data: LABELS,
      },
      series: [
        {
          name: "游玩时间饼图",
          type: "pie",
          radius: "50%",
          data: LABELS.map((l, index) => {
            return {
              name: l,
              value: chartsValue[index],
            };
          }),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              TimePlayed: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });

    echartsLineInst.current?.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}",
      },
      legend: {
        bottom: 10,
        left: "center",
      },
      xAxis: {
        type: "category",
        data: LABELS,
      },
      yAxis: {
        type: "value",
        label: "数量",
      },
      series: [
        {
          name: "游玩时间柱状图",
          data: chartsValue,
          type: "bar",
        },
      ],
    } as any);
  }, [currentValue]);

  useEffect(() => {
    initCharts();
  }, []);

  useEffect(() => {
    refreshCharts();
  }, [currentValue]);

  return (
    <div className="time-played">
      <div ref={echartsPieDivRef} className="echarts-content" />
      <div ref={echartsLineDivRef} className="echarts-content" />
    </div>
  );
};

export default TimePlayed;
