import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'
const Home = () => {
  return (
    <div className='flex h-[98vh] gap-3 '>
        <div className=' w-1/6 border border-black rounded-xl p-4 flex flex-col gap-10 justify-between'>
        <Sidebar/></div>
        <div className=' w-5/6 border border-black rounded-xl p-4'>
        <Outlet></Outlet>
        </div>
    </div>
  )
}

export default Home