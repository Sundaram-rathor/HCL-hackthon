"use client";
import React from "react";
import HealthCard from "./components/card";

export default function HealthPage() {
  const healthData = [
    {
      title: "COVID-19 Updates",
      description:
        "Stay informed about the latest COVID-19 guidelines and vaccination information.",
    },
    {
      title: "Seasonal Flu Prevention",
      description:
        "Learn about steps you can take to prevent the seasonal flu and when to get vaccinated.",
    },
    {
      title: "Mental Health Awareness",
      description:
        "Explore resources and support options for maintaining good mental health.",
    },
  ];

  return (
    <div className=" mx-auto p-6 bg-white w-full h-screen">
      <h2 className="text-2xl font-bold mb-6">Latest Health Information</h2>

      <div className="grid gap-6">
        {healthData.map((item, index) => (
          <HealthCard
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
