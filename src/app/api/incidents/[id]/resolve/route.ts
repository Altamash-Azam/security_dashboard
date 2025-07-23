
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Incident from '@/models/Incident.model';

interface Params {
  id: string;
}

export async function PATCH(
  request: Request,
   { params }: { params: Promise<{ id: string }>  }
){
  try {
    await dbConnect();
    const {id} = await params;
    
    const incident = await Incident.findByIdAndUpdate(
      id,
      { resolved: true },
      { new: true } // Return the updated document
    ).populate('cameraId', 'name location');

    if (!incident) {
      return NextResponse.json({ success: false, error: 'Incident not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: incident });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
