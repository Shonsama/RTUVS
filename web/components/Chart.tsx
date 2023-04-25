import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
type ChartProps = {
    topicName: String;
};
const Chart: React.FC<ChartProps> = ({ topicName }) => {
  const [dataList, setDataList] = useState([]);

  // 发送请求获取数据
  const fetchData = async () => {
    const response = await fetch(`http://example.com/api/data/${topicName}`);
    const data = await response.json();
    setDataList(data);
  };

  // 初次渲染和每隔30秒更新数据
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  // 构建图表数据
  const chartData = {
    labels: dataList.map(({ time }) => time),
    datasets: [
      {
        label: 'Topic Data',
        data: dataList.map(({ value }) => value),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderWidth: 1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default Chart;
