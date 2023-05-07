import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, registerables, ChartData } from 'chart.js';
Chart.register(CategoryScale,...registerables);

type ChartProps = {
  topicName: string;
};

const ChartCard: React.FC<ChartProps> = ({ topicName }) => {
  const [dataList, setDataList] = useState<{ time: string, value: number }[]>([]);
  const [key, setKey] = useState(0);

  // 初次渲染和每隔5秒更新数据
  useEffect(() => {
    const intervalId = setInterval(() => {
      const value = Math.floor(Math.random() * 6) + 10; // generate random value between 10 and 15
      const nowHHmm = new Date().toLocaleTimeString();
      if(dataList.length >= 10) {
        dataList.shift();
      } 
      // dataList.push()
      setDataList([...dataList, { time: nowHHmm, value }]);
      setKey(value);
      console.log(nowHHmm); // print random value
    }, 5000); // run every 5 seconds

    return () => clearInterval(intervalId);
  }, [key]);

  // 构建图表数据
  const chartData: ChartData<'line', number[], string> = {
    labels: dataList.map((item) => item.time),
    datasets: [
      {
        label: topicName,
        data: dataList.map((item) => item.value),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  
  return <Line
            key={key} // add key prop
            data={chartData}
          />;
};

export default ChartCard;
