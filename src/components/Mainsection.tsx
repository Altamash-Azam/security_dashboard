"use client"; 
// import Tabs from './Tabs'
import React, { useState, useEffect, useCallback } from 'react';
import IncidentItem from './IncidentItem'; // Renamed from Tabs
import { Incident } from '@/types'; // Import the type definition

const MainSection = () => {

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/incidents?resolved=false');
        if (!response.ok) {
          throw new Error('Failed to fetch incidents');
        }
        const data = await response.json();
        setIncidents(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleResolve = useCallback(async (incidentId: string) => {
    // --- Optimistic UI Update ---
    const originalIncidents = [...incidents];
    setIncidents(prev => prev.filter(inc => inc._id !== incidentId));

    // --- API Call ---
    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        // If the API fails, revert the UI change
        throw new Error('API call failed');
      }
      // On success, do nothing - the UI is already updated.
    } catch (error) {
      console.error("Failed to resolve, reverting change.", error);
      setIncidents(originalIncidents);
    }
  }, [incidents]);


  return (
    <div className='p-6 flex flex-col md:flex-row gap-7'>
      {/* Left Side: Video Player */}
      <div className='relative w-full md:w-[60%]'>
        <img className='rounded-lg w-full aspect-video object-cover' src="assets/main_footage.svg" alt="Main footage" />
        <div className='absolute mt-2 ml-2 top-0 left-0 bg-black/90 flex flex-row items-center py-0.5 px-2 rounded-sm'>
          <img src="assets/calendar-days.svg" alt="calendar" className="mr-1.5" />
          <span className='text-xs'>11/7/2025 - 03:12:37</span>
        </div>
        <div className='bg-black/90 flex flex-row items-center py-0.5 px-2 mb-3 ml-2 text-xs absolute bottom-0 left-0'>
          <img src="assets/disc.svg" alt="camera" className="mr-1.5" />
          <span>Camera-01</span>
        </div>

        <div className='absolute right-0 bottom-0 mb-3 mr-2 flex flex-row gap-3'>
          <div className='bg-black/90 flex flex-col'>
            <div className='flex flex-row justify-between px-2'><span className='text-[8px]'>camera - 02</span> <img src="assets/dots.svg" alt="" /></div>
            <div><img src="assets/sm-screenshot/sm-screenshot1.svg" alt="" /></div>
          </div>
          <div className='bg-black/90 flex flex-col'>
            <div className='flex flex-row justify-between px-2'><span className='text-[8px]'>camera - 03</span> <img src="assets/dots.svg" alt="" /></div>
            <div><img src="assets/small-camera1.svg" alt="" /></div>
          </div>
        </div>

        {/* Additional camera thumbnails would go here */}
      </div>

      {/* Right Side: Incident List */}
      <div className='h-auto md:h-[492px] w-full md:w-[40%] bg-[#131313] rounded-xl flex flex-col'>
        <div className='flex flex-row justify-between items-center p-4 border-b border-gray-700'>
          <div className='flex flex-row items-center gap-1.5'>
            <img src="assets/danger.svg" alt="danger icon" />
            <span className='text-lg'>{incidents.length} Unresolved Incidents</span>
          </div>
          {/* You can make this part dynamic later */}
          <div className='flex flex-row items-center'>
            <img src="assets/small-icons.svg" alt="" />
            <img src="assets/check-check.svg" alt="" />
            <span className="text-xs text-gray-400">4 resolved incidents</span>
          </div>
        </div>

        <div className='overflow-y-auto flex-grow p-2 flex flex-col gap-2 scrollbar-hide'>
          {isLoading ? (
            <p className="text-center text-gray-400 p-4">Loading Incidents...</p>
          ) : (
            incidents.map(incident => (
              <IncidentItem key={incident._id} incident={incident} onResolve={handleResolve} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MainSection
