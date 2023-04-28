import { useState } from 'react';
import { ROSNode, Topic } from '../api/types';
import { Button, Form, Input, Modal, Select } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { deleteNode, createTopic, editNode } from '@/api/api';
import TopicCard from './Card'

type ContentProps = {
  node: ROSNode;
  topics: Topic[];
  callback: (node: ROSNode) => void;
};

const ContentPage: React.FC<ContentProps> = ({ node, topics, callback }) => {
  const [open, setOpen] = useState(false);
  const [openTopic, setOpenTopic] = useState(false);

  const [formTopic] = Form.useForm();
  const [form] = Form.useForm();

  const handleNodeClick = (type:string) => {
    if(type === 'edit'){
      form.setFieldsValue({
        name: node.name,
        ip: node.ip
      })
      setOpen(true);
    }
    if(type === 'delete'){
      Modal.confirm({
        title: 'Are you sure delete this node?',
        content: 'This action cannot be undone.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          deleteNode(node.id || '').then(res => {
            if(res.message === 'ok'){
              window.location.reload();
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
  }
  const addTopicClick = () => {
    formTopic.setFieldsValue({
      name: '',
      type: ''
    })
    setOpenTopic(true);
  }
  return (
    <div className="flex flex-col h-full ">
      <header className="p-4 border-b flex items-center justify-between">
        <div className='flex items-center space-x-2'>
          <h1 className="text-2xl font-bold">
            Name: {node.name}
          </h1>
          <Button  
              size='small'
              icon={<EditFilled />}
              type='link'
              className='ml-2'
              onClick={() => handleNodeClick('edit')}
            />
        </div>
        <div className="flex space-x-2">
          
          <Button
            onClick={() => handleNodeClick('delete')}
            danger
          >
            Delete
          </Button>
          <Button
            onClick={() => addTopicClick()}
            type='primary'          
          >
            addTopic
          </Button>
        </div>
      </header>
      <div className="flex-grow p-6">
        <div className="grid grid-cols-2 gap-2">
          {topics && topics.length > 0 && topics.map((topic) => (
            <TopicCard topic={topic} callback={callback} node={node} key={topic.id}/>
          ))}
        </div>
      </div>

      <Modal
        title="ROSNode"
        centered
        open={open}
        onOk={() => {
          let req = {
            id: node.id,
            name: form.getFieldValue('name'),
            ip: form.getFieldValue('ip')
          }
          editNode(req).then(res => {
            if(res.message === 'ok'){
              setOpen(false);
              form.resetFields();
              callback(res.data);
            }else{
              Modal.error({
                title: 'Error',
                content: res.message
              });
            }
          })
        }}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        width={500}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="IP"
            name="ip"
            rules={[{ required: true, message: 'Please input ROS IP!' }]}
          >
            <Input />
          </Form.Item>   
        </Form>
      </Modal>
      <Modal
          title="Topic"
          centered
          open={openTopic}
          onOk={() => {
              let req = {
                rosNodeID: node.id || '',
                name: formTopic.getFieldValue('name'),
                type: formTopic.getFieldValue('type')
              }
              createTopic(req).then(res => {
                if(res.message === 'ok'){
                  callback(node);
                  setOpenTopic(false);
                  formTopic.resetFields();
                }else{
                  Modal.error({
                    title: 'Error',
                    content: res.message
                  });
                }
              })
            }
          }
          onCancel={() => {
              setOpenTopic(false);
              formTopic.resetFields();
            }
          }
          width={500}
        >
          <Form
            name="topic"
            form={formTopic}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input Topic name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please choose Topic type!' }]}
            >
              <Select
                placeholder="Please choose Topic type"
                allowClear
                style={{ width: '100%' }}
              >
                <Select.Option value="chart">Chart</Select.Option>
                <Select.Option value="video">Video</Select.Option>
              </Select>
            </Form.Item>   
          </Form>
      </Modal>
    </div>
  );
};

export default ContentPage;
