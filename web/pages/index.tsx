import ContentPage from './_content';
import LeftBar from './_leftbar'
import { useState, useEffect } from 'react';
import { ROSNode, Topic} from './api/types'

export default function Home() {
  const [nodes, setNodes] = useState<ROSNode[]>([
    {name:'ros',id:'1', ip: ''},{name:'ros',id:'2', ip: ''}
  ]);
  const [cur, setCur] = useState<ROSNode>({name:'ros',id:'1', ip: ''});
  const [topics, setTopics] = useState<Topic[]>([
    {name:'test',type:'table',id:'1',content:[{value:'1', time: '2020-01-01'}]},
    {name:'test',type:'table',id:'1',content:[{value:'1', time: '2020-01-01'}]},
  ]);
  useEffect(() => {
    
  }, []);
  return (
    <main className="flex h-screen">
      <LeftBar 
        nodes={nodes}
        cur={cur.id}
      />
      <div className="flex-grow">
        {
          nodes.length == 0  ||
          <ContentPage
            node={cur} 
            topics={topics}
          />
        }
      </div>
    </main>
  )
}
