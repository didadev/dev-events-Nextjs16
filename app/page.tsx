"use cache";
import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { cacheLife, cacheTag } from "next/cache";
//import { events } from "@/lib/constants";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
  let events = [];
  try {
    cacheLife("hours");
    const result = await fetch(`${BASE_URL}/api/events`);
    if (result.ok) {
      const data = await result.json();
      events = data.events || [];
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return (
    <section>
      <h1 className="text-center">
        The hub for every dev
        <br />
        Event you can't
      </h1>
      <p className="text-center mt-5">
        Hackathon, Meetups and conferences. All in one place.
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event._id.toString()}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
