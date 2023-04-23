import { DeleteFilled } from '@ant-design/icons';
import { ROSNode, Topic } from '../api/types';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { deleteTopic } from '@/api/api';
interface DataType {
  value: string;
  time: string;
}
interface CardProps {
  topic: Topic;
  callback: (node: ROSNode) => void;
  node: ROSNode;
}

const TopicCard: React.FC<CardProps> = ({ topic, callback, node }) => {
    const columns: ColumnsType<DataType> = [
      { 
        title: 'Value',
        dataIndex: 'value'
      },
      {
        title: 'Time',
        dataIndex: 'time'
      }
    ]
    const contentByTypes = () => {
      if(topic.type=='table'){
        return (
          <Table columns={columns} dataSource={topic.content} />
        )
      }else if(topic.type=='table'){
        return (
          <video src={topic.content} controls />
        )
      }else{
        return (
          <></>
        )
      }
    }   
    return (
      <div className="group mr-8 mb-8 rounded-lg border px-3 py-2 transition-colors border-gray-300 bg-gray-100 bg-opacity-30">
        <div className="px-3 py-2">
          <div className='flex justify-between'>
            <h2 className="mb-3 text-2xl font-semibold">{topic.name}</h2>
            <Button
              icon={<DeleteFilled></DeleteFilled>}
              onClick={() => {
                if(!topic.id){
                  let id = topic.id || ""
                  deleteTopic(id).then(res => {
                    if(res.status==200){
                      callback(node)
                    }
                  })
                }
              }}
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
