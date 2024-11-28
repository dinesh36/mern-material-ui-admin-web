import mongoose from 'mongoose';
import { mongoConnectURL } from '../lib/config';

export default async function initDb() {
  await mongoose.connect(mongoConnectURL);
}
