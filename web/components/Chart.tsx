import { getAllNodes } from '@/api/api';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, registerables, ChartData } from 'chart.js';
Chart.register(CategoryScale,...registerables);

type ChartProps = {
  topicName: string;
};

const ChartCard: React.FC<ChartProps> = ({ topicName }) => {
  const [dataList, setDataList] = useState([{ time: '', value: 0 }]);
  const [key, setKey] = useState(Date.now());

  // 初次渲染和每隔30秒更新数据
  useEffect(() => {
    const intervalId = setInterval(getAllNodes, 30000);
    return () => clearInterval(intervalId);
  }, []);

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
            data={chartData}
          />;
};

export default ChartCard;
