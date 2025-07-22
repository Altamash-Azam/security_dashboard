"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- TYPE DEFINITIONS (for TypeScript) ---
interface Clip {
  id: string;
  start: number; // in seconds
  duration: number; // in seconds
  text: string;
  trackId: string;
  color: string;
}

interface Track {
  id: string;
  clips: Clip[];
}

// --- CONSTANTS ---
const PIXELS_PER_SECOND = 60; // The base width for one second at zoom level 1

// --- HELPER COMPONENTS ---

// Component for the time ruler at the top
const TimeRuler = ({ zoom, duration, scrollLeft }: { zoom: number; duration: number; scrollLeft: number }) => {
  const rulerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = rulerRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const totalWidth = duration * PIXELS_PER_SECOND * zoom;

    ctx.clearRect(0, 0, width, height);

    // Style
    ctx.fillStyle = '#FFFFFF'; // gray-400
    ctx.font = '3px sans-serif';

    const step = 1; // Major tick every 1 second
    const minorStep = 0.1; // Minor tick every 0.2 seconds

    for (let i = 0; i * PIXELS_PER_SECOND * zoom < totalWidth; i += minorStep) {
      const x = i * PIXELS_PER_SECOND * zoom - scrollLeft;

      if (x < 0 || x > width) continue; // Don't draw off-screen ticks

      if (i % step === 0) {
        // Major tick
        ctx.fillRect(x, height - 20, 1, 15);
        ctx.fillText(`${i}s`, x + 4, height - 8);
      } else {
        // Minor tick
        ctx.fillRect(x, height - 10, 1, 5);
      }
    }
  }, [zoom, duration, scrollLeft]);

  return <canvas ref={rulerRef} width={1200} height={30} className="w-full py-0 my-0 bg-black" />;
};


// --- MAIN COMPONENT ---

