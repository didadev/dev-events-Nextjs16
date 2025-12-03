"use client";
import Image from "next/image";

const ExploreBtn = () => {
  return (
    <button
      onClick={() => console.log("click")}
      type="button"
      id="explore-btn"
      className="mx-auto mt-7"
    >
      <a href="#events">Explore Events</a>
      <Image
        src="/icons/arrow-down.svg"
        alt="arrow-down"
        width={24}
        height={24}
      />
    </button>
  );
};

export default ExploreBtn;
