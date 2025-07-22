"use client"

import React, { useState, useEffect, useRef } from 'react';

// Define the type for a single timeline event
interface Event {
  year: string;
  title: string;
  description: string;
}

// Define props for the Timeline component
interface TimelineProps {
  events: Event[];
}

// Define props for the TimelineItem component
interface TimelineItemProps {
  data: Event;
  isLeft: boolean;
}

// Main App Component
export default function Time() {
  // Data for the timeline events, typed as an array of Event
  const timelineData: Event[] = [
    {
      year: '2019',
      title: 'Project Inception',
      description: 'The journey began with a simple idea and a dedicated team. We laid the groundwork for what would become a revolutionary platform.',
    },
    {
      year: '2020',
      title: 'First Prototype',
      description: 'After months of hard work, we unveiled our first prototype. It was a significant milestone that validated our core concepts.',
    },
    {
      year: '2021',
      title: 'Secured Seed Funding',
      description: 'With a promising prototype, we successfully secured seed funding, allowing us to expand our team and accelerate development.',
    },
    {
      year: '2022',
      title: 'Public Beta Launch',
      description: 'We launched our public beta, inviting users to experience our platform for the first time. The feedback was overwhelmingly positive.',
    },
    {
      year: '2023',
      title: 'Official Launch & Growth',
      description: 'Our platform officially launched, and we saw rapid user adoption. We continued to iterate and add new features based on user feedback.',
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'We expanded our services globally, reaching new markets and users. Our team grew to support our expanding user base.',
    },
    {
      year: '2025',
      title: 'Future Innovations',
      description: 'We are constantly innovating and looking for new ways to improve our platform. The future is bright, and we are excited for what\'s to come.',
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-cyan-400">
          Our Journey
        </h1>
        <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-20">
          Follow our story from a humble beginning to a global presence. This timeline highlights our major milestones and achievements along the way.
        </p>
        <Timeline events={timelineData} />
      </div>
    </div>
  );
}

// Timeline Component
const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);

  // Effect to handle scaling on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const distance = Math.abs(top + height / 2 - viewportHeight / 2);
        const newScale = Math.max(0.8, 1 - distance / (viewportHeight * 2));
        setScale(newScale);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto">
      {/* The central timeline bar that scales */}
      <div 
        className="absolute top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-purple-500 left-1/2 -translate-x-1/2 rounded-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-50%) scaleY(${scale})` }}
      ></div>

      {/* Mapping over events to create timeline items */}
      <div className="relative">
        {events.map((event, index) => (
          <TimelineItem
            key={index}
            data={event}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

// Timeline Item Component
const TimelineItem: React.FC<TimelineItemProps> = ({ data, isLeft }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Effect to check if the item is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.5,
      }
    );

    const currentRef = itemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Dynamic classes for positioning (left/right)
  const itemPositionClass = isLeft ? 'md:pr-8 text-right' : 'md:pl-8 text-left';
  const yearPositionClass = isLeft ? 'md:left-auto md:right-0' : 'md:left-0 md:right-auto';
  const alignmentClass = isLeft ? 'md:items-end' : 'md:items-start';
  const transformClass = isVisible
    ? 'transform opacity-100 scale-100'
    : `transform opacity-0 ${isLeft ? 'translate-x-[-20px]' : 'translate-x-[20px]'} scale-95`;

  return (
    <div
      ref={itemRef}
      className={`mb-12 flex flex-col ${alignmentClass} w-full md:w-1/2 ${isLeft ? 'md:ml-0' : 'md:ml-auto'}`}
    >
      <div className="relative">
        {/* The dot on the timeline */}
        <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 ${yearPositionClass} ${isLeft ? 'md:-mr-2' : 'md:-ml-2'}`}></div>
        
        <div className={`p-6 bg-gray-800 rounded-lg shadow-xl transition-all duration-700 ease-in-out ${transformClass} ${itemPositionClass}`}>
          <p className="text-2xl font-bold text-cyan-400 mb-2">{data.year}</p>
          <h3 className="text-xl font-semibold text-white mb-3">{data.title}</h3>
          <p className="text-gray-300">{data.description}</p>
        </div>
      </div>
    </div>
  );
};
