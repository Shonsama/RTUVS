import { Button, Form, Input, Modal } from 'antd';
import { ROSNode } from '../api/types';
import { useState } from 'react';

type LeftBarProps = {
  cur: string;
  nodes: ROSNode[];
};

const LeftBar: React.FC<LeftBarProps> = ({ cur, nodes }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();


  return (
    <aside className="flex flex-col items-center w-56 p-3 h-full border-b bg-gray-100">
      <nav className="w-full">
        <Button
          onClick={() => setOpen(true)}
          type='primary'
          className="w-full mb-2 rounded-md px-2 py-1"
        >
          +
        </Button>
        {nodes.map((node) => {
          if (node.id === cur) {
            return (
              <div
                key={node.id}
                className="w-full cursor-pointer text-center rounded-md mb-2 px-2 py-1 bg-gray-200 hover:bg-gray-300 focus:bg-gray-200"
              >
                {node.name}
              </div>
            );
          } else {
            return (
              <div
                key={node.id}
                className="w-full cursor-pointer text-center rounded-md mb-2 px-2 py-1 hover:bg-gray-300 focus:bg-gray-200"
              >
                {node.name}
              </div>
            );
          }
        })}
      </nav>
      <Modal
        title="ROSNode"
        centered
        open={open}
        onOk={() => {
          setOpen(false);
          let req = {
            name: form.getFieldValue('name'),
            ip: form.getFieldValue('ip')
          }
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
            rules={[{ required: true, message: 'Please input ROS name!' }]}
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
    </aside>    
  );
};

export default LeftBar;
