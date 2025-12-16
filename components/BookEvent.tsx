"use client";
import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import React, { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSumit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { success, error } = await createBooking({ eventId, slug, email });
    if (success) {
      setSubmitted(true);
      posthog.capture("event_booked", { eventId, slug, email });
      setEmail("");
    } else {
      console.error("Booking creation failed. ", error);
      posthog.captureException(error);
      setEmail("");
    }
  };
  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signinp up! </p>
      ) : (
        <form onSubmit={handleSumit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
