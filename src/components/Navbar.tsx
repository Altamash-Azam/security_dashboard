import React from 'react'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between items-center pt-4 pb-3 px-6 border-gray-700 border-b-2  '>
      <div className='flex flex-row gap-1'> <img src="assets/logo.svg" alt="" /> <div><span className='font-normal'>SECURE</span><span className='font-extrabold'>SIGHTS</span></div> </div>
      <div className='flex flex-row gap-6'>
        <div className='flex flex-row items-center gap-1'> <img src="assets/Dashboard.svg" alt="" /> <span className='text-[12px]'>Dashboard</span></div>
        <div className='flex flex-row items-center gap-1'> <img src="assets/camera.svg" alt="" /> <span className='text-[12px]'>Camera</span></div>
        <div className='flex flex-row items-center gap-1'> <img src="assets/scene.svg" alt="" /> <span className='text-[12px]'>Scenes</span></div>
        <div className='flex flex-row items-center gap-1'> <img src="assets/incident.svg" alt="" /> <span className='text-[12px]'>Incidents</span></div>
        <div className='flex flex-row items-center gap-1'> <img src="assets/users.svg" alt="" /> <span className='text-[12px]'>Users</span></div>

      </div>
      <div className='flex flex-row gap-2 items-center'>
        <div className='text-5xl'> <img src="assets/Image.svg" alt="" /> </div>
        <div>
            <div className='text-sm'>Mohammad Ahjas</div>
            <div className='text-xs'>ahjas@securesight.com</div>
        </div>
        <div><img src="assets/chevron-down.svg" alt="" /></div>
      </div>
    </div>
  )
}

export default Navbar
