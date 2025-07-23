import React from 'react'

type TabsProps = {
    image: string;
    icon: string;
};

const Tabs: React.FC<TabsProps> = ({ image, icon }) => {
    return (
        <div>
            <div className='flex flex-row p-1 pr-3 gap-2'>
                <img className='rounded-lg' src={`assets/sm-screenshot/sm-screenshot${image}.svg`} alt="" />
                <div className='flex flex-col justify-between w-[67%]'>
                    <div className='flex flex-row'>
                        <img src={`assets/${icon}.svg`} alt="" />
                        <span>Unauthorized Access</span>
                    </div>
                    <div>
                        <div className='flex flex-row text-[10px] font-normal gap-1'>
                            <img className='w-[10px]' src="assets/camera.svg" alt="" /> 
                            <span>Shop Floor Camera A</span>
                        </div>
                        <div className='flex flex-row text-[10px] font-bold gap-1'>
                            <img src="assets/clock.svg" alt="" />
                            <span>14:35 - 14:37 on 7-jul-2025</span>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <img src="assets/Resolve.svg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Tabs
