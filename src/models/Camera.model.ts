import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ICamera extends Document {
  name: string;
  location: string;
}

const CameraSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

export default models.Camera || model<ICamera>('Camera', CameraSchema);