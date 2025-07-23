
import { Schema, Document, models, model } from 'mongoose';
import { ICamera } from './Camera.model';

export interface IIncident extends Document {
  cameraId: ICamera['_id'];
  type: string;
  tsStart: Date;
  tsEnd: Date;
  thumbnailUrl: string;
  resolved: boolean;
}

const IncidentSchema: Schema = new Schema({
  cameraId: { type: Schema.Types.ObjectId, ref: 'Camera', required: true },
  type: { type: String, required: true },
  tsStart: { type: Date, required: true },
  tsEnd: { type: Date, required: true },
  thumbnailUrl: { type: String, required: true },
  resolved: { type: Boolean, default: false },
});

export default models.Incident || model<IIncident>('Incident', IncidentSchema);
