import React, { useState } from 'react';
import { Incident } from '@/types';


type IncidentItemProps = {
  incident: Incident;
  onResolve: (id: string) => void;
};

// Helper function to format dates
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit', minute: '2-digit',
        day: 'numeric', month: 'short', year: 'numeric',
        hour12: false
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
}


const IncidentItem: React.FC<IncidentItemProps> = ({ incident, onResolve }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleResolveClick = () => {
    setIsFadingOut(true);
    // Wait for the fade-out animation to be visible before calling the parent function
    setTimeout(() => {
      onResolve(incident._id);
    }, 300); // Duration should match the transition duration
  };

  // You can create a mapping for icons based on incident.type
  const getIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'unauthorised access': return 'assets/bxs_door-open.svg';
      case 'gun threat': return 'assets/gun.svg';
      default: return 'assets/danger.svg';
    }
  }

  return (
    <div className={`transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className='flex flex-row p-1 pr-2 md:pr-3 gap-2'>
        <img className='rounded-lg w-20 md:w-24 h-14 md:h-16 object-cover' src={incident.thumbnailUrl} alt={incident.type} />
        <div className='flex flex-col justify-between flex-1 md:w-[67%]'>
          <div className='flex flex-row items-center text-xs md:text-sm'>
            <img src={getIcon(incident.type)} alt="icon" className="mr-1.5 w-3 h-3 md:w-4 md:h-4" />
            <span>{incident.type}</span>
          </div>
          <div>
            <div className='flex flex-row text-[8px] md:text-[10px] font-normal gap-1 items-center'>
              <img className='w-[8px] md:w-[10px]' src="assets/camera.svg" alt="camera icon" />
              {/* Accessing populated camera data */}
              <span>{incident.cameraId.name}</span>
            </div>
            <div className='flex flex-row text-[8px] md:text-[10px] font-bold gap-1 items-center'>
              <img className='w-[8px] md:w-[10px]' src="assets/clock.svg" alt="clock icon" />
              <span>{formatDate(incident.tsStart)}</span>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <button onClick={handleResolveClick} className="p-1">
            <img src="assets/Resolve.svg" alt="Resolve button" className="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentItem;


