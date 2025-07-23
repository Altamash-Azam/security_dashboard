
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Incident from '@/models/Incident.model';

interface Params {
  id: string;
}

export async function PATCH(request: Request, context: { params: Params }) {
  try {
    await dbConnect();
    const param = await context.params;
    const id = param.id;
    
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
