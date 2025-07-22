import React from 'react'
import Navbar from './Navbar'
import MainSection from './Mainsection'

const Dashboard = () => {
  return (
    <div className="min-h-[80vh] bg-black  bg-[radial-gradient(ellipse_at_top,#FFCC0020_0%,transparent_70%)]">
      <Navbar/>
      <MainSection/>
    </div>
  )
}

export default Dashboard
