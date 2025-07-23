import React from 'react'

const Navbar = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center pt-4 pb-3 px-3 md:px-6 border-gray-700 border-b-2 space-y-4 md:space-y-0'>
      <div className='flex flex-row gap-1'> <img src="assets/logo.svg" alt="" className="h-6 md:h-auto" /> <div><span className='font-normal'>SECURE</span><span className='font-extrabold'>SIGHTS</span></div> </div>
      
      {/* Navigation Menu - Collapsible on mobile */}
      <div className='flex flex-wrap md:flex-row justify-center gap-3 md:gap-6'>
        <div className='flex flex-row items-center gap-1'> <img src="assets/Dashboard.svg" alt="" /> <span className='text-[12px]'>Dashboard</span></div>
        <div className='flex flex-row items-center gap-1'> <img src="assets/camera.svg" alt="" /> <span className='text-[12px]'>Camera</span></div>
        <div className='flex flex-row items-center gap-1'> <img src="assets/scene.svg" alt="" /> <span className='text-[12px]'>Scenes</span></div>
        <div className='flex flex-row items-center gap-1'> <img src="assets/incident.svg" alt="" /> <span className='text-[12px]'>Incidents</span></div>
        <div className='flex flex-row items-center gap-1'> <img src="assets/users.svg" alt="" /> <span className='text-[12px]'>Users</span></div>
      </div>

      {/* User Profile Section */}
      <div className='flex flex-row gap-2 items-center'>
        <div className='text-5xl'> <img src="assets/Image.svg" alt="" className="w-10 md:w-auto" /> </div>
        <div className="hidden md:block">
            <div className='text-sm'>Mohammad Ahjas</div>
            <div className='text-xs'>ahjas@securesight.com</div>
        </div>
        <div><img src="assets/chevron-down.svg" alt="" /></div>
      </div>
    </div>
  )
}

export default Navbar
