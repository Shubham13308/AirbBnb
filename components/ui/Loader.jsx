"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import { slogans } from "@/utils/slogan";
import { useEffect, useState } from "react";

export default function Loader() {
  const [currentSlogan, setCurrentSlogan] = useState(slogans[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlogan((prev) => {
        const nextIndex = (slogans.indexOf(prev) + 1) % slogans.length;
        return slogans[nextIndex];
      });
    }, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-yellow-200 backdrop-blur-md p-4 rounded-lg shadow-lg">
      <div className="text-center">
        <Player
          autoplay
          loop
          src="/lottie/airbnbloader1.json"
          style={{ height: "350px", width: "350px" }}
        />
        <p className="text-xl font-semibold text-gray-700 mt-4 animate-fade-in">
          {currentSlogan}
        </p>
      </div>
    </div>
  );
}