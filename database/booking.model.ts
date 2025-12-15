import { Schema, model, models, Document, Types } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (email: string) => {
          // Basic email format validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: 'Invalid email format',
      },
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Create index on eventId for faster queries when fetching bookings by event
BookingSchema.index({ eventId: 1 });

// Pre-save hook to verify that the referenced event exists
BookingSchema.pre('save', async function () {
  // Only validate eventId if it's new or modified
  if (this.isNew || this.isModified('eventId')) {
    // Dynamically import Event model to avoid circular dependency issues
    const Event = models.Event || (await import('./event.model')).default;

    const eventExists = await Event.findById(this.eventId);

    if (!eventExists) {
      throw new Error('Referenced event does not exist');
    }
  }
});

// Use existing model if available (prevents recompilation in development)
const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
