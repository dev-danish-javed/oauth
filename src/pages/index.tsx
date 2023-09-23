import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`min-h-screen`}
    >
      <div className='flex justify-center items-center text-stone-300 h-screen'>
        <div className='text-7xl'>OAuth Test</div>
      </div>
    </main>
  )
}
