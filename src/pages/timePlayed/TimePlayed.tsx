import React, { FC, useCallback, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useDataContext } from "../../context/DataContext";
import { EChartsType } from "echarts";
import "./TimePlayed.css";

const LABELS: string[] = [
  "100 分钟内",
  "300 分钟内",
  "500 分钟内",
  "700 分钟内",
  "900 分钟内",
  "1100 分钟内",
  "1300 分钟内",
  "1500 分钟内",
  "1700 分钟内",
  "1900 分钟内",
  ">= 1900 分钟",
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
      // < 100 Minutes
      if (profile.stats.time_played < 1 * 10000) {
        chartsValue[0] += 1;
        // < 300 Minutes
      } else if (profile.stats.time_played < 3 * 10000) {
        chartsValue[1] += 1;
        // < 500 Minutes
      } else if (profile.stats.time_played < 5 * 10000) {
        chartsValue[2] += 1;
        // < 700 Minutes
      } else if (profile.stats.time_played < 7 * 10000) {
        chartsValue[3] += 1;
        // < 900 Minutes
      } else if (profile.stats.time_played < 9 * 10000) {
        chartsValue[4] += 1;
        // < 1100 Minutes
      } else if (profile.stats.time_played < 11 * 10000) {
        chartsValue[5] += 1;
        // < 1300 Minutes
      } else if (profile.stats.time_played < 13 * 10000) {
        chartsValue[6] += 1;
        // < 1500 Minutes
      } else if (profile.stats.time_played < 15 * 10000) {
        chartsValue[7] += 1;
        // < 1700 Minutes
      } else if (profile.stats.time_played < 17 * 10000) {
        chartsValue[8] += 1;
        // < 1900 Minutes
      } else if (profile.stats.time_played < 19 * 10000) {
        chartsValue[9] += 1;
        // > 1900 Minutes
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
