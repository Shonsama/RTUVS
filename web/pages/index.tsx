import { Inter } from 'next/font/google'
import ContentPage from './_content';
import Card from './_card'
import LeftBar from './_leftbar'
import { useState, useEffect } from 'react';
import  {ROSNode} from './api/types'

export default function Home() {
  const [nodes, setNodes] = useState<ROSNode[]>([{name:'ros',id:'1'},{name:'ros',id:'2'},{name:'ros',id:'3'},{name:'ros',id:'4'},{name:'ros',id:'5'},{name:'ros',id:'6'}]);

  useEffect(() => {
  }, []);
  return (
    <main className="flex h-screen">
      <LeftBar 
        nodes={nodes}
        cur='1'
      />
      <div className="flex-grow">
        <ContentPage
          node={nodes[0]} 
          topics={[]}
        />
      </div>    
    </main>
  )
}
