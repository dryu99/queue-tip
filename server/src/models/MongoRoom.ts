import mongoose, { Schema } from 'mongoose';
import { MongoRoom } from '../types';

mongoose.set('useFindAndModify', false);

const roomSchema: Schema = new Schema({
  id: String, // TODO we aren't using mongoid, we're using our own custom uuid maybe change prop name to 'customId'
  name: String,
  totalUsersJoined: Number,
  // roomClosedAt: Date
}, { timestamps: true });

// roomSchema.set('toJSON', {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   transform: (_document: any, returnedObject: any) => {
//     /* eslint-disable @typescript-eslint/no-unsafe-member-access */
//     returnedObject.mongoId = (returnedObject._id as Schema.Types.ObjectId).toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//     /* eslint-enable @typescript-eslint/no-unsafe-member-access */
//   }
// });

export default mongoose.model<MongoRoom>('Room', roomSchema);