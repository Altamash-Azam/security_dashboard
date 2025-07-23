export interface Camera {
  _id: string;
  name: string;
  location: string;
}

export interface Incident {
  _id: string;
  cameraId: Camera; // This will be populated from the backend
  type: string;
  tsStart: string; // Dates will be strings after JSON serialization
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
}
