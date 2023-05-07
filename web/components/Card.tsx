import { DeleteFilled } from '@ant-design/icons';
import { ROSNode, Topic } from '../api/types';
import { Button, Modal } from 'antd';
import { deleteTopic } from '@/api/api';
import Stream from './Stream'
import ChartCard from './Chart';
interface CardProps {
  topic: Topic;
  callback: (node: ROSNode) => void;
  node: ROSNode;
}

const TopicCard: React.FC<CardProps> = ({ topic, callback, node }) => {
    const contentByTypes = () => {
      if(topic.type=='chart'){
        return (
          <ChartCard topicName={topic.name} />
        )
      }else if(topic.type=='video'){
        return (
          <img src={`http://${node.ip}:8080/stream?topic=${topic.name}`} />
        )
      }else{
        return (
          <></>
        )
      }
    }
    const handleNodeClick = () => {
        Modal.confirm({
          title: 'Are you sure delete this node?',
          content: 'This action cannot be undone.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteTopic(topic.id || '').then(res => {
              if(res.message === 'ok'){
                callback(node);
              }else{
                Modal.error({
                  title: 'Error',
                  content: res.message
                });
              }
            })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }
    return (
      <div className="group mr-8 mb-8 rounded-lg border px-3 py-2 transition-colors border-gray-300 bg-gray-100 bg-opacity-30">
        <div className="px-3 py-2">
          <div className='flex justify-between'>
            <h2 className="mb-3 text-2xl font-semibold">{topic.name}</h2>
            <Button
              icon={<DeleteFilled></DeleteFilled>}
              onClick={() => handleNodeClick()}
              danger
              type='link'
            />
          </div>
          {contentByTypes()}
        </div>
      </div>
    );
  };
  

export default TopicCard;
