'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Area } from '@/@types/Area';

const img =
  "https://robertacavina.com.br/wp-content/uploads/2013/03/45.png";

export default function Home() {
  const { push } = useRouter();
  const [areaName, setAreaName] = useState('');

  const [areas, setAreas] = useState<Area[]>([
    {
      id: '1',
      slug: 'jarra',
      name: 'Jarra',
      left: "19%",
      top: "48%",
    },
    {
      id: '2',
      slug: 'mesa-de-centro',
      name: 'Mesa de Centro',
      left: "55%",
      top: "68%",
    }
  ])

  const createArea = (x: number, y: number) => {
    const elementPosition = document.getElementById('imageRef')?.getBoundingClientRect();

    if (!elementPosition) {
      return;
    }

    if (areaName === '') {
      return;
    }

    const positionX = (((x - elementPosition.x) / elementPosition.width) * 100);
    const positionY = ((y - elementPosition.y) / elementPosition.height) * 100;

    const area: Area = {
      id: areaName,
      slug: areaName,
      name: areaName,
      left: `${positionX}%`,
      top: `${positionY}%`,
    }

    setAreas([...areas, area]);
    setAreaName('');
  }

  const ImageMapComponent = useMemo(() => {
    const onMapClick = (slug: string) => {
      push(`/${slug}`)
    }

    return (
      <div style={{ width: '600px', height: '400px', position: 'relative' }}>
        <Image
          src={img}
          width={600}
          height={400}
          alt="Sala de Jantar"
          style={{ width: '600px', height: '400px' }}
        />
        {areas.map(area => (
          <div
            key={area.slug}
            style={{ width: '10px', height: '10px', position: 'absolute', top: area.top, left: area.left }}
            className='bg-blue-600'
            onClick={() => onMapClick(area.slug)}
          />
        ))}
      </div>
    )
  }, [areas, push])


  return (
    <main className="flex min-h-screen flex-col gap-10 p-24">
      <div className="flex flex-row gap-10">
        <Image
          src={img}
          width={600}
          height={400}
          alt="Sala de Jantar"
          onClickCapture={e => createArea(e.clientX, e.clientY)}
          style={{ width: '600px', height: '400px' }}
          id='imageRef'
        />

        <div>{ImageMapComponent}</div>
      </div>

      <div className='flex flex-col gap-4'>
        {areas.map(area => (
          <div key={area.name} className='flex flex-row gap-2'>
            <span>{area.name}</span>
            <div><span>X: </span> {area.left}</div>
            <div><span>Y: </span> {area.top}</div>
          </div>
        ))}
        <input
          type="text"
          placeholder='Nova Area'
          value={areaName}
          onChange={e => setAreaName(e.target.value)}
          style={{ width: '150px', height: '20px' }}
        />
      </div>

    </main>
  )
}
