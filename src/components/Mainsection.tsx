import React from 'react'
import Tabs from './Tabs'

const MainSection = () => {
  return (
    <div className='p-6 flex flex-row gap-7'>
      <div className='relative w-[60%]'>
        <img className='rounded-lg w-full' src="assets/main_footage.svg" alt="" />
        <div className='absolute mt-2 ml-2 top-0 left-0 bg-black/90 flex flex-row py-0.5 px-2 rounded-sm'> <img src="assets/calendar-days.svg" alt="" /> <span className='text-xs'>11/7/2025 - 03:12:37</span></div>
        <div className='bg-black/90 flex flex-row py-0.5 px-2 mb-3 ml-2 text-xs absolute bottom-0 left-0'> <img src="assets/disc.svg" alt="" /> <span>Camera-01</span> </div>

        <div className='absolute right-0 bottom-0 mb-3 mr-2 flex flex-row gap-3'>
          <div className='bg-black/90 flex flex-col'>
            <div className='flex flex-row justify-between px-2'><span className='text-[8px]'>camera - 02</span> <img src="assets/dots.svg" alt="" /></div>
            <div><img src="assets/small-camera1.svg" alt="" /></div>
          </div>
          <div className='bg-black/90 flex flex-col'>
            <div className='flex flex-row justify-between px-2'><span className='text-[8px]'>camera - 02</span> <img src="assets/dots.svg" alt="" /></div>
            <div><img src="assets/small-camera1.svg" alt="" /></div>
          </div>

        </div>
      </div>


      <div className='h-[492px] w-[40%] bg-[#131313] rounded-xl'>
        <div className='flex flex-row justify-between items-center p-4'> 
          <div className='flex flex-row gap-1.5'>
            <img src="assets/danger.svg" alt="" />
            <span className='text-lg'>15 Unresolved Incidents</span>
          </div>
          <div className='flex flex-row'>
            <img src="assets/small-icons.svg" alt="" />
            <img src="assets/check-check.svg" alt="" />
            <div className="text-xs">4 resolved incidents</div>
          </div>
        </div>


        <div className='overflow-y-auto max-h-[430px] h-full scrollbar-hide flex flex-col gap-2'>

          
          <Tabs key={1} image="1" icon="bxs_door-open"/>
          <Tabs key={2} image="2" icon="gun"/>
          <Tabs key={3} image="3" icon="bxs_door-open"/>
          <Tabs key={4} image="4" icon="gun"/>
          <Tabs key={5} image="2" icon="bxs_door-open"/>
          <Tabs key={6} image="3" icon="bxs_door-open"/>
          <Tabs key={7} image="4" icon="gun"/>
          <Tabs key={8} image="1" icon="bxs_door-open"/>
          
          
          

        </div>

      </div>
    </div>
  )
}

export default MainSection
