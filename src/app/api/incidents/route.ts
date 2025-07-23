
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Incident from '@/models/Incident.model';
import Camera from '@/models/Camera.model'; // <--- ADD THIS IMPORT

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const resolved = searchParams.get('resolved');

    const query = resolved === 'false' ? { resolved: false } : {};

    // By importing Camera, we ensure the model is registered before this runs.
    const incidents = await Incident.find(query)
      .populate('cameraId', 'name location') // Populate camera details
      .sort({ tsStart: -1 }); // Newest-first

    return NextResponse.json({ success: true, data: incidents });
  } catch (error) {
    console.error("API Error fetching incidents:", error); 
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
