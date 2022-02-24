import React, { FC, useCallback, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useDataContext } from "../../context/DataContext";
import { EChartsType } from "echarts";
import "./XP.css";

const LABELS: string[] = [
  "2 星人形",
  "3 星人形",
  "4 星人形",
  "5 星人形",
  "6 星人形",
  "1 月人形",
  "2 月人形",
  "3 月人形",
  "4 月人形",
  "5 月人形",
  "1 日人形",
];

const XP: FC = () => {
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
      // < 1 0000 XP => 2 Starts
      if (person.authority <= 1) {
        chartsValue[0] += 1;
        // < 5 0000 XP => 3 Starts
      } else if (person.authority <= 5) {
        chartsValue[1] += 1;
        // < 10 0000 XP => 4 Starts
      } else if (person.authority <= 10) {
        chartsValue[2] += 1;
        // < 100 0000 XP => 5 Starts
      } else if (person.authority <= 100) {
        chartsValue[3] += 1;
        // < 200 0000 XP => 1 month
      } else if (person.authority <= 200) {
        chartsValue[4] += 1;
        // < 300 0000 XP => 2 month
      } else if (person.authority <= 300) {
        chartsValue[5] += 1;
        // < 400 0000 XP => 3 month
      } else if (person.authority <= 400) {
        chartsValue[6] += 1;
        // < 500 0000 XP => 4 month
      } else if (person.authority <= 500) {
        chartsValue[7] += 1;
        // < 750 0000 XP => 5 month
      } else if (person.authority <= 750) {
        chartsValue[8] += 1;
        // >= 300 0000 XP => 1 sun
      } else {
        chartsValue[9] += 1;
      }
    });

    echartsPieInst.current?.setOption({
      title: {
        text: "XP 统计饼图",
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
          name: "XP 统计饼图",
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
          name: "XP 统计柱状图",
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
    <div className="xp">
      <div ref={echartsPieDivRef} className="echarts-content" />
      <div ref={echartsLineDivRef} className="echarts-content" />
    </div>
  );
};

export default XP;
