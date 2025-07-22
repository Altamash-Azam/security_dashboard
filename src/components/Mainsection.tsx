import React from 'react'

const MainSection = () => {
  return (
    <div className='p-6 flex flex-row gap-7'>
      <div className='relative'>
        <img className='rounded-xl' src="assets/main_footage.svg" alt="" />
        <div className='absolute mt-2 ml-2 top-0 left-0 bg-black/90 flex flex-row py-0.5 px-2 rounded-sm'> <img src="assets/calendar-days.svg" alt="" /> <span className='text-xs'>11/7/2025 - 03:12:37</span></div>
        <div className='bg-black/90 flex flex-row py-0.5 px-2 mb-2 ml-2 text-xs absolute bottom-0 left-0'> <img src="assets/disc.svg" alt="" /> <span>Camera-01</span> </div>

        <div className='absolute right-0 bottom-0 mb-2 mr-2 flex flex-row gap-3'>
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


      <div className='h-full w-1/2 bg-gray-600'>
ksdvlksmvpdsmvs
      </div>
    </div>
  )
}

export default MainSection
