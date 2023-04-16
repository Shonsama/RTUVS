import { Inter } from 'next/font/google'
import Card from './_card'
import LeftBar from './_leftbar'
import { useState, useEffect } from 'react';
import  {ROSNode} from './api/types'

export default function Home() {
  const [nodes, setNodes] = useState<ROSNode[]>([{name:'ros',id:'1'}]);

  useEffect(() => {
  }, []);
  return (
    <main className="flex h-screen">
      <LeftBar 
        nodes={nodes}
        cur='1'
      />
      <div className="px-6 mb-6 mt-6">
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          <Card
            title="Welcome"
            content={
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
                urna sed est posuere ultrices in id libero. Nam aliquet sapien
                tortor, vel maximus mi sagittis vitae.
              </p>
            }
          />
        </div>
      </div>
      
    </main>
  )
}
