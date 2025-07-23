
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Camera from '../models/Camera.model';
import Incident from '../models/Incident.model';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

const seedDatabase = async () => {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env.local');
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI as string || "", {
              dbName: 'security'
           });
  console.log('Connected to MongoDB.');

  console.log('Clearing existing data...');
  await Camera.deleteMany({});
  await Incident.deleteMany({});
  console.log('Data cleared.');

  console.log('Seeding cameras...');
  const cameras = await Camera.insertMany([
    { name: 'Shop Floor A', location: 'Main Hall' },
    { name: 'Vault Door', location: 'Secure Area' },
    { name: 'Main Entrance', location: 'Lobby' },
  ]);
  console.log(`${cameras.length} cameras seeded.`);

  console.log('Seeding incidents...');
  const incidentTypes = ['Unauthorised Access', 'Gun Threat', 'Face Recognised', 'Fire Detected'];
  const incidents = [];
  const now = new Date();

  for (let i = 0; i < 15; i++) {
    const randomCamera = cameras[Math.floor(Math.random() * cameras.length)];
    const randomType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
    
    // Create believable timestamps within the last 24 hours
    const tsStart = new Date(now.getTime() - Math.floor(Math.random() * 24 * 60 * 60 * 1000));
    const tsEnd = new Date(tsStart.getTime() + Math.floor(Math.random() * 5 + 1) * 60 * 1000); // 1-5 mins duration

    incidents.push({
      cameraId: randomCamera._id,
      type: randomType,
      tsStart,
      tsEnd,
      thumbnailUrl: `/thumbnails/thumb_${i + 1}.jpg`, // Placeholder for local images
      resolved: Math.random() > 0.7, // Some incidents are already resolved
    });
  }

  await Incident.insertMany(incidents);
  console.log(`${incidents.length} incidents seeded.`);

  console.log('Database seeding complete.');
  await mongoose.connection.close();
};

seedDatabase().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