export default function Scrollabletimeline() {
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: 'track-1',
      clips: [
        { id: 'clip-1', start: 1, duration: 5, text: 'Unauthorized access', trackId: 'track-1', color: 'bg-amber-500' },
        { id: 'clip-2', start: 8, duration: 4, text: 'Gun Threat', trackId: 'track-1', color: 'bg-slate-500' },
      ],
    },
    {
      id: 'track-2',
      clips: [
        { id: 'clip-3', start: 15, duration: 5, text: 'Face Recognized', trackId: 'track-2', color: 'bg-teal-500' },
      ],
    },
  ]);

  const [currentTime, setCurrentTime] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [duration, setDuration] = useState(25); // Total timeline duration in seconds
  const [activeDrag, setActiveDrag] = useState<any>(null);

  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  // --- UTILITY FUNCTIONS ---
  const pixelsToSeconds = useCallback((pixels: number) => pixels / (PIXELS_PER_SECOND * zoom), [zoom]);
  const secondsToPixels = useCallback((seconds: number) => seconds * PIXELS_PER_SECOND * zoom, [zoom]);

  // --- MOUSE EVENT HANDLERS for dragging and resizing ---

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!activeDrag || !timelineContainerRef.current) return;

    const timelineRect = timelineContainerRef.current.getBoundingClientRect();
    const moveX = e.clientX - activeDrag.startX;
    const deltaTime = pixelsToSeconds(moveX);

    setTracks(prevTracks => {
      return prevTracks.map(track => {
        if (track.id !== activeDrag.trackId) return track;

        return {
          ...track,
          clips: track.clips.map(clip => {
            if (clip.id !== activeDrag.clipId) return clip;

            let newStart = clip.start;
            let newDuration = clip.duration;

            if (activeDrag.type === 'drag') {
              newStart = Math.max(0, activeDrag.originalStart + deltaTime);
            } else if (activeDrag.type === 'resize-right') {
              newDuration = Math.max(0.2, activeDrag.originalDuration + deltaTime);
            } else if (activeDrag.type === 'resize-left') {
              const potentialNewStart = activeDrag.originalStart + deltaTime;
              const potentialNewDuration = activeDrag.originalDuration - deltaTime;
              if (potentialNewDuration >= 0.2) {
                newStart = potentialNewStart;
                newDuration = potentialNewDuration;
              }
            }

            return { ...clip, start: newStart, duration: newDuration };
          }),
        };
      });
    });
  }, [activeDrag, pixelsToSeconds]);

  const handleMouseUp = useCallback(() => {
    setActiveDrag(null);
  }, []);

  // Add/remove global mouse listeners when a drag starts/stops
  useEffect(() => {
    if (activeDrag) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeDrag, handleMouseMove, handleMouseUp]);


  // --- JSX ---
  return (
    <div className="bg-black text-white h-1/2  font-sans flex flex-col px-4 py-1">
      {/* <h1 className="text-2xl font-bold mb-4">Video Editor Timeline</h1> */}

      {/* Controls */}
      <div className="flex items-center gap-4  p-1 text-sm bg-[#131313] rounded-md">
        <button onClick={() => setCurrentTime(0)} className="px-3 py-1 bg-black text-sm rounded">To Start</button>
        <span>Time: {currentTime.toFixed(2)}s  <input type="number" name="time" onChange={(e) => setCurrentTime(parseInt(e.target.value))} placeholder='0.00s' /> </span>
        <div className="flex-grow"></div>
        <span>Zoom:</span>
        <button onClick={() => setZoom(z => Math.max(1, z / 1.5))} className="px-3 py-1 bg-black rounded">-</button>
        <button onClick={() => setZoom(1)} className="px-3 py-1 bg-black rounded">Reset</button>
        <button onClick={() => setZoom(z => Math.min(10, z * 1.5))} className="px-3 py-1 bg-black rounded">+</button>
      </div>

      {/* Timeline */}
      <div
        className="flex-grow overflow-x-auto bg-[#232323] rounded-md scrollbar-hide"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE 10+
        }}
        onScroll={(e) => setScrollLeft(e.currentTarget.scrollLeft)}
      >
        <style>
          {`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        `}
        </style>
        <div
          ref={timelineContainerRef}
          className="relative"
          style={{ width: `${secondsToPixels(duration)}px` }}
        >
          {/* Ruler */}
          <div className="sticky top-0 z-20">
            <TimeRuler zoom={zoom} duration={duration} scrollLeft={scrollLeft} />
          </div>

          {/* Playhead */}
          <div
            className="absolute bottom-0 h-[90%] w-0.5 bg-red-200 z-30"
            style={{ left: `${secondsToPixels(currentTime)}px` }}
          >
            <div className="absolute -top-1 -left-1.5 w-4 h-4 z-30 bg-red-200 rounded-full"></div>
          </div>

          {/* Tracks and Clips */}
          <div className="relative pt-2">
            {tracks.map(track => (
              <div key={track.id} className="h-15 flex items-center border-b border-gray-400">
                {track.clips.map(clip => (
                  <div
                    key={clip.id}
                    className={`absolute h-8 top-2 rounded-md flex items-center justify-center text-sm cursor-move select-none ${clip.color}`}
                    style={{
                      left: `${secondsToPixels(clip.start)}px`,
                      width: `${secondsToPixels(clip.duration)}px`,
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setActiveDrag({
                        type: 'drag',
                        clipId: clip.id,
                        trackId: track.id,
                        startX: e.clientX,
                        originalStart: clip.start
                      });
                    }}
                  >
                    {/* Resize Handles */}
                    <div
                      className="absolute left-0 top-0 h-full w-2 cursor-ew-resize"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setActiveDrag({
                          type: 'resize-left',
                          clipId: clip.id,
                          trackId: track.id,
                          startX: e.clientX,
                          originalStart: clip.start,
                          originalDuration: clip.duration
                        });
                      }}
                    ></div>
                    <div className='flex flex-row gap-3'><span>{clip.text}</span><span>{clip.duration.toFixed(2)}:00s</span></div>
                    <div
                      className="absolute right-0 top-0 h-full w-2 cursor-ew-resize"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setActiveDrag({
                          type: 'resize-right',
                          clipId: clip.id,
                          trackId: track.id,
                          startX: e.clientX,
                          originalDuration: clip.duration
                        });
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
