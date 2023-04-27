import ContentPage from '../components/Content';
import LeftBar from '../components/Leftbar'
import { useState, useEffect } from 'react';
import { ROSNode, Topic} from '../api/types'
import { getAllNodes, getTopicsByNodeName } from '@/api/api';
export default function Home() {
  const [nodes, setNodes] = useState<ROSNode[]>([]);
  const [cur, setCur] = useState<ROSNode>({name:'', id:'', ip: ''});
  const [topics, setTopics] = useState<Topic[]>([]);
  useEffect(() => {
    getAllNodes().then(res => {
      setNodes(res.data);
      setCur(res.data[0]);
    }).then(() => {
      getTopicsByNodeName(cur.name).then(res => {
        setTopics(res.data);
      })
    })
  }, []);

  const setCurNode = (node: ROSNode) => {
    getAllNodes().then(res => {
      setNodes(res.data);
    })
    setCur(node);
    getTopicsByNodeName(node.name).then(res => {
      setTopics(res.data);
    })
  }
  return (
    <main className="flex h-screen">
      <LeftBar 
        nodes={nodes}
        cur={cur}
        callback={setCurNode}
      />
      <div className="flex-grow">
        {
          nodes.length == 0  ||
          <ContentPage
            node={cur}
            topics={topics}
            callback={setCurNode}
          />
        }
      </div>
    </main>
  )
}
