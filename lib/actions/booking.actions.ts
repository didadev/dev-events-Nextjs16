"use server";
import { Booking } from "@/database";
import connectToDatabase from "../mongodb";
import { log } from "console";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectToDatabase();
    console.log("slug ", slug);
    await Booking.create({ eventId, slug, email });
    return {
      success: true,
    };
  } catch (error) {
    console.log("Create Booking failed. ", error);
    return {
      success: false,
      error,
    };
  }
};
